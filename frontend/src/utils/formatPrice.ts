function formatPrice(price: string | undefined): string {
    return price ? `₪${parseFloat(price).toFixed(2)}` : '';
}

export default formatPrice;