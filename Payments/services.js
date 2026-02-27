const Razorpay = require('razorpay');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function createOrder(amount, currency = 'INR', receipt) {
    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Amount in paise
            currency,
            receipt,
        });
        return order;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}

async function verifyPayment(orderId, paymentId, signature) {
    try {
        const isValid = razorpay.payments.validate(
            [orderId, paymentId, signature].join('|')
        );
        return isValid;
    } catch (error) {
        throw new Error(`Payment verification failed: ${error.message}`);
    }
}

async function capturePayment(paymentId, amount) {
    try {
        const payment = await razorpay.payments.capture(paymentId, amount * 100);
        return payment;
    } catch (error) {
        throw new Error(`Payment capture failed: ${error.message}`);
    }
}

module.exports = {
    createOrder,
    verifyPayment,
    capturePayment,
};