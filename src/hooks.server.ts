import { v4 as uuidv4 } from 'uuid';
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
    let cartId: string | undefined = event.cookies.get('cartId');

    if (!cartId) {
        cartId = uuidv4();
        event.cookies.set('cartId', cartId, {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 30,
        });
    }

    event.locals.cartId = cartId;
    return resolve(event);
}
