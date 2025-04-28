import type { CartProduct, CartStats, Cart as CartType } from "./types";
import { AsyncQueue } from "$lib/utils/async-queue";

type SendResponse = {
    success: boolean,
    cart?: CartType,
    error?: unknown,
}

class Cart {
    private _apiBase: string = '/api/cart';
    private _queue: AsyncQueue<SendResponse> = new AsyncQueue<SendResponse>;
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

    clear = () => {
        this._queue.enqueue(() => this._send('DELETE', 'clear', null))
    };
    add = (product: CartProduct) => {
        this._queue.enqueue(() => this._send('POST', 'add', product));
    };
    remove = (product: CartProduct) => {
        this._queue.enqueue(() => this._send('DELETE', 'remove', product));
    };
    decrement = (product: CartProduct) => {
        this._queue.enqueue(() => this._send('PATCH', 'decrement', product));
    };

    private _send = async (method: string, endpoint: string, body: CartProduct | null): Promise<SendResponse> => {
		try {
			const res = await fetch(`${this._apiBase}/${endpoint}`, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			});

			if (!res.ok) throw new Error('API error');

			const data: CartType = await res.json();
            this.products = data.products;

			return { success: true, cart: data };

		} catch (err) {
			console.error('Cart error:', err);
			return { success: false, error: err };
		}
	}
}

export default Cart;
