const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    image: { type: String, required: true },
    specs: [{ type: String }],
    isNewArrival: { type: Boolean, default: false },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    popularity: { type: Number, default: 0 },
    inStock: { type: Boolean, default: true }
}, { timestamps: true });

// Text index for search
productSchema.index({ name: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
