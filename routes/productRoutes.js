const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,deleteProduct,getProductById
} = require('../controllers/productController');

const authenticateUser = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/roleMiddleware');

// Public route to get all products
router.get('/', getAllProducts);
router.get('/:id', getProductById)

// Admin-only route to create a product
router.post('/create', authenticateUser, authorizeAdmin, createProduct);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteProduct);

module.exports = router;
