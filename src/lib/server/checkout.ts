import type { Cart } from "$lib/cart/types";
import { createCartSnapshot } from "./cart";

const checkouts = new Map();

export const getCheckoutSession = (sessionId: string) => {
    if (!checkouts.has(sessionId)) checkouts.set(sessionId, []);

    return checkouts.get(sessionId) || [];
}

export const createCheckoutSession = (cart: Cart) => {
    const sessionId = crypto.randomUUID();

    checkouts.set(sessionId, {
        id: sessionId,
        cartSnapshot: createCartSnapshot(cart),
        status: 'pending',
        createdAt: Date.now(),
    })

    return sessionId 
}

export const deleteCheckoutSession = (sessionId: string) => {
    const success = checkouts.delete(sessionId)

    return {
        success,
    };
}
