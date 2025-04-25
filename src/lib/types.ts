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

export type Product = {
    id: string,
    title: string,
    price: number,
}
