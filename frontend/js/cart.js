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
            <div class="bg-white rounded-[2rem] p-12 md:p-20 shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center">
                <div class="w-24 h-24 rounded-[1.5rem] bg-indigo-50 flex items-center justify-center mb-6 shadow-inner border border-indigo-100">
                    <span class="material-symbols-outlined text-indigo-400" style="font-size: 48px;">shopping_bag</span>
                </div>
                <h3 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 font-heading tracking-tight">Your cart is empty</h3>
                <p class="text-slate-500 font-medium mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Discover something beautiful!</p>
                <a href="shop.html" class="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-600/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-2">
                    <span class="material-symbols-outlined text-[20px]">explore</span> Start Shopping
                </a>
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
        <div class="group relative flex flex-col md:flex-row gap-5 md:gap-8 p-4 md:p-5 bg-white border border-slate-200/60 rounded-[2rem] transition-all duration-300 hover:shadow-xl hover:border-indigo-100 mb-4 items-center">
            <div class="w-full md:w-36 h-36 rounded-[1.5rem] overflow-hidden bg-slate-50 cursor-pointer flex-shrink-0 border border-slate-100/50 flex items-center justify-center" onclick="window.location.href='product.html?id=${product.id}'">
                <img class="w-[80%] h-[80%] object-contain transition-transform duration-500 group-hover:scale-110 mix-blend-multiply" src="${product.image}" alt="${product.name}"/>
            </div>
            
            <div class="flex-1 w-full flex flex-col justify-between py-2">
                <div class="flex justify-between items-start gap-4">
                    <div>
                        <span class="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em] mb-1.5 block bg-indigo-50 w-fit px-2 py-0.5 rounded-md border border-indigo-100/50">${product.brand}</span>
                        <h3 class="text-lg md:text-xl font-extrabold tracking-tight text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors font-heading leading-tight" style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${product.name}</h3>
                    </div>
                    <button onclick="removeFromCart('${product.id}'); loadCart();" class="text-slate-300 hover:text-red-500 transition-all p-2 rounded-full hover:bg-red-50 flex-shrink-0 group/del">
                        <span class="material-symbols-outlined group-hover/del:scale-110 transition-transform">delete</span>
                    </button>
                </div>
                
                <div class="flex flex-wrap items-end justify-between mt-6 gap-4">
                    <div class="flex items-center bg-slate-50 rounded-[1rem] p-1 border border-slate-200 shadow-sm">
                        <button onclick="updateCartQty('${product.id}', ${item.quantity - 1}); loadCart();" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all hover:shadow-sm">
                            <span class="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span class="w-10 text-center font-extrabold text-slate-900">${item.quantity}</span>
                        <button onclick="updateCartQty('${product.id}', ${item.quantity + 1}); loadCart();" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all hover:shadow-sm">
                            <span class="material-symbols-outlined text-[16px]">add</span>
                        </button>
                    </div>
                    <div class="text-2xl font-black tracking-tighter text-slate-900 font-heading">
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
