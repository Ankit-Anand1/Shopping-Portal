// ==========================================
// Smart Shop - Core Application Logic
// Premium Material Design 3 UI
// localStorage-based cart, wishlist, orders
// ==========================================

// ── localStorage Helpers ──
function getCart() {
    return JSON.parse(localStorage.getItem('smartshop_cart') || '[]');
}
function saveCart(cart) {
    localStorage.setItem('smartshop_cart', JSON.stringify(cart));
}
function getWishlist() {
    return JSON.parse(localStorage.getItem('smartshop_wishlist') || '[]');
}
function saveWishlist(list) {
    localStorage.setItem('smartshop_wishlist', JSON.stringify(list));
}
function getOrders() {
    return JSON.parse(localStorage.getItem('smartshop_orders') || '[]');
}
function saveOrders(orders) {
    localStorage.setItem('smartshop_orders', JSON.stringify(orders));
}
function getProfile() {
    return JSON.parse(localStorage.getItem('smartshop_profile') || 'null');
}
function saveProfile(profile) {
    localStorage.setItem('smartshop_profile', JSON.stringify(profile));
}

// ── Address Helpers ──
function getAddress() {
    return localStorage.getItem('smartshop_address') || '';
}
function saveAddress(addr) {
    localStorage.setItem('smartshop_address', addr);
}

// ── Product Reviews per product (user-submitted) ──
function getProductReviews(productId) {
    const all = JSON.parse(localStorage.getItem('smartshop_reviews') || '{}');
    return all[productId] || [];
}
function saveProductReview(productId, review) {
    const all = JSON.parse(localStorage.getItem('smartshop_reviews') || '{}');
    if (!all[productId]) all[productId] = [];
    all[productId].unshift(review);
    localStorage.setItem('smartshop_reviews', JSON.stringify(all));
}

// ══════════════════════════════════════════
// FIX #1: API products stored in localStorage
// so product.html can find them later
// ══════════════════════════════════════════
function getApiProducts() {
    return JSON.parse(localStorage.getItem('smartshop_api_products') || '[]');
}
function saveApiProducts(products) {
    localStorage.setItem('smartshop_api_products', JSON.stringify(products));
}

// Smart getProductById — checks PRODUCTS + API cache
function getProductById(id) {
    // Check local products first
    const local = PRODUCTS.find(p => p.id === id);
    if (local) return local;
    // Check API-loaded products cache
    const apiProducts = getApiProducts();
    return apiProducts.find(p => p.id === id) || null;
}

// ── Cart Operations ──
function addToCart(productId, quantity = 1) {
    if (!getProfile()) {
        showToast('Login Required', 'Please log in to add items to your cart.', 'lock', 'red');
        setTimeout(() => window.location.href = 'login.html', 1500);
        return;
    }

    const cart = getCart();
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push({ productId, quantity });
    }
    saveCart(cart);
    updateCartCount();
    showToast('Added to Cart', 'Your item has been added to the bag.', 'check_circle', 'green');
    // Sync with backend if available
    if (typeof CartAPI !== 'undefined') { CartAPI.add(productId, quantity).catch(() => {}); }
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.productId !== productId);
    saveCart(cart);
    updateCartCount();
    if (typeof CartAPI !== 'undefined') { CartAPI.remove(productId).catch(() => {}); }
}

function updateCartQty(productId, quantity) {
    if (quantity < 1) return removeFromCart(productId);
    const cart = getCart();
    const item = cart.find(i => i.productId === productId);
    if (item) {
        item.quantity = quantity;
        saveCart(cart);
        updateCartCount();
    }
}

function getCartTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => {
        const product = getProductById(item.productId);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
}

function getCartCount() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

// ── Wishlist Operations ──
function toggleWishlist(productId) {
    let list = getWishlist();
    const idx = list.indexOf(productId);
    if (idx > -1) {
        list.splice(idx, 1);
        showToast('Removed from Wishlist', 'Item removed from your wishlist.', 'heart_broken', 'slate');
    } else {
        list.push(productId);
        showToast('Added to Wishlist', 'Item saved to your wishlist.', 'favorite', 'pink');
    }
    saveWishlist(list);
    updateWishlistButtons();
}

function isInWishlist(productId) {
    return getWishlist().includes(productId);
}

function updateWishlistButtons() {
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
        const id = btn.dataset.productId;
        if (isInWishlist(id)) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ── Order Operations ──
function createOrder(shippingInfo) {
    const cart = getCart();
    if (cart.length === 0) return null;
    
    const items = cart.map(item => {
        const product = getProductById(item.productId);
        return {
            productId: item.productId,
            name: product ? product.name : 'Unknown',
            brand: product ? product.brand : '',
            image: product ? product.image : '',
            price: product ? product.price : 0,
            quantity: item.quantity
        };
    });
    
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 5);
    
    const order = {
        id: 'ORD-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase(),
        items,
        total,
        shippingInfo,
        status: 'Ordered',
        date: new Date().toISOString(),
        deliveryDate: deliveryDate.toISOString(),
        trackingSteps: [
            { status: 'Ordered', date: new Date().toISOString(), completed: true },
            { status: 'Packed', date: null, completed: false },
            { status: 'Shipped', date: null, completed: false },
            { status: 'Out for Delivery', date: null, completed: false },
            { status: 'Delivered', date: null, completed: false }
        ]
    };
    
    const orders = getOrders();
    orders.unshift(order);
    saveOrders(orders);
    
    simulateOrderProgress(order.id);
    
    saveCart([]);
    updateCartCount();
    
    return order;
}

function simulateOrderProgress(orderId) {
    const delays = [10000, 25000, 45000, 70000];
    const statuses = ['Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
    
    delays.forEach((delay, idx) => {
        setTimeout(() => {
            const orders = getOrders();
            const order = orders.find(o => o.id === orderId);
            if (order && order.status !== 'Delivered') {
                order.status = statuses[idx];
                order.trackingSteps[idx + 1].completed = true;
                order.trackingSteps[idx + 1].date = new Date().toISOString();
                saveOrders(orders);
            }
        }, delay);
    });
}

// ── UI Helpers ──
function updateCartCount() {
    const badge = document.getElementById('nav-cart-count');
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

function showToast(title, message, icon = 'check_circle', color = 'green') {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    
    const colorMap = {
        green: { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
        pink: { bg: '#fce7f3', text: '#db2777', border: '#fbcfe8' },
        blue: { bg: '#e2dfff', text: '#3525cd', border: '#c3c0ff' },
        red: { bg: '#fce4e4', text: '#ef4444', border: '#fecaca' },
        slate: { bg: '#f2f4f6', text: '#464555', border: '#e0e3e5' }
    };
    
    const c = colorMap[color] || colorMap.green;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <div class="bg-white/90 backdrop-blur-xl px-5 py-4 rounded-[1rem] shadow-lg flex items-center gap-3 border border-gray-100/50" style="min-width: 300px;">
            <div class="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style="background: ${c.bg};">
                <span class="material-symbols-outlined filled-icon" style="color: ${c.text}; font-size: 20px;">${icon}</span>
            </div>
            <div class="flex flex-col">
                <span class="font-bold text-sm text-gray-800">${title}</span>
                <span class="text-xs text-gray-500">${message}</span>
            </div>
        </div>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('hiding'), 2500);
    setTimeout(() => toast.remove(), 3000);
}

// ── Star Rating HTML ──
function generateStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    let html = '';
    for (let i = 0; i < full; i++) {
        html += '<span class="material-symbols-outlined star-filled" style="font-size:16px; font-variation-settings: \'FILL\' 1;">star</span>';
    }
    if (half) {
        html += '<span class="material-symbols-outlined star-filled" style="font-size:16px; font-variation-settings: \'FILL\' 1;">star_half</span>';
    }
    for (let i = 0; i < empty; i++) {
        html += '<span class="material-symbols-outlined star-empty" style="font-size:16px;">star</span>';
    }
    return html;
}

// ══════════════════════════════════════════
// FIX #1: openProduct function — stores product
// data in localStorage so product.html always works
// ══════════════════════════════════════════
function openProduct(productId) {
    // Cache the product data so product.html can definitely find it
    const product = getProductById(productId);
    if (product) {
        localStorage.setItem('smartshop_selected_product', JSON.stringify(product));
    }
    window.location.href = 'product.html?id=' + encodeURIComponent(productId);
}

// ── Product Card Generator (Premium Design) ──
function generateProductCard(p) {
    const discount = p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
    const wished = isInWishlist(p.id);
    
    return `
    <div class="product-card p-0 flex flex-col cursor-pointer relative group" onclick="openProduct('${p.id}')">
        <div class="w-full aspect-square mb-0 relative overflow-hidden bg-surface-container-low rounded-t-[1rem]">
            <img src="${p.image}" alt="${p.name}" class="product-img h-full w-full object-contain p-4" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300?text=Product'"/>
            
            ${discount > 0 ? `<span class="discount-badge absolute top-3 left-3">${discount}% off</span>` : ''}
            
            <button onclick="event.stopPropagation(); toggleWishlist('${p.id}')" data-product-id="${p.id}" class="wishlist-btn absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity ${wished ? 'active !opacity-100' : ''}">
                <span class="material-symbols-outlined" style="font-size: 18px;">favorite</span>
            </button>
            
            <!-- Floating Add to Cart -->
            <button onclick="event.stopPropagation(); addToCart('${p.id}', 1)" class="card-add-btn absolute bottom-3 right-3 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-all active:scale-90 signature-gradient">
                <span class="material-symbols-outlined" style="font-size: 20px;">add</span>
            </button>
        </div>
        
        <div class="p-4 flex flex-col flex-grow">
            <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.15em] mb-1">${p.brand}</span>
            <h4 class="text-sm font-semibold text-on-surface leading-snug mb-2" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${p.name}</h4>
            
            <div class="flex items-center gap-1.5 mb-2">
                <span class="text-[11px] font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-0.5" style="background:#16a34a;">${p.rating} <span class="material-symbols-outlined" style="font-size:12px; font-variation-settings: 'FILL' 1; color:#fff;">star</span></span>
                <span class="text-[11px] text-on-surface-variant">(${p.numReviews.toLocaleString('en-IN')})</span>
            </div>
            
            <div class="mt-auto flex items-baseline gap-2 flex-wrap">
                <span class="price-tag text-lg text-on-surface">${formatPrice(p.price)}</span>
                ${discount > 0 ? `<span class="original-price text-xs">${formatPrice(p.originalPrice)}</span>` : ''}
            </div>
        </div>
    </div>
    `;
}

// ══════════════════════════════════════════
// FIX #4 + #7: Address in header + Logo fix
// ══════════════════════════════════════════
function renderNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const profile = getProfile();
    const urlParams = new URLSearchParams(window.location.search);
    const currentSearch = urlParams.get('search') || '';
    const currentCat = urlParams.get('category') || '';
    const savedAddress = getAddress();

    // Address bar HTML
    const addressHTML = `
        <div class="hidden md:flex items-center gap-2 text-slate-500 text-xs cursor-pointer hover:text-primary transition-colors group" onclick="editAddress()">
            <span class="material-symbols-outlined text-base text-primary">location_on</span>
            <div class="flex flex-col leading-tight">
                <span class="text-[10px] font-medium text-slate-400">Deliver to</span>
                <span id="nav-address" class="font-bold text-slate-700 group-hover:text-primary truncate max-w-[150px]">${savedAddress || 'Add Address'}</span>
            </div>
            <span class="material-symbols-outlined text-xs text-slate-400">expand_more</span>
        </div>
    `;

    const profileContent = profile ? `
        <div class="relative group cursor-pointer">
            <div class="flex items-center gap-2 p-1.5 md:p-2 rounded-full hover:bg-slate-100/50 transition-all">
                ${profile.photoURL 
                    ? `<img src="${profile.photoURL}" alt="Profile" class="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover shadow-md border border-white"/>` 
                    : `<div class="w-7 h-7 md:w-8 md:h-8 rounded-full signature-gradient text-white flex items-center justify-center text-[10px] md:text-xs font-bold shadow-md border border-white">${(profile.name || 'U')[0].toUpperCase()}</div>`
                }
            </div>
            
            <div class="profile-dropdown absolute right-0 top-full mt-2 w-56 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
                <div class="px-4 py-3 border-b border-outline-variant/15 flex items-center gap-3">
                    ${profile.photoURL ? `<img src="${profile.photoURL}" class="w-10 h-10 rounded-full"/>` : ''}
                    <div>
                        <p class="text-sm font-bold text-on-surface truncate">${profile.name || 'User'}</p>
                        <p class="text-[10px] text-on-surface-variant truncate">${profile.email || ''}</p>
                    </div>
                </div>
                <a href="profile.html" class="px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-lg">person</span> My Profile</a>
                <a href="orders.html" class="px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-lg">local_shipping</span> My Orders</a>
                <a href="wishlist.html" class="px-4 py-2.5 text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-lg">favorite</span> Wishlist</a>
                <div class="h-px bg-outline-variant/15 my-1"></div>
                <button onclick="handleLogout()" class="w-full text-left px-4 py-2.5 text-sm text-error hover:bg-error-container/30 transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-lg">logout</span> Sign Out</button>
            </div>
        </div>
    ` : `
        <a href="login.html" class="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors p-1.5 md:p-2 rounded-full hover:bg-slate-100/50">
            <span class="material-symbols-outlined text-[20px] md:text-[24px]">person</span>
        </a>
    `;

    navbar.innerHTML = `
        <div class="bg-white/90 backdrop-blur-xl shadow-sm w-full">
            <nav class="flex items-center justify-between px-3 md:px-8 py-2 max-w-full">
                <!-- Logo + Address -->
                <div class="flex items-center gap-3 md:gap-6">
                    <a class="flex items-center gap-1.5 md:gap-2 whitespace-nowrap" href="index.html">
                        <div class="w-7 h-7 md:w-8 md:h-8 rounded-md signature-gradient flex items-center justify-center flex-shrink-0">
                            <span class="material-symbols-outlined text-white text-[16px] md:text-lg" style="font-variation-settings: 'FILL' 1;">storefront</span>
                        </div>
                        <span class="text-[15px] sm:text-xl font-extrabold tracking-tighter text-slate-900">Smart Shop</span>
                    </a>
                    ${addressHTML}
                    <div class="hidden lg:flex items-center gap-5 ml-4">
                        <a href="shop.html?category=Mobiles" class="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all duration-300">Electronics</a>
                        <a href="shop.html?category=Clothes" class="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all duration-300">Fashion</a>
                        <a href="shop.html?category=Grocery" class="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all duration-300">Grocery</a>
                        <a href="shop.html" class="text-slate-500 hover:text-slate-900 text-sm font-medium transition-all duration-300">All</a>
                    </div>
                </div>

                <!-- Search + Actions -->
                <div class="flex items-center gap-2 md:gap-3">
                    <!-- Search Bar Desktop -->
                    <form action="shop.html" method="GET" class="hidden lg:flex relative items-center">
                        <input type="text" name="search" value="${currentSearch}" placeholder="Search products..." class="bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm w-56 xl:w-64 focus:ring-2 focus:ring-primary/40 transition-all outline-none"/>
                        <span class="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">search</span>
                        <input type="hidden" name="category" value="${currentCat}"/>
                    </form>

                    <div class="flex items-center gap-0">
                        <a href="cart.html" class="relative p-1.5 md:p-2 rounded-full hover:bg-slate-100/50 transition-all">
                            <span class="material-symbols-outlined text-slate-600 text-[20px] md:text-[24px]">shopping_cart</span>
                            <span id="nav-cart-count" class="absolute top-0 right-0 md:-top-0.5 md:-right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary text-white text-[9px] md:text-[10px] font-bold flex items-center justify-center transform translate-x-1 -translate-y-1" style="${getCartCount() > 0 ? '' : 'display:none'}">${getCartCount()}</span>
                        </a>
                        <a href="wishlist.html" class="p-1.5 md:p-2 rounded-full hover:bg-slate-100/50 transition-all hidden md:flex relative">
                            <span class="material-symbols-outlined text-slate-600">favorite</span>
                            ${getWishlist().length > 0 ? `<span class="absolute top-0 right-0 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center transform translate-x-1 -translate-y-1">${getWishlist().length}</span>` : ''}
                        </a>
                        ${profileContent}
                    </div>
                </div>
            </nav>
            
            <!-- Mobile Search -->
            <div class="lg:hidden px-3 pb-2.5">
                <form action="shop.html" method="GET" class="flex items-center relative">
                    <input type="text" name="search" value="${currentSearch}" placeholder="Search products..." class="w-full bg-surface-container-highest border-none rounded-md py-1.5 pl-9 pr-3 text-[13px] focus:ring-2 focus:ring-primary/40 transition-all outline-none"/>
                    <span class="material-symbols-outlined absolute left-2.5 text-on-surface-variant text-[16px]">search</span>
                </form>
            </div>
        </div>
    `;
    
    renderBottomNav();
}

// ══════════════════════════════════════════
// FIX #4: Edit Address prompt
// ══════════════════════════════════════════
function editAddress() {
    const current = getAddress();
    if (confirm("Would you like to auto-detect your location using GPS?")) {
        if (!navigator.geolocation) {
            alert('Geolocation is not supported by your browser.');
            return fallbackAddressPrompt(current);
        }
        showToast('Locating...', 'Fetching GPS...', 'my_location', 'blue');
        navigator.geolocation.getCurrentPosition(async (pos) => {
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`);
                const data = await res.json();
                let displayAddr = data.display_name;
                if (data.address) {
                    displayAddr = `${data.address.road || data.address.suburb || ''}, ${data.address.city || data.address.state_district || ''}`;
                }
                const confirmedAddress = prompt('We found this address. Please confirm or edit:', displayAddr.replace(/^,\s*/, '').trim());
                if (confirmedAddress && confirmedAddress.trim()) {
                    saveAddress(confirmedAddress.trim());
                    const el = document.getElementById('nav-address');
                    if (el) el.textContent = confirmedAddress.trim();
                    showToast('Address Saved', 'Your GPS location was saved successfully.', 'location_on', 'green');
                }
            } catch (err) {
                fallbackAddressPrompt(current);
            }
        }, () => {
            fallbackAddressPrompt(current);
        });
    } else {
        fallbackAddressPrompt(current);
    }
}

function fallbackAddressPrompt(current) {
    const newAddress = prompt('Enter your delivery address manually:', current);
    if (newAddress !== null && newAddress.trim()) {
        saveAddress(newAddress.trim());
        const el = document.getElementById('nav-address');
        if (el) el.textContent = newAddress.trim();
        showToast('Address Updated', 'Your delivery address has been saved.', 'location_on', 'blue');
    }
}

window.showWelcomeAnimation = function(name) {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl transition-opacity duration-500';
    overlay.innerHTML = `
        <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_10px_40px_-10px_rgba(34,197,94,0.6)] scale-0 animate-[bounceIn_0.6s_ease_forwards]">
            <span class="material-symbols-outlined text-white text-4xl" style="font-variation-settings: 'FILL' 1;">check</span>
        </div>
        <h2 class="text-3xl font-black text-slate-800 opacity-0 animate-[fadeUp_0.5s_ease_0.3s_forwards]">Welcome back</h2>
        <p class="text-slate-500 mt-2 font-medium opacity-0 animate-[fadeUp_0.5s_ease_0.4s_forwards]">${name}!</p>
    `;
    
    if (!document.getElementById('welcome-animations')) {
        const style = document.createElement('style');
        style.id = 'welcome-animations';
        style.innerHTML = `
            @keyframes bounceIn { 
                0% { transform: scale(0); opacity: 0; }
                60% { transform: scale(1.15); opacity: 1; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(overlay);
};

// ── Footer (Premium Design) ──
function renderFooter() {
    const footer = document.getElementById('footer-container');
    if (!footer) return;
    
    footer.className = "bg-slate-50 w-full py-12 px-8 mt-12 mb-20 md:mb-0 rounded-t-[2.5rem] md:rounded-none shadow-[0_-10px_40px_rgb(0,0,0,0.02)]";
    footer.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto text-sm leading-relaxed">
            <div class="space-y-4">
                <div class="flex items-center gap-2">
                    <div class="w-7 h-7 rounded-md signature-gradient flex items-center justify-center"><span class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">storefront</span></div>
                    <span class="text-lg font-extrabold text-slate-900">Smart Shop</span>
                </div>
                <p class="text-slate-500 max-w-xs">Crafting a premium shopping experience with curated electronics, fashion, and lifestyle essentials.</p>
                <div class="flex gap-3">
                    <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors"><span class="material-symbols-outlined text-sm">public</span></div>
                    <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors"><span class="material-symbols-outlined text-sm">alternate_email</span></div>
                    <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center cursor-pointer hover:bg-primary hover:text-white transition-colors"><span class="material-symbols-outlined text-sm">share</span></div>
                </div>
            </div>
            <div class="flex flex-col gap-3">
                <h4 class="font-bold text-slate-900 mb-2">Company</h4>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">About Us</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Careers</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Sustainability</a>
            </div>
            <div class="flex flex-col gap-3">
                <h4 class="font-bold text-slate-900 mb-2">Help</h4>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Support Center</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Shipping Policy</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Returns & Refunds</a>
            </div>
            <div class="flex flex-col gap-3">
                <h4 class="font-bold text-slate-900 mb-2">Resources</h4>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Gift Cards</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Store Locator</a>
                <a class="text-slate-500 hover:text-indigo-500 hover:translate-x-1 transition-transform duration-200 block" href="#">Join the Circle</a>
            </div>
        </div>
        <div class="max-w-7xl mx-auto border-t border-slate-200/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p class="text-slate-400 text-xs">© 2026 Smart Shop. All rights reserved.</p>
            <div class="flex gap-8 text-xs text-slate-400">
                <a class="hover:text-indigo-500" href="#">Privacy Policy</a>
                <a class="hover:text-indigo-500" href="#">Terms of Service</a>
                <a class="hover:text-indigo-500" href="#">Cookie Settings</a>
            </div>
        </div>
    `;
}

// ── Auth Helpers ──
function isAuthenticated() {
    return !!getProfile();
}

function handleLogout() {
    localStorage.removeItem('smartshop_profile');
    window.location.href = 'index.html';
}

// ── Search Suggestions ──
function initSearchSuggestions() {
    const searchInputs = document.querySelectorAll('input[name="search"]');
    searchInputs.forEach(input => {
        const wrapper = input.closest('form');
        if (!wrapper) return;
        wrapper.style.position = 'relative';
        
        const dropdown = document.createElement('div');
        dropdown.className = 'search-suggestions';
        dropdown.style.cssText = 'display:none; position:absolute; top:100%; left:0; right:0; background:white; border-radius:0 0 1rem 1rem; box-shadow:0 12px 40px rgba(25,28,30,0.12); z-index:200; max-height:350px; overflow-y:auto; margin-top:4px;';
        wrapper.appendChild(dropdown);
        
        let debounce;
        input.addEventListener('input', (e) => {
            clearTimeout(debounce);
            const query = e.target.value.trim().toLowerCase();
            if (query.length < 2) { dropdown.style.display = 'none'; return; }
            
            debounce = setTimeout(() => {
                // Search both local + API products
                const allSearchable = [...PRODUCTS, ...getApiProducts()];
                const seen = new Set();
                const results = allSearchable.filter(p => {
                    if (seen.has(p.id)) return false;
                    seen.add(p.id);
                    return p.name.toLowerCase().includes(query) || 
                           p.brand.toLowerCase().includes(query) ||
                           p.category.toLowerCase().includes(query);
                }).slice(0, 8);
                
                if (results.length === 0) {
                    dropdown.style.display = 'none';
                    return;
                }
                
                dropdown.innerHTML = results.map(p => `
                    <a href="javascript:void(0)" onclick="openProduct('${p.id}')" class="flex items-center gap-3 px-4 py-3 hover:bg-surface-container-low transition-colors cursor-pointer" style="text-decoration:none; color:inherit;">
                        <img src="${p.image}" alt="${p.name}" class="w-10 h-10 rounded-[0.5rem] object-contain bg-surface-container-low flex-shrink-0 p-1" onerror="this.src='https://via.placeholder.com/40'"/>
                        <div class="flex-grow min-w-0">
                            <p class="text-sm font-semibold text-on-surface truncate">${p.name}</p>
                            <p class="text-xs text-on-surface-variant">${p.brand} · ${p.category}</p>
                        </div>
                        <span class="text-sm font-bold text-on-surface flex-shrink-0">${formatPrice(p.price)}</span>
                    </a>
                `).join('');
                dropdown.style.display = 'block';
            }, 200);
        });
        
        input.addEventListener('blur', () => {
            setTimeout(() => { dropdown.style.display = 'none'; }, 200);
        });
        input.addEventListener('focus', (e) => {
            if (e.target.value.trim().length >= 2) {
                e.target.dispatchEvent(new Event('input'));
            }
        });
    });
}

// ── Mobile Bottom Navigation Bar ──
function renderBottomNav() {
    if (document.getElementById('bottom-nav')) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const navItems = [
        { icon: 'home', label: 'Home', href: 'index.html', active: currentPage === 'index.html' || currentPage === '' },
        { icon: 'grid_view', label: 'Shop', href: 'shop.html', active: currentPage === 'shop.html' || currentPage === 'category.html' },
        { icon: 'shopping_cart', label: 'Cart', href: 'cart.html', active: currentPage === 'cart.html', badge: getCartCount() },
        { icon: 'favorite', label: 'Wishlist', href: 'wishlist.html', active: currentPage === 'wishlist.html', badge: getWishlist().length },
        { icon: 'person', label: 'Account', href: 'profile.html', active: currentPage === 'profile.html' || currentPage === 'login.html' || currentPage === 'orders.html' }
    ];
    
    const nav = document.createElement('div');
    nav.id = 'bottom-nav';
    nav.className = 'md:hidden';
    nav.innerHTML = `
        <div class="fixed bottom-4 left-4 right-4 z-[200] bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-[2rem] flex justify-between items-center px-4 py-3">
            ${navItems.map(item => `
                <a href="${item.href}" class="relative flex flex-col items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${item.active ? 'bg-primary/10 scale-105' : 'hover:bg-slate-100'}">
                    <span class="material-symbols-outlined transition-all duration-300" style="font-size: ${item.active ? '26px' : '24px'}; color: ${item.active ? '#3525cd' : '#94a3b8'}; ${item.active ? "font-variation-settings: 'FILL' 1;" : ''}">${item.icon}</span>
                    ${item.badge > 0 ? `<span class="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-pink-500 text-white text-[9px] font-bold flex items-center justify-center border-2 border-white transform translate-x-1 -translate-y-1">${item.badge}</span>` : ''}
                </a>
            `).join('')}
        </div>
    `;
    document.body.appendChild(nav);
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
    renderNavbar();
    renderFooter();
    updateCartCount();
    initSearchSuggestions();
});
