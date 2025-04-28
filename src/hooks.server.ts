import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    let cartId: string | undefined = event.cookies.get('cart_id');

    if (!cartId) {
        cartId = crypto.randomUUID();
        event.cookies.set('cart_id', cartId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    event.locals.cartId = cartId;
    return resolve(event);
}
