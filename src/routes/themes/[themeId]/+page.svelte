<script lang="ts">
import { getContext } from 'svelte';
import { handleFormSubmit } from '$lib/form/submit';
import type Cart from '$lib/cart/class.svelte';
import type { CartProduct } from '$lib/cart/types';
import type { FormSubmitAction } from '$lib/form/types';

let { data } = $props();

const cart: Cart = getContext('cart');

const product = $derived(data.product);
const alreadyInCart: boolean = $derived(cart.products.some(p => p.product.id === product.id));

const actions: Record<string, FormSubmitAction<CartProduct>> = $state({
    add: {
        callback: (data: CartProduct) => { if (data) cart.add(data) },
        pending: false,
    },
})
</script>

<h1 data-headline>{ product.title }</h1>
<p data-text>{ product.description }</p>

<form 
    method="POST"
    action="/cart?/add"
    onsubmit={(e) => handleFormSubmit(e, actions.add)}
>
    <button 
        type="submit"
        class:desactivated={ actions.add.pending || alreadyInCart }
    >
        { alreadyInCart ? 'déja dans le panier' : 'ajouter au panier' }
    </button>
    <input type="hidden" name="id" value={ product.id }>
</form>

<style>
.desactivated {
    opacity: .4;
    pointer-events: none;
}
</style>
