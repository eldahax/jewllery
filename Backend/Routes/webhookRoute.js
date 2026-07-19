const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const { Order, Cart, CartItem } = require('../Models/index');

router.post('/', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const orderId = session.metadata?.order_id;
        const userId = session.metadata?.user_id;

        if (orderId) {
          const order = await Order.findByPk(orderId);
          if (order && order.status !== 'paid') {
            order.status = 'paid';
            order.stripe_payment_intent_id = session.payment_intent || order.stripe_payment_intent_id;
            await order.save();

            if (userId) {
              const cart = await Cart.findOne({ where: { user_id: userId } });
              if (cart) await CartItem.destroy({ where: { cart_id: cart.cart_id } });
            }
          }
        }
        break;
      }

      case 'checkout.session.expired': {
        const session = event.data.object;
        const orderId = session.metadata?.order_id;
        if (orderId) {
          const order = await Order.findByPk(orderId);
          if (order && order.status === 'pending') {
            order.status = 'failed';
            await order.save();
          }
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error('Error handling webhook event:', err);
  }

  res.json({ received: true });
});

module.exports = router;