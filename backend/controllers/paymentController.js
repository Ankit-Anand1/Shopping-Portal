const crypto = require('crypto');

// NOTE: For production, install razorpay: npm install razorpay
// const Razorpay = require('razorpay');
// const instance = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
const createPaymentOrder = async (req, res) => {
    const { amount, currency = 'INR', receipt } = req.body;
    try {
        // ━━━━━━ DEMO MODE ━━━━━━
        // In production, uncomment the Razorpay code above and use:
        // const order = await instance.orders.create({
        //     amount: amount * 100, // Razorpay expects paise
        //     currency, receipt
        // });
        // return res.json(order);
        
        // Demo: generate mock order
        const mockOrder = {
            id: 'order_' + crypto.randomBytes(10).toString('hex'),
            entity: 'order',
            amount: amount * 100,
            amount_paid: 0,
            amount_due: amount * 100,
            currency,
            receipt: receipt || 'rcpt_' + Date.now(),
            status: 'created',
            created_at: Math.floor(Date.now() / 1000)
        };
        res.json(mockOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    try {
        // ━━━━━━ DEMO MODE ━━━━━━
        // In production, verify with Razorpay:
        // const expectedSignature = crypto
        //     .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        //     .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        //     .digest('hex');
        // 
        // if (expectedSignature === razorpay_signature) {
        //     return res.json({ verified: true });
        // } else {
        //     return res.status(400).json({ verified: false, message: 'Invalid signature' });
        // }
        
        // Demo: always verify as success
        res.json({
            verified: true,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id || 'pay_demo_' + Date.now()
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { createPaymentOrder, verifyPayment };
