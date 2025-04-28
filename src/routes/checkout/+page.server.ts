import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createCartSnapshot, getCart } from '$lib/server/cart';
import { createCheckoutSession, deleteCheckoutSession, getCheckoutSession } from '$lib/server/checkout';


export const load: PageServerLoad = async ({ cookies, locals }) => {
    const checkoutSessionCookie = cookies.get('checkout_session_id');
    const cart = getCart(locals.cartId);

    if (!cart || cart.products.length === 0) {
        if (checkoutSessionCookie) {
            cookies.delete('checkout_session_id', { path: '/' });
            deleteCheckoutSession(checkoutSessionCookie)
        }

        redirect(302, '/cart');
    }

    let sessionId = checkoutSessionCookie || createCheckoutSession(cart);
    const session = getCheckoutSession(sessionId);

    const cartSnapshot = createCartSnapshot(cart);
    const isCartDifferent = JSON.stringify(cartSnapshot) !== JSON.stringify(session.cartSnapshot);

    if (isCartDifferent) sessionId = createCheckoutSession(cart);

    if (!checkoutSessionCookie || isCartDifferent) {
        cookies.set('checkout_session_id', sessionId, {
            path: '/',
            httpOnly: true,
            maxAge: 1800,
        });
    }

	return { 
        cart,
        session: getCheckoutSession(sessionId),
    };
};

export const actions: Actions = {
    order: async ({ request }) => {
        const formData = await request.formData();

        if (!formData) {
            redirect(302, '/checkout/cancel');
        }

        redirect(302, '/checkout/success');
    }
}
