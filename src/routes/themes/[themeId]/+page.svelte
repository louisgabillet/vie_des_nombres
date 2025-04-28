<script lang="ts">
import { getContext } from 'svelte';
import type Cart from '$lib/cart/class.svelte.js';

let { data } = $props();
let cart: Cart = getContext('cart');

const alreadyInCart: boolean = $derived(cart.products.some(p => p.id === data.id));
</script>

<h1 data-headline>{ data.title }</h1>
<p data-text>{ data.description }</p>
<button 
    class:desactivated={ alreadyInCart }
    onclick={() => cart.add({ id: data.id, quantity: 1, product: data })}
>
    { alreadyInCart ? 'déja dans le panier' : 'ajouter au panier' }
</button>

<style>
.desactivated {
    opacity: .4;
    pointer-events: none;
}
</style>
