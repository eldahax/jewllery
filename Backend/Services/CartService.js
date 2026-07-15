const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Cart, CartItem, Product, Inventory, Discount, Order, OrderItem, User, Reminder, sequelize } = require('../Models/index');

// Returns the price a customer actually pays right now: the base price,
// or the discounted price if the product has a currently-active discount.
function getEffectivePrice(product) {
  const basePrice = Number(product?.price || 0);

  if (!product?.Discounts || product.Discounts.length === 0) {
    return basePrice;
  }

  const now = new Date();
  const activeDiscount = product.Discounts.find((d) => {
    if (!d.is_active) return false;
    const afterStart = !d.start_date || new Date(d.start_date) <= now;
    const beforeEnd = !d.end_date || new Date(d.end_date) >= now;
    return afterStart && beforeEnd;
  });

  if (!activeDiscount) return basePrice;

  if (activeDiscount.discount_percentage) {
    return basePrice - (basePrice * Number(activeDiscount.discount_percentage)) / 100;
  }
  if (activeDiscount.discount_amount) {
    return Math.max(0, basePrice - Number(activeDiscount.discount_amount));
  }

  return basePrice;
}

const cartService = {
  async getCartByUser(userId) {
    if (!userId) throw new Error("Unauthorized: User ID missing");
    const [cart] = await Cart.findOrCreate({ where: { user_id: userId } });
    return await CartItem.findAll({
      where: { cart_id: cart.cart_id },
      include: [
        { 
          model: Product,
          include: [{ model: Inventory }, { model: Discount }] 
        }
      ]
    });
  },

  async addToCart(userId, productId, quantity) {
    if (!userId) throw new Error("Unauthorized: User ID missing");
    
    const product = await Product.findByPk(productId, {
      include: [{ model: Inventory }]
    });
    
    if (!product) throw new Error("Product not found");
    
    const inventoryRecord = product.Inventory || await Inventory.findOne({ where: { product_id: productId } });
    const availableStock = inventoryRecord ? inventoryRecord.stock : 0;

    if (availableStock <= 0) {
      throw new Error("This product is out of stock.");
    }

    const [cart] = await Cart.findOrCreate({ where: { user_id: userId } });
    
    let item = await CartItem.findOne({
      where: { cart_id: cart.cart_id, product_id: productId }
    });

    const currentQuantityInCart = item ? item.quantity : 0;
    const requestedTotal = currentQuantityInCart + quantity;

    if (availableStock < requestedTotal) {
      throw new Error(`Insufficient inventory. Only ${availableStock} left in stock.`);
    }

    if (item) {
      item.quantity = requestedTotal;
      await item.save();
    } else {
      item = await CartItem.create({
        cart_id: cart.cart_id,
        product_id: productId,
        quantity
      });
    }
    return item;
  },

  async removeFromCart(userId, cartItemId) {
    if (!userId) throw new Error("Unauthorized: User ID missing");
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error("Cart not found");
    
    return await CartItem.destroy({
      where: { cart_item_id: cartItemId, cart_id: cart.cart_id }
    });
  },

  async createCheckoutSession(userId) {
    if (!userId) throw new Error("Unauthorized: User ID missing");
    const cart = await Cart.findOne({ where: { user_id: userId } });
    if (!cart) throw new Error("Cart not found");
    
    const items = await CartItem.findAll({
      where: { cart_id: cart.cart_id },
      include: [
        { 
          model: Product,
          include: [{ model: Inventory }, { model: Discount }] 
        }
      ]
    });
    
    if (!items.length) throw new Error("Cart is empty");
    const user = await User.findByPk(userId);

    for (const item of items) {
      if (!item.Product) throw new Error("Product not found for cart item");
      
      const inventoryRecord = item.Product.Inventory || await Inventory.findOne({ where: { product_id: item.product_id } });
      const availableStock = inventoryRecord ? inventoryRecord.stock : 0;

      if (availableStock <= 0 || availableStock < item.quantity) {
        throw new Error(`Product "${item.Product.product_name}" is out of stock or has insufficient inventory.`);
      }
    }

    const line_items = items.map(item => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.Product?.product_name || 'Product',
          images: item.Product?.image
            ? [`${process.env.BASE_URL || 'http://localhost:5000'}/uploads/${item.Product.image}`]
            : [],
        },
        unit_amount: Math.round(getEffectivePrice(item.Product) * 100),
      },
      quantity: item.quantity,
    }));

    const total = items.reduce(
      (acc, item) => acc + getEffectivePrice(item.Product) * item.quantity,
      0
    );
    
    const order = await sequelize.transaction(async (t) => {
      const newOrder = await Order.create({
        user_id: userId,
        status: 'paid',
        total,
        customer_email: user?.email || null,
      }, { transaction: t });

      // price_at_purchase is snapshotted here using the discounted price at
      // checkout time, so it stays correct even if the discount changes/ends later.
      await OrderItem.bulkCreate(
        items.map(item => ({
          order_id: newOrder.order_id,
          product_id: item.product_id,
          quantity: item.quantity,
          price_at_purchase: getEffectivePrice(item.Product),
        })),
        { transaction: t }
      );

      // Safe lookup for an admin user to attach the administrative reminder to
      let targetAdminId = userId;
      try {
        const adminUser = await User.findOne({
          include: [{
            model: sequelize.models.Role,
            as: 'roles', // If this errors based on your setup, you can safely remove the include and let targetAdminId fall back to userId
          }],
          transaction: t
        });
        if (adminUser) targetAdminId = adminUser.user_id;
      } catch (e) {
        // Fallback gracefully if role query structure varies
      }

      // 1. Create a reminder for the new order (Visible to admins/managers filtering by staff view)
      await Reminder.create({
        title: `New Order Placed`,
        description: `Order successfully placed totaling €${total.toFixed(2)}.`,
        remindAt: new Date(),
        user_id: targetAdminId,
        sent: false
      }, { transaction: t });

      for (const item of items) {
        let inventoryRecord = item.Product.Inventory || await Inventory.findOne({ where: { product_id: item.product_id }, transaction: t });
        
        if (inventoryRecord) {
          inventoryRecord.stock -= item.quantity;
          inventoryRecord.updated_at = new Date();
          await inventoryRecord.save({ transaction: t });

          const LOW_STOCK_THRESHOLD = 10;
          if (inventoryRecord.stock <= LOW_STOCK_THRESHOLD) {
            await Reminder.create({
              title: `Low Stock Alert: ${item.Product.product_name}`,
              description: `Inventory for "${item.Product.product_name}" is low (${inventoryRecord.stock} units left).`,
              remindAt: new Date(),
              user_id: targetAdminId,
              sent: false
            }, { transaction: t });
          }
        }
      }

      return newOrder;
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email: user?.email || undefined,
      success_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL || 'http://localhost:5173'}/cart`,
      metadata: {
        order_id: String(order.order_id),
        user_id: String(userId),
      },
    });

    order.stripe_session_id = session.id;
    await order.save();
    return { url: session.url };
  },
};

module.exports = cartService;