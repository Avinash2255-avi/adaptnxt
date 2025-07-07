const express = require('express');
const router = express.Router();

const { createOrder, getMyOrders, getAllOrders,updateOrderStatus } = require('../controllers/orderController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/roleMiddleware');
// 🛒 Create a new order
router.post('/create', authenticateUser, createOrder);

// 📦 Get orders for logged-in user
router.get('/my-orders', authenticateUser, getMyOrders);



// Test route (optional)
router.get('/', (req, res) => {
  res.send('📦 Order route is working!');
});

router.get('/all', authenticateUser, authorizeAdmin, getAllOrders);
router.put('/:id/status', authenticateUser, authorizeAdmin, updateOrderStatus);

module.exports = router;
