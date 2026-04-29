// ==========================================
// Smart Shop - Shop Page Logic
// Premium Material Design 3
// Pagination + Filtering + Sorting + API
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;
    
    const countLabel = document.getElementById('results-count');
    const sortSelect = document.getElementById('sort-select');
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    const ratingFilter = document.getElementById('rating-filter');
    const categoryFilter = document.getElementById('category-filter');
    const paginationEl = document.getElementById('pagination');
    const pageTitle = document.getElementById('page-title');
    
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search') || '';
    const categoryParam = urlParams.get('category') || '';
    
    if (categoryFilter && categoryParam) {
        categoryFilter.value = categoryParam;
    }
    
    // Update page title based on context
    if (pageTitle) {
        if (searchQuery) {
            pageTitle.textContent = `Results for "${searchQuery}"`;
        } else if (categoryParam && categoryParam !== 'All') {
            pageTitle.textContent = categoryParam;
        }
    }
    
    let currentFilters = {
        search: searchQuery,
        category: categoryParam,
        minPrice: 0,
        maxPrice: 500000,
        minRating: 0
    };
    
    let currentSort = 'popularity';
    let currentPage = 1;
    const ITEMS_PER_PAGE = 20;
    let allProducts = [...PRODUCTS];
    let apiLoaded = false;
    
    // ── Load additional products from DummyJSON API ──
    async function loadAPIProducts() {
        if (apiLoaded) return;
        try {
            const res = await fetch('https://dummyjson.com/products?limit=100&select=title,price,thumbnail,images,category,rating,brand,description,stock');
            const data = await res.json();
            
            if (data.products && data.products.length > 0) {
                const categoryMap = {
                    'smartphones': 'Mobiles',
                    'laptops': 'Laptops',
                    'mens-shirts': 'Clothes', 'mens-shoes': 'Clothes', 'womens-dresses': 'Clothes',
                    'womens-shoes': 'Clothes', 'womens-bags': 'Accessories', 'womens-jewellery': 'Accessories',
                    'mens-watches': 'Accessories', 'womens-watches': 'Accessories', 'sunglasses': 'Accessories',
                    'tops': 'Clothes', 'fragrances': 'Accessories', 'skincare': 'Accessories',
                    'groceries': 'Grocery', 'home-decoration': 'Accessories',
                    'furniture': 'Accessories', 'lighting': 'Accessories',
                    'automotive': 'Accessories', 'motorcycle': 'Accessories',
                    'tablets': 'Laptops', 'mobile-accessories': 'Accessories',
                    'kitchen-accessories': 'Accessories', 'sports-accessories': 'Accessories',
                    'vehicle': 'Accessories'
                };
                
                const apiProducts = data.products.map((p, i) => ({
                    id: `api-${p.id}`,
                    name: p.title,
                    brand: p.brand || 'Brand',
                    category: categoryMap[p.category] || 'Accessories',
                    price: Math.round(p.price * 83),
                    originalPrice: Math.round(p.price * 83 * 1.2),
                    image: p.thumbnail || (p.images && p.images[0]) || 'https://via.placeholder.com/300',
                    rating: Math.round(p.rating * 10) / 10 || 4.0,
                    numReviews: Math.floor(Math.random() * 5000) + 100,
                    description: p.description || 'Premium quality product',
                    specs: [],
                    inStock: (p.stock || 0) > 0,
                    popularity: Math.floor(Math.random() * 100),
                    reviews: []
                }));
                
                const localIds = new Set(allProducts.map(p => p.name.toLowerCase()));
                const newProducts = apiProducts.filter(p => !localIds.has(p.name.toLowerCase()));
                allProducts = [...PRODUCTS, ...newProducts];
                apiLoaded = true;
                
                // FIX #1: Cache API products in localStorage so product.html can find them
                saveApiProducts(newProducts);
                
                console.log(`✅ Loaded ${newProducts.length} products from API. Total: ${allProducts.length}`);
                renderProducts();
            }
        } catch(e) {
            console.log('API fetch skipped, using local products:', e.message);
        }
    }
    
    // ── Render Products with Pagination ──
    function renderProducts() {
        let products = filterProducts(allProducts, currentFilters);
        products = sortProducts(products, currentSort);
        
        const totalProducts = products.length;
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
        
        if (currentPage > totalPages) currentPage = totalPages || 1;
        
        const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
        const pageProducts = products.slice(startIdx, startIdx + ITEMS_PER_PAGE);
        
        if (countLabel) {
            let filterTags = '';
            if (currentFilters.search) {
                filterTags += `<span class="ml-2 px-3 py-1 bg-primary-fixed rounded-full text-sm font-semibold text-primary">"<b>${currentFilters.search}</b>"</span>`;
            }
            if (currentFilters.category && currentFilters.category !== 'All') {
                filterTags += `<span class="ml-2 px-3 py-1 bg-secondary-fixed rounded-full text-sm font-semibold text-secondary">in "${currentFilters.category}"</span>`;
            }
            const showingFrom = totalProducts > 0 ? startIdx + 1 : 0;
            const showingTo = Math.min(startIdx + ITEMS_PER_PAGE, totalProducts);
            countLabel.innerHTML = `Showing <span class="font-bold text-primary">${showingFrom}-${showingTo}</span> of <span class="font-bold">${totalProducts}</span> products ${filterTags}`;
        }
        
        grid.innerHTML = '';
        
        if (pageProducts.length === 0) {
            grid.innerHTML = `
                <div class="col-span-full empty-state bg-surface-container-lowest rounded-lg">
                    <div class="empty-state-icon">
                        <span class="material-symbols-outlined text-4xl text-primary">search_off</span>
                    </div>
                    <h3 class="text-xl font-bold text-on-surface mb-2">No matching items</h3>
                    <p class="text-on-surface-variant mb-4">Try broadening your search or checking different categories.</p>
                    <a href="shop.html" class="btn-primary text-sm px-6 py-3">View All Products</a>
                </div>
            `;
            if (paginationEl) paginationEl.innerHTML = '';
            return;
        }
        
        pageProducts.forEach((p, idx) => {
            const card = document.createElement('div');
            card.style.opacity = '0';
            card.style.animation = `fadeUp 0.35s ease ${idx * 25}ms forwards`;
            card.innerHTML = generateProductCard(p);
            grid.appendChild(card.firstElementChild || card);
        });
        
        updateWishlistButtons();
        renderPagination(totalPages);
    }
    
    // ── Pagination Renderer ──
    function renderPagination(totalPages) {
        if (!paginationEl || totalPages <= 1) {
            if (paginationEl) paginationEl.innerHTML = '';
            return;
        }
        
        let html = '';
        
        html += `<button onclick="changePage(${currentPage - 1})" class="w-10 h-10 rounded-full text-sm font-medium border border-outline-variant/20 ${currentPage === 1 ? 'text-outline-variant cursor-not-allowed' : 'text-on-surface hover:bg-surface-container-low hover:border-primary/30'}" ${currentPage === 1 ? 'disabled' : ''}>
            <span class="material-symbols-outlined text-sm">chevron_left</span>
        </button>`;
        
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }
        
        if (startPage > 1) {
            html += `<button onclick="changePage(1)" class="w-10 h-10 rounded-full text-sm font-medium border border-outline-variant/20 text-on-surface hover:bg-surface-container-low">1</button>`;
            if (startPage > 2) html += `<span class="text-outline px-1">...</span>`;
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const isActive = i === currentPage;
            html += `<button onclick="changePage(${i})" class="w-10 h-10 rounded-full text-sm font-bold ${isActive ? 'signature-gradient text-white shadow-md shadow-primary/20' : 'border border-outline-variant/20 text-on-surface hover:bg-surface-container-low'}">${i}</button>`;
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) html += `<span class="text-outline px-1">...</span>`;
            html += `<button onclick="changePage(${totalPages})" class="w-10 h-10 rounded-full text-sm font-medium border border-outline-variant/20 text-on-surface hover:bg-surface-container-low">${totalPages}</button>`;
        }
        
        html += `<button onclick="changePage(${currentPage + 1})" class="w-10 h-10 rounded-full text-sm font-medium border border-outline-variant/20 ${currentPage === totalPages ? 'text-outline-variant cursor-not-allowed' : 'text-on-surface hover:bg-surface-container-low hover:border-primary/30'}" ${currentPage === totalPages ? 'disabled' : ''}>
            <span class="material-symbols-outlined text-sm">chevron_right</span>
        </button>`;
        
        paginationEl.innerHTML = html;
    }
    
    window.changePage = function(page) {
        const totalProducts = filterProducts(allProducts, currentFilters).length;
        const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
        if (page < 1 || page > totalPages) return;
        currentPage = page;
        renderProducts();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    
    // ── Event Handlers ──
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            currentSort = e.target.value;
            currentPage = 1;
            renderProducts();
        });
    }
    
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            currentFilters.maxPrice = parseInt(e.target.value);
            if (priceValue) priceValue.textContent = formatPrice(currentFilters.maxPrice);
            currentPage = 1;
            renderProducts();
        });
    }
    
    if (ratingFilter) {
        ratingFilter.addEventListener('change', (e) => {
            currentFilters.minRating = parseFloat(e.target.value) || 0;
            currentPage = 1;
            renderProducts();
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            currentPage = 1;
            if (pageTitle) {
                pageTitle.textContent = e.target.value && e.target.value !== 'All' ? e.target.value : 'All Products';
            }
            renderProducts();
        });
    }
    
    renderProducts();
    loadAPIProducts();
});
