const Order = require('../models/Order');

// @desc   Create a new order
// @route  POST /api/orders/create
// @access Private
exports.createOrder = async (req, res) => {
  const { items, totalAmount } = req.body;

  // Basic validation
  if (!items || !Array.isArray(items) || items.length === 0 || !totalAmount) {
    return res.status(400).json({ message: 'Items and totalAmount are required' });
  }

  try {
    const newOrder = await Order.create({
      user: req.user.id,
      items,
      totalAmount
    });

    res.status(201).json({
      message: '✅ Order placed successfully',
      order: newOrder
    });
  } catch (error) {
    console.error('❌ Error placing order:', error.message);
    res.status(500).json({ error: 'Server error while placing order' });
  }
};

// @desc   Get orders for logged-in user
// @route  GET /api/orders/my-orders
// @access Private
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name price');

    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Failed to fetch orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('items.productId', 'name price');
    res.status(200).json(orders);
  } catch (error) {
    console.error('❌ Error fetching all orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch all orders' });
  }
};
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    order.status = status || order.status;
    await order.save();

    res.json({ message: '✅ Order status updated', order });
  } catch (error) {
    console.error('❌ Error updating order:', error.message);
    res.status(500).json({ error: 'Failed to update order status' });
  }
}