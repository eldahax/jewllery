const cartService = require('../Services/CartService');

const cartController = {
  async getCart(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      const items = await cartService.getCartByUser(userId);
      res.json(items);
    } catch (err) {
      console.error("Error in getCart:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async addItem(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      const { product_id, quantity } = req.body;
      if (!product_id) return res.status(400).json({ error: "product_id is required" });

      const item = await cartService.addToCart(userId, product_id, quantity || 1);
      res.json(item);
    } catch (err) {
      console.error("Error in addItem:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async removeItem(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      await cartService.removeFromCart(userId, req.params.id);
      res.json({ message: "Item removed" });
    } catch (err) {
      console.error("Error in removeItem:", err);
      res.status(500).json({ error: err.message });
    }
  },

  async createCheckoutSession(req, res) {
    try {
      const userId = req.user?.id;
      if (!userId) return res.status(401).json({ error: "Unauthorized. Please log in." });

      const result = await cartService.createCheckoutSession(userId);
      res.json(result);
    } catch (err) {
      console.error("Error in createCheckoutSession:", err);
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = cartController;