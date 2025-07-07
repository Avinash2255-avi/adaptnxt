const express = require('express');
const router = express.Router();

const {
  createProduct,
  getAllProducts,deleteProduct,getProductById
} = require('../controllers/productController');

const authenticateUser = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/roleMiddleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById)

router.post('/create', authenticateUser, authorizeAdmin, createProduct);
router.delete('/:id', authenticateUser, authorizeAdmin, deleteProduct);

module.exports = router;
