const { Order, OrderItem, Product, User } = require('../Models/index');

const isStaff = (roles = []) => roles.includes("admin") || roles.includes("manager");

const getAllOrders = async (user) => {
  const roles = user.roles || [];
  let whereCondition = {};

  if (!isStaff(roles)) {
    if (!user.user_id) throw new Error("Unauthorized: User ID missing");
    whereCondition.user_id = user.user_id;
  }

  return await Order.findAll({
    where: whereCondition,
    include: [
      { model: User, attributes: ['user_id', 'first_name', 'last_name', 'email'] },
      { model: OrderItem, include: [{ model: Product, attributes: ['product_id', 'product_name', 'price', 'image'] }] },
    ],
    order: [['created_at', 'DESC']],
  });
};

const getOrderById = async (order_id, user) => {
  const roles = user.roles || [];

  const order = await Order.findByPk(order_id, {
    include: [
      { model: User, attributes: ['user_id', 'first_name', 'last_name', 'email'] },
      { model: OrderItem, include: [{ model: Product, attributes: ['product_id', 'product_name', 'price', 'image'] }] },
    ],
  });

  if (!order) throw new Error("Order not found");

 
  if (!isStaff(roles) && order.user_id !== user.user_id) {
    throw new Error("Unauthorized: this order doesn't belong to you");
  }

  return order;
};

const getOrderBySession = async (user, sessionId) => {
  const roles = user.roles || [];
  if (!sessionId) throw new Error("session_id is required");

  let whereCondition = { stripe_session_id: sessionId };

  if (!isStaff(roles)) {
    if (!user.user_id) throw new Error("Unauthorized: User ID missing");
    whereCondition.user_id = user.user_id;
  }

  const order = await Order.findOne({
    where: whereCondition,
    include: [
      { model: OrderItem, include: [{ model: Product, attributes: ['product_id', 'product_name', 'price', 'image'] }] },
    ],
  });

  if (!order) throw new Error("Order not found");
  return order;
};

module.exports = {
  getAllOrders,
  getOrderById,
  getOrderBySession,
};