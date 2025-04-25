import { json, type RequestHandler } from "@sveltejs/kit";
import { getCart } from "$lib/server/cart";
import type { Cart } from "$lib/types";

export const GET: RequestHandler = ({ locals }) => {
    const cart: Cart = getCart(locals.cartId);

    return json(cart);
}
