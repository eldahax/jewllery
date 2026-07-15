const orderService = require('../Services/OrderService');

const orderController = {
  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders(req.user);
      res.json(orders);
    } catch (err) {
      console.error("Error in getAllOrders:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async getMyOrders(req, res) {
    try {
      const userId = req.user?.id || req.user?.user_id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      const orders = await orderService.getAllOrders(req.user); 
      res.json(orders);
    } catch (err) {
      console.error("Error in getMyOrders:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async getOrderBySession(req, res) {
    try {
      const userId = req.user?.id || req.user?.user_id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      const order = await orderService.getOrderBySession(req.user, req.params.sessionId);
      res.json(order);
    } catch (err) {
      console.error("Error in getOrderBySession:", err);
      res.status(404).json({ error: err.message });
    }
  },
};

module.exports = orderController;