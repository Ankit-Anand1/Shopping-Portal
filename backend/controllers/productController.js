const Product = require('../models/Product');

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
    try {
        const keyword = req.query.search ? {
            name: { $regex: req.query.search, $options: 'i' }
        } : {};
        const category = req.query.category ? { category: req.query.category } : {};
        
        const products = await Product.find({ ...keyword, ...category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Create a product (helper for seeding initially)
// @route   POST /api/products
// @access  Public (in a real app, Admin only)
const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getProducts, getProductById, createProduct };
