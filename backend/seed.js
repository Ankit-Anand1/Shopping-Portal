const Product = require('./models/Product');

const products = [
    { name: "iPhone 15 Pro Max", brand: "Apple", category: "Mobiles", price: 1199.00, image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070", rating: 4.9, numReviews: 1204 },
    { name: "Samsung Galaxy S24 Ultra", brand: "Samsung", category: "Mobiles", price: 1299.00, image: "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=2070", rating: 4.8, numReviews: 890 },
    { name: "Google Pixel 8 Pro", brand: "Google", category: "Mobiles", price: 999.00, image: "https://images.unsplash.com/photo-1627308595229-7830f5c90683?q=80&w=2070", rating: 4.7, numReviews: 540 },
    
    { name: "MacBook Pro M3 Max", brand: "Apple", category: "Laptops", price: 3499.00, image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2026", rating: 4.9, numReviews: 432 },
    { name: "Dell XPS 15", brand: "Dell", category: "Laptops", price: 1999.00, image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2069", rating: 4.6, numReviews: 310 },
    { name: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", category: "Laptops", price: 1699.00, image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068", rating: 4.8, numReviews: 290 },
    
    { name: "Organic Fresh Strawberries (1lb)", brand: "FreshFarm", category: "Grocery", price: 6.99, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=2070", rating: 4.5, numReviews: 120 },
    { name: "Whole Grain Artisan Bread", brand: "Bakery", category: "Grocery", price: 4.49, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=2072", rating: 4.8, numReviews: 85 },
    { name: "Avocado Dozen Pack", brand: "FreshFarm", category: "Grocery", price: 12.99, image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2075", rating: 4.7, numReviews: 215 },
    
    { name: "Classic White T-Shirt", brand: "Essentials", category: "Clothes", price: 29.99, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780", rating: 4.6, numReviews: 450 },
    { name: "Premium Denim Jacket", brand: "Levi", category: "Clothes", price: 89.99, image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=1887", rating: 4.8, numReviews: 312 },
    { name: "Comfort Fit Joggers", brand: "ActiveWear", category: "Clothes", price: 45.00, image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920", rating: 4.5, numReviews: 180 },

    { name: "Sony WH-1000XM5 Headphones", brand: "Sony", category: "Accessories", price: 348.00, image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1888", rating: 4.9, numReviews: 1540 },
    { name: "Apple Watch Series 9", brand: "Apple", category: "Accessories", price: 399.00, image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2071", rating: 4.8, numReviews: 920 },
    { name: "Minimalist Leather Cardholder", brand: "Nomad", category: "Accessories", price: 45.00, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1888", rating: 4.7, numReviews: 210 }
];

const seedDB_internal = async () => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);
        console.log('Products seeded automatically.');
    } catch(err) {
        console.error('Error seeding data', err);
    }
};

module.exports = { seedDB_internal };
