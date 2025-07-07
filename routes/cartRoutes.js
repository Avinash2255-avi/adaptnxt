const express = require('express');
const router = express.Router();
const { addToCart, getCart } = require('../controllers/cartController');
const authenticateUser = require('../middleware/authMiddleware');


router.post('/', authenticateUser, addToCart);
router.get('/', authenticateUser, getCart);

module.exports = router;
