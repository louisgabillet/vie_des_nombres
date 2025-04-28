import { json, type RequestHandler } from "@sveltejs/kit";
import { removeFromCart } from "$lib/server/cart";
import type { CartProduct } from "$lib/cart/types";

export const DELETE: RequestHandler= async ({ locals, request }) => {
    const { id }: CartProduct = await request.json();
    const cart = removeFromCart(locals.cartId, id);

    return json(cart);
}
