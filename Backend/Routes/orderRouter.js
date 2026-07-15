const express = require('express');
const router = express.Router();
const orderController = require('../Controllers/orderController');
const { protect, authorize } = require('../Auth/middlewear');

router.get('/', protect, authorize('admin','costumer'), orderController.getAllOrders);
router.get('/mine', protect, orderController.getMyOrders);
router.get('/session/:sessionId', protect, orderController.getOrderBySession);

module.exports = router;