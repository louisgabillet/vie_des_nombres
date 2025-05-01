import { fail } from '@sveltejs/kit';
import { z } from 'zod';
import type { Actions } from './$types';
import { SECRET_API_KEY } from '$env/static/private';
import { addToCart, clearCart, decrementFromCart, removeFromCart } from '$lib/server/cart';

const ProductSchema = z.object({
    id: z.string().refine((val) => { 
        const num: number = Number(val);
        return Number.isInteger(num) && num > 0;
    }),
    //step: z.string(),
})

export const actions: Actions = {
    add: async ({ request, locals, fetch }) => {
        const formData = Object.fromEntries(await request.formData());
        const result = ProductSchema.safeParse(formData);

        if (!result.success) return fail(422, { message: 'Invalid formData', data: result.data });
        
        try {
            const res = await fetch(`/api/themes?id=${ result.data.id }`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${ SECRET_API_KEY }`
                }
            });

            if (!res.ok) return fail(res.status, { message: 'Failed to load data from server', data: result.data });

            const product = await res.json();
            return addToCart(locals.cartId, product);

        } catch (err) {
            console.error('Load function error:', err);
            return fail(503, { message: 'Service unavailable or network error', data: result.data });
        }

    },
    remove: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const result = ProductSchema.safeParse(formData);

        if (!result.success) return fail(422, { message: 'Invalid formData', data: result.data });

        const { id } = result.data;
        removeFromCart(locals.cartId, id);
    },
    decrement: async ({ request, locals }) => {
        const formData = Object.fromEntries(await request.formData());
        const result = ProductSchema.safeParse(formData);

        if (!result.success) return fail(422, { message: 'Invalid formData', data: result.data });

        const { id } = result.data;
        decrementFromCart(locals.cartId, id);
    },
    clear: async ({ locals }) => {
        const cart = clearCart(locals.cartId);
        return cart; 
    }
}
