const Review = require('../models/Review');
const Product = require('../models/Product');

// @desc    Create a review for a product
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
    const { productId, rating, comment } = req.body;
    try {
        // Check if user already reviewed this product
        const existingReview = await Review.findOne({ user: req.user._id, product: productId });
        if (existingReview) {
            // Update existing review
            existingReview.rating = rating;
            existingReview.comment = comment;
            await existingReview.save();
        } else {
            // Create new review
            await Review.create({
                user: req.user._id,
                product: productId,
                userName: `${req.user.firstName} ${req.user.lastName}`,
                rating,
                comment
            });
        }

        // Update product rating stats
        const reviews = await Review.find({ product: productId });
        const numReviews = reviews.length;
        const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews;
        
        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(avgRating * 10) / 10,
            numReviews
        });

        // Return all reviews for this product
        const allReviews = await Review.find({ product: productId })
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName');
        
        res.status(201).json(allReviews);
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'You have already reviewed this product' });
        }
        res.status(500).json({ message: err.message });
    }
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ product: req.params.productId })
            .sort({ createdAt: -1 })
            .populate('user', 'firstName lastName');
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) return res.status(404).json({ message: 'Review not found' });
        if (review.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this review' });
        }
        
        const productId = review.product;
        await review.deleteOne();

        // Recalculate product rating
        const reviews = await Review.find({ product: productId });
        const numReviews = reviews.length;
        const avgRating = numReviews > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / numReviews : 0;
        await Product.findByIdAndUpdate(productId, {
            rating: Math.round(avgRating * 10) / 10,
            numReviews
        });

        res.json({ message: 'Review removed' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createReview, getProductReviews, deleteReview };
