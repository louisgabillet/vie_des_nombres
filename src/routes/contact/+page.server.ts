import type { Actions } from "./$types";

export const actions: Actions = {
    contact: async ({ request }) => {
        const formData = await request.formData();

        console.log('contact --------------', formData);
    }
}
