import { json, type RequestHandler } from "@sveltejs/kit";
import { decrementFromCart } from "$lib/server/cart";
import type { CartProduct } from "$lib/cart/types";

export const PATCH: RequestHandler= async ({ locals, request }) => {
    const product: CartProduct = await request.json();
    const cart = decrementFromCart(locals.cartId, product);

    return json(cart);
}
