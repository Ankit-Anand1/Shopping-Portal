        function switchPayment(method) {
            // Hide all
            document.getElementById('payment-card-form').style.display = 'none';
            document.getElementById('payment-upi-form').style.display = 'none';
            document.getElementById('payment-cod-form').style.display = 'none';
            
            // Reset all option styles
            ['pay-card', 'pay-upi', 'pay-cod'].forEach(id => {
                document.getElementById(id).className = 'flex items-center gap-3 p-4 rounded-lg border-2 border-outline-variant/20 hover:border-primary/40 transition-all';
                document.getElementById(id).querySelector('.material-symbols-outlined').className = 'material-symbols-outlined text-on-surface-variant';
            });
            
            // Show selected
            const activeId = 'pay-' + method;
            document.getElementById(activeId).className = 'flex items-center gap-3 p-4 rounded-lg border-2 border-primary bg-primary-fixed/20 transition-all';
            document.getElementById(activeId).querySelector('.material-symbols-outlined').className = 'material-symbols-outlined text-primary';
            
            if (method === 'card') {
                document.getElementById('payment-card-form').style.display = 'block';
                document.getElementById('checkout-btn-text').textContent = 'Confirm & Pay';
            } else if (method === 'upi') {
                document.getElementById('payment-upi-form').style.display = 'block';
                document.getElementById('checkout-btn-text').textContent = 'Pay with UPI';
            } else if (method === 'cod') {
                document.getElementById('payment-cod-form').style.display = 'block';
                document.getElementById('checkout-btn-text').textContent = 'Place Order (COD)';
            }
        }
