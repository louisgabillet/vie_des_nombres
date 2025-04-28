import type { Product } from "$lib/types"

export type Cart = {
    id: string,
    products: CartProduct[],
}

export type CartProduct = {
    id: string,
    product: Product,
    quantity: number,
}

export type CartStats = {
    quantity: number,
    price: number,
}

export type CartValidation = {
    valid: boolean,
    issues: string[],
}
