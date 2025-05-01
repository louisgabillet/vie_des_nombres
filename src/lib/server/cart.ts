import type { Cart, CartProduct } from "$lib/cart/types";
import type { Product } from "$lib/types";

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

export const addToCart = (cartId: Cart['id'], product: Product): CartProduct => {
    const cart = getCart(cartId);

    const products = cart.products;
    const existing = products.find(p => p.product.id === product.id);

    if (existing) {
        //existing.quantity += 1;
        return existing;
    }
    
    const cartProduct: CartProduct = {
        id: crypto.randomUUID(),
        product,
        quantity: 1,
    }

    cart.products.push(cartProduct);
    return cartProduct;
}

export const removeFromCart = (cartId: Cart['id'], productId: Product['id']): Cart => {
    const cart: Cart = getCart(cartId);
    const index: number = cart.products.findIndex(p => p.product.id === productId);

    if (index === -1) return cart;

    const updated: CartProduct[] = cart.products.filter(i => i.product.id !== productId);

    carts.set(cartId, updated);

    return {
        id: cartId,
        products: updated,
    };
}

export const decrementFromCart = (cartId: Cart['id'], productId: Product['id']): Cart => {
    const cart = getCart(cartId);
    const existing = cart.products.find(p => p.product.id === productId);

    if (existing && existing.quantity > 1) {
        existing.quantity -= 1;
        return cart;
    }

    return removeFromCart(cartId, productId);
}

export const createCartSnapshot = (cart: Cart) => {
    return cart.products.map(p => ({
        id: p.id,
        quantity: p.quantity,
        price: p.product.price,
    }));
}
