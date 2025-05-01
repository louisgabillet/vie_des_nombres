import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { SECRET_API_KEY } from '$env/static/private';

const themes = [
    {
        id: "1",
        title: "Venus",
        description: "Votre cap, votre direction, ce vers quoi vous devez tendre.",
        price: 75,
    },
    {
        id: "2",
        title: "Grande Ourse",
        description: "Pour en apprendre plus sur vous.",
        price: 75,
    },
    {
        id: "3",
        title: "3 Belles d'été",
        description: "Pour connaître qui vous êtes vraiment, au fond.",
        price: 150,
    },
]

export const GET: RequestHandler = ({ request, url }) => {
    const bearerToken: string | null = request.headers.get('Authorization');

    if (!bearerToken) error(401, 'No Bearer Token Provided');

    const key = bearerToken.split(' ')[1];
    const isAuthorized: boolean = SECRET_API_KEY === key;

    if (!isAuthorized) return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })

    const themeId: string | null = url.searchParams.get('id') ?? null;

    if (themeId) {
        const ids: string[] = themeId.split(',');
        const includes = (t) => ids.includes(t.id);

        const filtered = ids.length > 1 ? themes.filter(includes) : themes.find(includes);

        return new Response(JSON.stringify(filtered), { status: 200 });
    }

    const skip: number = Number(url.searchParams.get('skip') ?? 0);
    const limit: number = Number(url.searchParams.get('limit') ?? 0);

    const endIndex: number = limit ? limit : themes.length;
    const limitedThemes = skip || limit ? themes.slice(skip, skip + endIndex) : themes;

    return new Response(JSON.stringify({
        themes: limitedThemes,
        total: limitedThemes.length,
        limit,
        skip,
    }), { status: 200 });
};
