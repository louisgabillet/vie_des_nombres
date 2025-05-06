import type { RequestHandler } from './$types';

const definitions = [
    {
        id: "1",
        name: "Numérologie",
        description: "Votre cap, votre direction, ce vers quoi vous devez tendre.",
    },
    {
        id: "2",
        name: "Pythagore",
        description: "Pour en apprendre plus sur vous.",
    },
]

export const GET: RequestHandler = ({ url }) => {
    const id: string | null = url.searchParams.get('id') ?? null;

    if (id) {
        const ids: string[] = id.split(',');
        const includes = (t) => ids.includes(t.id);

        const filtered = ids.length > 1 ? definitions.filter(includes) : definitions.find(includes);

        return new Response(JSON.stringify(filtered), { status: 200 });
    }

    const skip: number = Number(url.searchParams.get('skip') ?? 0);
    const limit: number = Number(url.searchParams.get('limit') ?? 0);

    const endIndex: number = limit ? limit : definitions.length;
    const limited = skip || limit ? definitions.slice(skip, skip + endIndex) : definitions;

    return new Response(JSON.stringify({
        definitions: limited,
        total: limited.length,
        limit,
        skip,
    }), { status: 200 });
};
