// ==========================================
// Smart Shop - Cart Page Logic
// Premium Material Design 3 UI
// ==========================================

function loadCart() {
    const container = document.getElementById('cart-items-container');
    const countLabel = document.getElementById('cart-count');
    const subtotalLabel = document.getElementById('cart-subtotal');
    const totalLabel = document.getElementById('cart-total');
    const taxLabel = document.getElementById('cart-tax');
    
    if (!container) return;
    
    const cart = getCart();
    
    if (countLabel) {
        countLabel.innerHTML = `Your Cart <span class="text-primary bg-primary-fixed rounded-full px-3 py-1 text-sm align-middle ml-2 font-bold">${cart.length}</span>`;
    }
    
    container.innerHTML = '';
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-state bg-surface-container-lowest rounded-lg">
                <div class="empty-state-icon">
                    <span class="material-symbols-outlined text-[40px] text-on-surface-variant">shopping_bag</span>
                </div>
                <h3 class="text-2xl font-black text-on-surface mb-2">Your cart is empty</h3>
                <p class="text-on-surface-variant font-medium mb-8">Looks like you haven't added anything to your cart yet.</p>
                <a href="shop.html" class="btn-primary">Start Shopping</a>
            </div>
        `;
        if (subtotalLabel) subtotalLabel.textContent = formatPrice(0);
        if (totalLabel) totalLabel.textContent = formatPrice(0);
        if (taxLabel) taxLabel.textContent = formatPrice(0);
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const product = getProductById(item.productId);
        if (!product) return;
        
        const amount = product.price * item.quantity;
        total += amount;
        
        container.innerHTML += `
        <div class="group relative flex flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-6 bg-surface-container-lowest rounded-lg transition-all duration-500 hover:shadow-ambient hover:scale-[1.01] mb-4">
            <div class="w-full md:w-40 h-40 rounded-md overflow-hidden bg-surface-container-low cursor-pointer flex-shrink-0" onclick="window.location.href='product.html?id=${product.id}'">
                <img class="w-full h-full object-contain p-3" src="${product.image}" alt="${product.name}" style="mix-blend-mode: multiply;"/>
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div class="flex justify-between items-start">
                    <div>
                        <span class="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1 block">${product.brand}</span>
                        <h3 class="text-lg md:text-2xl font-bold tracking-tight text-on-surface cursor-pointer hover:text-primary transition-colors" onclick="window.location.href='product.html?id=${product.id}'">${product.name}</h3>
                    </div>
                    <button onclick="removeFromCart('${product.id}'); loadCart();" class="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container/30">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </div>
                <div class="flex flex-wrap items-center justify-between mt-4 gap-4">
                    <div class="flex items-center bg-surface-container-high rounded-full p-1 border border-outline-variant/15">
                        <button onclick="updateCartQty('${product.id}', ${item.quantity - 1}); loadCart();" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-lowest transition-all">
                            <span class="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span class="px-4 md:px-6 font-semibold text-on-surface">${item.quantity}</span>
                        <button onclick="updateCartQty('${product.id}', ${item.quantity + 1}); loadCart();" class="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-lowest transition-all">
                            <span class="material-symbols-outlined text-sm">add</span>
                        </button>
                    </div>
                    <div class="text-xl md:text-2xl font-bold tracking-tighter text-on-surface">
                        ${formatPrice(amount)}
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    
    const tax = Math.round(total * 0.18);
    const grandTotal = total + tax;
    
    if (subtotalLabel) subtotalLabel.textContent = formatPrice(total);
    if (taxLabel) taxLabel.textContent = formatPrice(tax);
    if (totalLabel) totalLabel.textContent = formatPrice(grandTotal);
}

document.addEventListener('DOMContentLoaded', loadCart);
