import { json, type RequestHandler } from "@sveltejs/kit";
import { clearCart } from "$lib/server/cart";
import type { Cart } from "$lib/cart/types";

export const DELETE: RequestHandler= async ({ locals  }) => {
    const cart: Cart = clearCart(locals.cartId);

    return json(cart);
}
