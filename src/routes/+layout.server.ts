import type { LayoutServerLoad } from './$types';
import { getCart } from '$lib/server/cart';

export const load: LayoutServerLoad = async ({ locals }) => {
    return {
        cart: getCart(locals.cartId),
    }
};
