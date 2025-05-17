import type { Color } from "$lib/types"

export type Route = {
    path: string,
    label: string,
    color: Color,
    location: {
        header: boolean,
        footer: boolean,
        menu: boolean,
    },
}
export type Social = {
    path: string,
    label: string,
}
