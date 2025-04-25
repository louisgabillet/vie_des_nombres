import type { LayoutServerLoad } from './$types';
import { getCart } from '$lib/server/cart';

export const load: LayoutServerLoad = ({ locals }) => {
    const cartId = locals.cartId;
    const cart = getCart(cartId);

    return {
        cart
    }
};
