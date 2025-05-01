import type { LayoutServerLoad } from './$types';
import { getCart } from '$lib/server/cart';
import { SECRET_API_KEY } from '$env/static/private';

export const load: LayoutServerLoad = async ({ locals, fetch }) => {
    let themes = [];

    try {
        const res = await fetch(`/api/themes?id=1,2,3`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${ SECRET_API_KEY }`
            }
        });

        if (!res.ok) throw new Error(`(${res.status}) Failed to fetch theme. ${res.statusText}`);

        const data = await res.json();
        if (data) themes = data;

    } catch (err) {
        console.error(err);
    }

    return {
        cart: getCart(locals.cartId),
        themes,
    }
};
