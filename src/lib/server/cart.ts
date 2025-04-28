import type { Cart, CartProduct } from "$lib/cart/types";

const carts: Map<Cart['id'], Cart['products']> = new Map();

export const getCart = (cartId: Cart['id']): Cart => {
    if (!carts.has(cartId)) carts.set(cartId, []);

    return {
        id: cartId,
        products: carts.get(cartId) || [],
    };
}

export const clearCart = (cartId: Cart['id']): Cart => {
    const cart = getCart(cartId);

    if (cart.products.length === 0) return cart;

    carts.set(cartId, []);

    return {
        id: cartId,
        products: [],
    };
}

export const addToCart = (cartId: Cart['id'], product: CartProduct): Cart => {
    const cart = getCart(cartId);
    const products = cart.products;

    const existing = products.find(p => p.id === product.id);
    console.log(cart, product, existing);

    if (existing) {
        //existing.quantity += product.quantity;
        //existing.quantity += 1;
        return cart;
    }

    cart.products.push(product);
    return cart;
}

export const removeFromCart = (cartId: Cart['id'], productId: CartProduct['id']): Cart => {
    const cart: Cart = getCart(cartId);
    const products: CartProduct[] = cart.products;

    const updated: CartProduct[] = products.filter(i => i.id !== productId);
    carts.set(cartId, updated);

    return {
        id: cartId,
        products: updated,
    };
}

export const decrementFromCart = (cartId: Cart['id'], product: CartProduct): Cart => {
    const cart = getCart(cartId);
    const products = cart.products;

    const existing = products.find(p => p.id === product.id);

    if (existing && existing.quantity > 1) {
        //existing.quantity -= product.quantity;
        existing.quantity -= 1;
        return cart;
    }

    return removeFromCart(cartId, product.id);
}

export const createCartSnapshot = (cart: Cart) => {
    return cart.products.map(p => ({
        id: p.id,
        quantity: p.quantity,
        price: p.product.price,
    }));
}
