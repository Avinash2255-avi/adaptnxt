const Product = require('../models/Product');

// @desc Create a new product (Admin only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      category
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error creating product' });
  }
};

// @desc Get all products (Public)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching products' });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    await product.deleteOne();

    res.status(200).json({ message: '✅ Product deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: '❌ Server error while deleting product' });
  }
};
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.status(200).json(product)
  } catch (error) {
    console.error('Error fetching product:', error.message)
    res.status(500).json({ message: 'Server error' })
  }
}
