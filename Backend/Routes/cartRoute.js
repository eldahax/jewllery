const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { protect } = require('../Auth/middlewear');
router.get('/', protect, cartController.getCart);
router.post('/add', protect, cartController.addItem);
router.delete('/:id', protect, cartController.removeItem);
router.post('/create-checkout-session', protect, cartController.createCheckoutSession);

module.exports = router;