// ==========================================
// Smart Shop - API Integration Layer
// Connects frontend to Express backend
// Falls back to localStorage when offline
// ==========================================

const API_BASE = 'http://localhost:5001/api';

// ── Check if backend is available ──
let _backendOnline = false;
let _backendChecked = false;

async function checkBackend() {
    if (_backendChecked) return _backendOnline;
    try {
        const res = await fetch(API_BASE + '/health', { signal: AbortSignal.timeout(2000) });
        _backendOnline = res.ok;
    } catch {
        _backendOnline = false;
    }
    _backendChecked = true;
    // Recheck every 30s
    setTimeout(() => { _backendChecked = false; }, 30000);
    console.log(_backendOnline ? '🟢 Backend connected' : '🟡 Backend offline — using localStorage');
    return _backendOnline;
}

// ── JWT Token Management ──
function getToken() {
    return localStorage.getItem('smartshop_token');
}
function setToken(token) {
    localStorage.setItem('smartshop_token', token);
}
function removeToken() {
    localStorage.removeItem('smartshop_token');
}

// ── Core Fetch Wrapper ──
async function apiFetch(endpoint, options = {}) {
    const token = getToken();
    const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
    };

    const res = await fetch(API_BASE + endpoint, {
        ...options,
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || `API Error ${res.status}`);
    }
    return data;
}

// ══════════════════════════════════════════
// AUTH API
// ══════════════════════════════════════════
const AuthAPI = {
    // Register new user
    async register(firstName, lastName, email, password, phone) {
        const online = await checkBackend();
        if (!online) {
            // Fallback: localStorage
            const profile = { name: `${firstName} ${lastName}`, email, phone: phone || '' };
            localStorage.setItem('smartshop_profile', JSON.stringify(profile));
            return profile;
        }
        const data = await apiFetch('/auth/register', {
            method: 'POST',
            body: { firstName, lastName, email, password, phone }
        });
        setToken(data.token);
        const profile = {
            _id: data._id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address
        };
        localStorage.setItem('smartshop_profile', JSON.stringify(profile));
        return profile;
    },

    // Login with email/password
    async login(email, password) {
        const online = await checkBackend();
        if (!online) {
            const name = email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const profile = { name, email };
            localStorage.setItem('smartshop_profile', JSON.stringify(profile));
            return profile;
        }
        const data = await apiFetch('/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        setToken(data.token);
        const profile = {
            _id: data._id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address
        };
        localStorage.setItem('smartshop_profile', JSON.stringify(profile));
        return profile;
    },

    // Google login
    async googleLogin(name, email, googleId, photoURL) {
        const online = await checkBackend();
        if (!online) {
            const profile = { name, email, method: 'google', photoURL };
            localStorage.setItem('smartshop_profile', JSON.stringify(profile));
            return profile;
        }
        const data = await apiFetch('/auth/google', {
            method: 'POST',
            body: { name, email, googleId }
        });
        setToken(data.token);
        const profile = {
            _id: data._id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address,
            method: 'google',
            photoURL: photoURL // Save locally so frontend can show avatar
        };
        localStorage.setItem('smartshop_profile', JSON.stringify(profile));
        return profile;
    },

    // Get user profile from server
    async getProfile() {
        const online = await checkBackend();
        if (!online) return JSON.parse(localStorage.getItem('smartshop_profile') || 'null');
        try {
            const data = await apiFetch('/auth/profile');
            const profile = {
                _id: data._id,
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phone,
                address: data.address
            };
            localStorage.setItem('smartshop_profile', JSON.stringify(profile));
            return profile;
        } catch {
            return JSON.parse(localStorage.getItem('smartshop_profile') || 'null');
        }
    },

    // Update profile (name, phone, address)
    async updateProfile(profileData) {
        const online = await checkBackend();
        if (!online) {
            const existing = JSON.parse(localStorage.getItem('smartshop_profile') || '{}');
            const updated = { ...existing, ...profileData };
            localStorage.setItem('smartshop_profile', JSON.stringify(updated));
            if (profileData.address) localStorage.setItem('smartshop_address', profileData.address.street || '');
            return updated;
        }
        const names = (profileData.name || '').split(' ');
        const data = await apiFetch('/auth/profile', {
            method: 'PUT',
            body: {
                firstName: names[0] || '',
                lastName: names.slice(1).join(' ') || '',
                phone: profileData.phone,
                address: profileData.address
            }
        });
        setToken(data.token);
        const profile = {
            _id: data._id,
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone,
            address: data.address
        };
        localStorage.setItem('smartshop_profile', JSON.stringify(profile));
        return profile;
    },

    // Logout
    logout() {
        removeToken();
        localStorage.removeItem('smartshop_profile');
    },

    // Check if logged in
    isLoggedIn() {
        return !!getToken() || !!localStorage.getItem('smartshop_profile');
    }
};

// ══════════════════════════════════════════
// PRODUCTS API
// ══════════════════════════════════════════
const ProductsAPI = {
    // Get all products (with optional filters)
    async getAll(filters = {}) {
        const online = await checkBackend();
        if (!online) return null; // fallback to local PRODUCTS
        
        const params = new URLSearchParams();
        if (filters.search) params.set('search', filters.search);
        if (filters.category) params.set('category', filters.category);
        
        return apiFetch('/products?' + params.toString());
    },

    // Get single product by ID
    async getById(id) {
        const online = await checkBackend();
        if (!online) return null;
        return apiFetch('/products/' + id);
    }
};

// ══════════════════════════════════════════
// CART API (synced with backend)
// ══════════════════════════════════════════
const CartAPI = {
    // Get cart from backend
    async get() {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        try {
            return await apiFetch('/cart');
        } catch { return null; }
    },

    // Add item to cart
    async add(productId, quantity = 1) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/cart', {
            method: 'POST',
            body: { productId, quantity }
        });
    },

    // Update quantity
    async update(productId, quantity) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/cart/' + productId, {
            method: 'PUT',
            body: { quantity }
        });
    },

    // Remove item
    async remove(productId) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/cart/' + productId, { method: 'DELETE' });
    },

    // Clear cart
    async clear() {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/cart', { method: 'DELETE' });
    }
};

// ══════════════════════════════════════════
// ORDERS API
// ══════════════════════════════════════════
const OrdersAPI = {
    // Create order
    async create(orderData) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/orders', {
            method: 'POST',
            body: orderData
        });
    },

    // Get my orders
    async getMyOrders() {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        try {
            return await apiFetch('/orders/myorders');
        } catch { return null; }
    }
};

// ══════════════════════════════════════════
// REVIEWS API
// ══════════════════════════════════════════
const ReviewsAPI = {
    // Get reviews for a product
    async getForProduct(productId) {
        const online = await checkBackend();
        if (!online) return null;
        try {
            return await apiFetch('/reviews/' + productId);
        } catch { return null; }
    },

    // Submit a review
    async submit(productId, rating, comment) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/reviews', {
            method: 'POST',
            body: { productId, rating, comment }
        });
    },

    // Delete a review
    async remove(reviewId) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/reviews/' + reviewId, { method: 'DELETE' });
    }
};

// ══════════════════════════════════════════
// PAYMENT API (Razorpay)
// ══════════════════════════════════════════
const PaymentAPI = {
    // Create Razorpay order
    async createOrder(amount, receipt) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/payment/create-order', {
            method: 'POST',
            body: { amount, currency: 'INR', receipt }
        });
    },

    // Verify payment
    async verify(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
        const online = await checkBackend();
        if (!online || !getToken()) return null;
        return apiFetch('/payment/verify', {
            method: 'POST',
            body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
        });
    }
};

// ── Init: Auto-check backend on load ──
checkBackend();

console.log('📡 Smart Shop API layer loaded');
