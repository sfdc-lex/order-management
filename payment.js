class PaymentProcessor {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    async processPayment(amount, cardToken, orderId) {
        try {
            const response = await fetch('/api/payments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    amount,
                    cardToken,
                    orderId
                })
            });

            if (!response.ok) throw new Error('Payment failed');
            return await response.json();
        } catch (error) {
            console.error('Payment processing error:', error);
            throw error;
        }
    }

    async processRefund(paymentId, amount, reason) {
        try {
            const response = await fetch(`/api/refunds`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    paymentId,
                    amount,
                    reason
                })
            });

            if (!response.ok) throw new Error('Refund failed');
            return await response.json();
        } catch (error) {
            console.error('Refund processing error:', error);
            throw error;
        }
    }

    async getPaymentStatus(paymentId) {
        try {
            const response = await fetch(`/api/payments/${paymentId}`, {
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch payment status');
            return await response.json();
        } catch (error) {
            console.error('Status check error:', error);
            throw error;
        }
    }
}

module.exports = PaymentProcessor;