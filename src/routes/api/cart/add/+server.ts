import { json, type RequestHandler } from "@sveltejs/kit";
import { addToCart } from "$lib/server/cart";
import type { CartProduct } from "$lib/types";

export const POST: RequestHandler= async ({ locals, request }) => {
    const product: CartProduct = await request.json();
    const cart = addToCart(locals.cartId, product);

    return json(cart);
}
