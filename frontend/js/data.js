// ==========================================
// SmartShop - Product Data Store
// All products with INR pricing
// ==========================================

const PRODUCTS = [
    // ── Mobiles ──
    {
        id: "mob-001",
        name: "iPhone 15 Pro Max 256GB",
        brand: "Apple",
        category: "Mobiles",
        price: 159900,
        originalPrice: 179900,
        image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=400&fmt=p-jpg",
        rating: 4.8,
        numReviews: 2845,
        description: "iPhone 15 Pro Max features a titanium design, A17 Pro chip, 48MP camera system with 5x optical zoom, and all-day battery life. The most powerful iPhone ever.",
        specs: ["6.7\" Super Retina XDR", "A17 Pro Chip", "48MP Camera", "Titanium Build", "USB-C"],
        inStock: true,
        popularity: 98,
        reviews: [
            { user: "Rahul S.", rating: 5, comment: "Best phone I've ever used. Camera is insane!", date: "2026-03-15" },
            { user: "Priya M.", rating: 5, comment: "Titanium build feels amazing. Worth every rupee.", date: "2026-03-10" },
            { user: "Amit K.", rating: 4, comment: "Great phone but expensive. Battery life is superb.", date: "2026-02-28" }
        ]
    },
    {
        id: "mob-002",
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        category: "Mobiles",
        price: 129999,
        originalPrice: 144999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&q=80&fit=crop",
        rating: 4.6,
        numReviews: 1920,
        description: "Galaxy S24 Ultra with Galaxy AI, built-in S Pen, 200MP camera, and titanium frame. The ultimate Android flagship.",
        specs: ["6.8\" QHD+ AMOLED", "Snapdragon 8 Gen 3", "200MP Camera", "S Pen Built-in", "5000mAh"],
        inStock: true,
        popularity: 95,
        reviews: [
            { user: "Vikram R.", rating: 5, comment: "Galaxy AI features are game changing!", date: "2026-03-20" },
            { user: "Sneha P.", rating: 4, comment: "Amazing camera quality, especially at night.", date: "2026-03-05" }
        ]
    },
    {
        id: "mob-003",
        name: "OnePlus 12 5G 256GB",
        brand: "OnePlus",
        category: "Mobiles",
        price: 64999,
        originalPrice: 69999,
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&fit=crop",
        rating: 4.5,
        numReviews: 3150,
        description: "OnePlus 12 with Snapdragon 8 Gen 3, Hasselblad camera, 100W SUPERVOOC charging, and 2K 120Hz display.",
        specs: ["6.82\" 2K LTPO", "Snapdragon 8 Gen 3", "50MP Hasselblad", "100W Charging", "5400mAh"],
        inStock: true,
        popularity: 88,
        reviews: [
            { user: "Karan D.", rating: 5, comment: "Best value flagship. Charges super fast!", date: "2026-03-18" },
            { user: "Neha T.", rating: 4, comment: "Smooth display, great for gaming.", date: "2026-03-12" }
        ]
    },
    {
        id: "mob-004",
        name: "Google Pixel 8 Pro",
        brand: "Google",
        category: "Mobiles",
        price: 83999,
        originalPrice: 106999,
        image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80&fit=crop",
        rating: 4.4,
        numReviews: 1456,
        description: "Pixel 8 Pro with Tensor G3 chip, best-in-class AI photography, 7 years of updates, and Google AI features.",
        specs: ["6.7\" LTPO OLED", "Tensor G3", "50MP + 48MP", "AI Photography", "7yr Updates"],
        inStock: true,
        popularity: 82,
        reviews: [
            { user: "Arjun V.", rating: 5, comment: "AI photo editing is mind-blowing. Magic Eraser is magical!", date: "2026-03-08" }
        ]
    },

    // ── Laptops ──
    {
        id: "lap-001",
        name: "MacBook Pro 16\" M3 Max",
        brand: "Apple",
        category: "Laptops",
        price: 399900,
        originalPrice: 399900,
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80&fit=crop",
        rating: 4.9,
        numReviews: 1245,
        description: "MacBook Pro 16-inch with M3 Max chip, 36GB RAM, 1TB SSD, and stunning Liquid Retina XDR display. The ultimate pro laptop.",
        specs: ["16\" Liquid Retina XDR", "M3 Max Chip", "36GB RAM", "1TB SSD", "22hr Battery"],
        inStock: true,
        popularity: 96,
        reviews: [
            { user: "Deepak S.", rating: 5, comment: "Absolute beast for video editing. Silent and cool.", date: "2026-03-22" },
            { user: "Ananya R.", rating: 5, comment: "Worth the investment for creative professionals.", date: "2026-03-15" }
        ]
    },
    {
        id: "lap-002",
        name: "Dell XPS 15 OLED",
        brand: "Dell",
        category: "Laptops",
        price: 174990,
        originalPrice: 199990,
        image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&q=80&fit=crop",
        rating: 4.5,
        numReviews: 890,
        description: "Dell XPS 15 with stunning 3.5K OLED display, Intel Core i9, 32GB RAM, and InfinityEdge bezels.",
        specs: ["15.6\" 3.5K OLED", "Intel Core i9", "32GB DDR5", "1TB SSD", "NVIDIA RTX 4060"],
        inStock: true,
        popularity: 85,
        reviews: [
            { user: "Manish K.", rating: 4, comment: "OLED display is gorgeous. Great for coding.", date: "2026-03-10" }
        ]
    },
    {
        id: "lap-003",
        name: "ASUS ROG Strix G16 Gaming",
        brand: "ASUS",
        category: "Laptops",
        price: 154990,
        originalPrice: 174990,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400&q=80&fit=crop",
        rating: 4.6,
        numReviews: 2100,
        description: "ROG Strix G16 with Intel i9, RTX 4070, 240Hz display, per-key RGB keyboard. Built for competitive gaming.",
        specs: ["16\" 240Hz QHD", "Intel i9-13980HX", "RTX 4070 8GB", "32GB DDR5", "1TB PCIe 4.0"],
        inStock: true,
        popularity: 90,
        reviews: [
            { user: "Rohan G.", rating: 5, comment: "Gaming beast! Runs everything on ultra settings.", date: "2026-03-16" },
            { user: "Divya L.", rating: 4, comment: "A bit heavy but performance is outstanding.", date: "2026-03-02" }
        ]
    },
    {
        id: "lap-004",
        name: "HP Pavilion 14 Laptop",
        brand: "HP",
        category: "Laptops",
        price: 62990,
        originalPrice: 72990,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80&fit=crop",
        rating: 4.2,
        numReviews: 3400,
        description: "HP Pavilion 14 with Intel Core i5, 16GB RAM, 512GB SSD. Perfect for students and everyday use.",
        specs: ["14\" FHD IPS", "Intel Core i5-1335U", "16GB DDR4", "512GB SSD", "10hr Battery"],
        inStock: true,
        popularity: 78,
        reviews: [
            { user: "Pooja S.", rating: 4, comment: "Great laptop for college. Light and portable.", date: "2026-03-14" }
        ]
    },

    // ── Fashion / Clothes ──
    {
        id: "clo-001",
        name: "Premium Slim Fit Casual Shirt",
        brand: "Allen Solly",
        category: "Clothes",
        price: 1499,
        originalPrice: 2999,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&q=80",
        rating: 4.3,
        numReviews: 5200,
        description: "Premium cotton slim fit casual shirt. Perfect for office and weekend outings. Breathable fabric with modern cut.",
        specs: ["100% Cotton", "Slim Fit", "Machine Washable", "Available S-XXL", "Multiple Colors"],
        inStock: true,
        popularity: 75,
        reviews: [
            { user: "Aman T.", rating: 4, comment: "Great fit and comfortable fabric.", date: "2026-03-20" },
            { user: "Ritu K.", rating: 5, comment: "Bought for husband, he loves it!", date: "2026-03-12" }
        ]
    },
    {
        id: "clo-002",
        name: "Men's Classic Denim Jacket",
        brand: "Levi's",
        category: "Clothes",
        price: 4999,
        originalPrice: 7999,
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&q=80",
        rating: 4.7,
        numReviews: 1800,
        description: "Iconic Levi's denim jacket in classic blue wash. Timeless style with durable construction. A wardrobe essential.",
        specs: ["100% Cotton Denim", "Regular Fit", "Button Closure", "2 Chest Pockets", "Trucker Style"],
        inStock: true,
        popularity: 88,
        reviews: [
            { user: "Sahil M.", rating: 5, comment: "Levi's never disappoints. Quality is top-notch.", date: "2026-03-18" }
        ]
    },
    {
        id: "clo-003",
        name: "Women's Anarkali Kurti Set",
        brand: "W for Woman",
        category: "Clothes",
        price: 2499,
        originalPrice: 3999,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=400&q=80",
        rating: 4.5,
        numReviews: 3400,
        description: "Elegant Anarkali kurti set with intricate embroidery. Perfect for festive occasions and casual outings.",
        specs: ["Rayon Fabric", "Flared Fit", "Hand Wash", "Knee Length", "All Sizes Available"],
        inStock: true,
        popularity: 82,
        reviews: [
            { user: "Meena D.", rating: 5, comment: "Beautiful color and perfect for festivals!", date: "2026-03-15" },
            { user: "Kavita R.", rating: 4, comment: "Comfortable fabric, slightly long for petite frame.", date: "2026-03-08" }
        ]
    },
    {
        id: "clo-004",
        name: "Men's Running Shoes Pro",
        brand: "Nike",
        category: "Clothes",
        price: 8999,
        originalPrice: 12999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
        rating: 4.6,
        numReviews: 4500,
        description: "Nike Air running shoes with responsive cushioning, breathable mesh upper, and rubber outsole for ultimate grip.",
        specs: ["Mesh + Synthetic", "Responsive Cushion", "Rubber Outsole", "Lace-Up", "Sizes 6-12"],
        inStock: true,
        popularity: 92,
        reviews: [
            { user: "Vishal P.", rating: 5, comment: "Super comfortable for long runs. Great support!", date: "2026-03-20" },
            { user: "Ankita S.", rating: 4, comment: "Stylish and functional. Love the color.", date: "2026-03-14" }
        ]
    },

    // ── Grocery ──
    {
        id: "gro-001",
        name: "Organic Whole Wheat Atta 10kg",
        brand: "Aashirvaad",
        category: "Grocery",
        price: 499,
        originalPrice: 599,
        image: "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=400&q=80&fit=crop",
        rating: 4.4,
        numReviews: 8500,
        description: "100% organic whole wheat atta. Made from MP Sharbati wheat. Soft rotis every time. No preservatives.",
        specs: ["10kg Pack", "100% Organic", "MP Sharbati Wheat", "No Preservatives", "Lab Tested"],
        inStock: true,
        popularity: 85,
        reviews: [
            { user: "Sunita J.", rating: 5, comment: "Best atta for soft rotis. Family favorite!", date: "2026-03-22" },
            { user: "Rajesh M.", rating: 4, comment: "Good quality wheat. Rotis come out very soft.", date: "2026-03-18" }
        ]
    },
    {
        id: "gro-002",
        name: "Premium Basmati Rice 5kg",
        brand: "India Gate",
        category: "Grocery",
        price: 799,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80&fit=crop",
        rating: 4.5,
        numReviews: 6200,
        description: "Extra long grain aged basmati rice. Perfect for biryani, pulao and everyday cooking. Aromatic and fluffy.",
        specs: ["5kg Pack", "Extra Long Grain", "Aged 2 Years", "Low GI", "Premium Quality"],
        inStock: true,
        popularity: 80,
        reviews: [
            { user: "Fatima B.", rating: 5, comment: "Perfect for biryani! Grains stay separate.", date: "2026-03-16" }
        ]
    },
    {
        id: "gro-003",
        name: "Cold Pressed Extra Virgin Olive Oil 1L",
        brand: "Figaro",
        category: "Grocery",
        price: 699,
        originalPrice: 899,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80&fit=crop",
        rating: 4.3,
        numReviews: 2800,
        description: "Cold pressed extra virgin olive oil imported from Spain. Rich in antioxidants. Perfect for salads and cooking.",
        specs: ["1 Litre", "Cold Pressed", "Extra Virgin", "Imported Spain", "Rich Antioxidants"],
        inStock: true,
        popularity: 72,
        reviews: [
            { user: "Dr. Shweta K.", rating: 4, comment: "Authentic taste. Great for healthy cooking.", date: "2026-03-12" }
        ]
    },
    {
        id: "gro-004",
        name: "Organic Green Tea 100 Bags",
        brand: "Organic India",
        category: "Grocery",
        price: 349,
        originalPrice: 499,
        image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&q=80&fit=crop",
        rating: 4.6,
        numReviews: 5100,
        description: "Premium organic tulsi green tea. Boosts immunity and promotes relaxation. 100 individually wrapped tea bags.",
        specs: ["100 Tea Bags", "USDA Organic", "Tulsi Infused", "No Artificial Flavors", "Biodegradable"],
        inStock: true,
        popularity: 78,
        reviews: [
            { user: "Nisha R.", rating: 5, comment: "Love the tulsi flavor! Refreshing and calming.", date: "2026-03-20" },
            { user: "Sanjay P.", rating: 4, comment: "Good quality tea. Helps with digestion.", date: "2026-03-08" }
        ]
    },

    // ── Accessories ──
    {
        id: "acc-001",
        name: "Sony WH-1000XM5 Headphones",
        brand: "Sony",
        category: "Accessories",
        price: 26990,
        originalPrice: 34990,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80",
        rating: 4.8,
        numReviews: 3200,
        description: "Industry-leading noise cancellation with Auto NC Optimizer. Crystal clear hands-free calling. 30-hour battery life.",
        specs: ["30hr Battery", "Auto ANC", "Multipoint", "LDAC Hi-Res", "Speak-to-Chat"],
        inStock: true,
        popularity: 94,
        reviews: [
            { user: "Aditya N.", rating: 5, comment: "Best noise cancelling headphones. Period.", date: "2026-03-22" },
            { user: "Pallavi G.", rating: 5, comment: "Sound quality is phenomenal. So comfortable!", date: "2026-03-15" }
        ]
    },
    {
        id: "acc-002",
        name: "Apple Watch Series 9 GPS",
        brand: "Apple",
        category: "Accessories",
        price: 41900,
        originalPrice: 46900,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80",
        rating: 4.7,
        numReviews: 2100,
        description: "Apple Watch Series 9 with S9 chip, Double Tap gesture, bright always-on display, and advanced health features.",
        specs: ["Always-On Retina", "S9 SiP Chip", "Double Tap", "Blood Oxygen", "Water Resistant 50m"],
        inStock: true,
        popularity: 91,
        reviews: [
            { user: "Tanvi B.", rating: 5, comment: "Health tracking features are life-changing!", date: "2026-03-18" }
        ]
    },
    {
        id: "acc-003",
        name: "JBL Flip 6 Bluetooth Speaker",
        brand: "JBL",
        category: "Accessories",
        price: 9999,
        originalPrice: 14999,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80",
        rating: 4.5,
        numReviews: 4800,
        description: "Powerful JBL Flip 6 with bold sound, deep bass, IP67 waterproof and dustproof rating. 12-hour playtime.",
        specs: ["12hr Battery", "IP67 Waterproof", "PartyBoost", "USB-C Charge", "Bluetooth 5.1"],
        inStock: true,
        popularity: 86,
        reviews: [
            { user: "Harsh V.", rating: 5, comment: "Bass is incredible for the size. Pool-proof!", date: "2026-03-20" },
            { user: "Sonia K.", rating: 4, comment: "Great sound. Battery lasts really long.", date: "2026-03-10" }
        ]
    },
    {
        id: "acc-004",
        name: "boAt Airdopes 441 TWS Earbuds",
        brand: "boAt",
        category: "Accessories",
        price: 1499,
        originalPrice: 4490,
        image: "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=400&q=80",
        rating: 4.1,
        numReviews: 12500,
        description: "Truly wireless earbuds with IWP technology, immersive sound, IPX7 water resistance, and instant voice assistant.",
        specs: ["IWP Tech", "IPX7 Rated", "Bluetooth 5.0", "Voice Assistant", "25hr Total Play"],
        inStock: true,
        popularity: 80,
        reviews: [
            { user: "Ankit J.", rating: 4, comment: "Amazing value for money. Sound is decent.", date: "2026-03-16" },
            { user: "Prachi M.", rating: 4, comment: "Comfortable fit. Good for workouts.", date: "2026-03-05" }
        ]
    },
    {
        id: "acc-005",
        name: "Samsung Galaxy Buds2 Pro",
        brand: "Samsung",
        category: "Accessories",
        price: 12999,
        originalPrice: 17999,
        image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&q=80",
        rating: 4.4,
        numReviews: 2900,
        description: "Galaxy Buds2 Pro with Hi-Fi 24bit audio, intelligent ANC, 360 Audio, and comfortable ergonomic design.",
        specs: ["24bit Hi-Fi", "Intelligent ANC", "360 Audio", "IPX7", "Voice Detect"],
        inStock: true,
        popularity: 83,
        reviews: [
            { user: "Kunal S.", rating: 5, comment: "ANC is surprisingly good. Sound clarity is excellent.", date: "2026-03-14" }
        ]
    },

    // ── Additional Products ──
    {
        id: "mob-005",
        name: "Xiaomi 14 Ultra 5G",
        brand: "Xiaomi",
        category: "Mobiles",
        price: 99999,
        originalPrice: 99999,
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&q=80&fit=crop",
        rating: 4.5,
        numReviews: 980,
        description: "Xiaomi 14 Ultra with Leica quad camera system, Snapdragon 8 Gen 3, and stunning 2K LTPO display.",
        specs: ["6.73\" 2K LTPO", "Snapdragon 8 Gen 3", "Leica Quad Camera", "90W Charging", "5000mAh"],
        inStock: true,
        popularity: 79,
        reviews: [
            { user: "Gaurav T.", rating: 5, comment: "Leica cameras are incredible on this phone!", date: "2026-03-19" }
        ]
    },
    {
        id: "clo-005",
        name: "Women's Premium Yoga Pants",
        brand: "HRX",
        category: "Clothes",
        price: 1299,
        originalPrice: 2499,
        image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80&fit=crop",
        rating: 4.4,
        numReviews: 6800,
        description: "High-waisted yoga pants with 4-way stretch fabric. Moisture-wicking, squat-proof, and ultra-comfortable.",
        specs: ["4-Way Stretch", "High Waist", "Squat Proof", "Moisture Wick", "Sizes XS-XXL"],
        inStock: true,
        popularity: 76,
        reviews: [
            { user: "Rhea M.", rating: 5, comment: "Best yoga pants! So comfortable and flattering.", date: "2026-03-21" }
        ]
    },
    {
        id: "gro-005",
        name: "Premium Dry Fruits Gift Box 1kg",
        brand: "Happilo",
        category: "Grocery",
        price: 1299,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1548592807-89d5432baed5?w=400&q=80&fit=crop",
        rating: 4.5,
        numReviews: 3600,
        description: "Assorted premium dry fruits including almonds, cashews, pistachios, and walnuts in an elegant gift box.",
        specs: ["1kg Assorted", "Premium Quality", "Gift Packaging", "No Added Sugar", "Vacuum Sealed"],
        inStock: true,
        popularity: 74,
        reviews: [
            { user: "Shubham R.", rating: 5, comment: "Perfect Diwali gift. Fresh and tasty!", date: "2026-03-10" }
        ]
    },
    {
        id: "lap-005",
        name: "Lenovo IdeaPad Slim 5",
        brand: "Lenovo",
        category: "Laptops",
        price: 54990,
        originalPrice: 64990,
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&q=80&fit=crop",
        rating: 4.3,
        numReviews: 2800,
        description: "Sleek and lightweight IdeaPad Slim 5 with AMD Ryzen 7, 16GB RAM, and 512GB SSD. Ideal for everyday productivity.",
        specs: ["14\" FHD IPS", "AMD Ryzen 7 7730U", "16GB RAM", "512GB SSD", "Fingerprint Reader"],
        inStock: true,
        popularity: 73,
        reviews: [
            { user: "Nitin P.", rating: 4, comment: "Perfect for office work. Battery is impressive.", date: "2026-03-17" }
        ]
    },
    {
        id: "acc-006",
        name: "Titan Smart Watch Pro",
        brand: "Titan",
        category: "Accessories",
        price: 6999,
        originalPrice: 9999,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80&fit=crop",
        rating: 4.2,
        numReviews: 5500,
        description: "Titan smart watch with AMOLED display, SpO2 monitoring, GPS, and 14-day battery life. Made in India.",
        specs: ["1.43\" AMOLED", "SpO2 Monitor", "Built-in GPS", "14-day Battery", "100+ Watch Faces"],
        inStock: true,
        popularity: 77,
        reviews: [
            { user: "Manoj V.", rating: 4, comment: "Great Indian smartwatch. Battery lasts forever!", date: "2026-03-13" }
        ]
    }
];

// Currency Formatter
const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', { 
        style: 'currency', 
        currency: 'INR',
        maximumFractionDigits: 0 
    }).format(price);
};

// Get product by ID
function getProductById(id) {
    return PRODUCTS.find(p => p.id === id);
}

// Get products by category
function getProductsByCategory(category) {
    if (!category || category === 'All') return [...PRODUCTS];
    return PRODUCTS.filter(p => p.category === category);
}

// Search products
function searchProducts(query) {
    if (!query) return [...PRODUCTS];
    const q = query.toLowerCase();
    return PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
}

// Filter products
function filterProducts(products, filters = {}) {
    let result = [...products];
    
    if (filters.category && filters.category !== 'All') {
        result = result.filter(p => p.category === filters.category);
    }
    if (filters.minPrice !== undefined) {
        result = result.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
        result = result.filter(p => p.price <= filters.maxPrice);
    }
    if (filters.minRating !== undefined) {
        result = result.filter(p => p.rating >= filters.minRating);
    }
    if (filters.search) {
        const q = filters.search.toLowerCase();
        result = result.filter(p => 
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.description.toLowerCase().includes(q)
        );
    }
    
    return result;
}

// Sort products
function sortProducts(products, sortBy) {
    const sorted = [...products];
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'popularity':
            return sorted.sort((a, b) => b.popularity - a.popularity);
        default:
            return sorted;
    }
}
