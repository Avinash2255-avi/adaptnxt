const express = require('express');
const router = express.Router();

const { createOrder, getMyOrders, getAllOrders,updateOrderStatus } = require('../controllers/orderController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/roleMiddleware');

router.post('/create', authenticateUser, createOrder);


router.get('/my-orders', authenticateUser, getMyOrders);




router.get('/', (req, res) => {
  res.send('📦 Order route is working!');
});

router.get('/all', authenticateUser, authorizeAdmin, getAllOrders);
router.put('/:id/status', authenticateUser, authorizeAdmin, updateOrderStatus);

module.exports = router;
