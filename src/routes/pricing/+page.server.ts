import type { PageServerLoad } from './$types';
import { SECRET_API_KEY } from '$env/static/private';

export const load: PageServerLoad = async ({ fetch }) => {
    try {
        const res = await fetch('/api/themes', {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${ SECRET_API_KEY }`
            }
        });
        if (!res.ok) throw new Error(`Failed to fetch themes`);

        const data = await res.json();
        return data;

    } catch (err) {
        console.error('Load function error:', err);
    }
};
