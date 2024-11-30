const currency = 'INR'

export const currencyFormat = (price) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency ?? 'USD',
    });
    return formatter.format(price);
}