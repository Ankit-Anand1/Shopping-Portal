const User = require('../models/User');

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
const getCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('cart.productId');
        res.json(user.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
const addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            user.cart[itemIndex].quantity += quantity;
        } else {
            user.cart.push({ productId, quantity });
        }
        await user.save();
        const updatedUser = await User.findById(req.user._id).populate('cart.productId');
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
const updateCartItem = async (req, res) => {
    const { quantity } = req.body;
    try {
        const user = await User.findById(req.user._id);
        const itemIndex = user.cart.findIndex(item => item.productId.toString() === req.params.productId);
        if (itemIndex > -1) {
            user.cart[itemIndex].quantity = quantity;
            await user.save();
            const updatedUser = await User.findById(req.user._id).populate('cart.productId');
            res.json(updatedUser.cart);
        } else {
            res.status(404).json({ message: 'Item not in cart' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
const removeFromCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = user.cart.filter(item => item.productId.toString() !== req.params.productId);
        await user.save();
        const updatedUser = await User.findById(req.user._id).populate('cart.productId');
        res.json(updatedUser.cart);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
const clearCart = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        user.cart = [];
        await user.save();
        res.json({ message: 'Cart cleared' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };
