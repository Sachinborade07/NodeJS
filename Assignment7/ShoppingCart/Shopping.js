function processCart(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = total > 100 ? total * 0.10 : 0;
    const finalAmount = total - discount;

    return {
        total: total.toFixed(2),
        discount: discount.toFixed(2),
        finalAmount: finalAmount.toFixed(2)
    };
}

const cart = [
    { price: 30, quantity: 2 },
    { price: 50, quantity: 1 },
    { price: 25, quantity: 1 }
];

console.log(processCart(cart));
