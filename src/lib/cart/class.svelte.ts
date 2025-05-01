import type { CartProduct, CartStats } from "./types";

class Cart {
    id: string = '';
    products: CartProduct[] = $state([]);

    constructor(id: string, products: CartProduct[]) {
        this.id = id;
        this.products = products;
    }

    stats: CartStats = $derived.by(() => {
        let quantity: number = 0;
        let price: number = 0;

        for (const cartProduct of this.products) {
            quantity += cartProduct.quantity;
            price += cartProduct.product.price * cartProduct.quantity;
        }

        return {
            quantity,
            price,
        };
    });

    add = (product: CartProduct) => {
        const existing: CartProduct | undefined = this.products.find(p => p.id === product.id);

        if (existing) {
            //existing.quantity += 1
            return;
        }

        this.products.push(product);
    }

    remove = (productId: CartProduct['id']) => {
        const index: number = this.products.findIndex(p => p.product.id === productId);

        if (index === -1) return;

        this.products.splice(index, 1);
    }

    clear = () => this.products = [];

    decrement = (productId: CartProduct['id']) => {
        const existing: CartProduct | undefined = this.products.find(p => p.id === productId);

        if (existing && existing.quantity > 1) {
            existing.quantity -= 1;
            return;
        }

        this.remove(productId);
    }
}

export default Cart;
