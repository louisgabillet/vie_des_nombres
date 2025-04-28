<script lang="ts">
import { goto } from '$app/navigation';
import type Cart from '$lib/cart/class.svelte.js';
import { getContext } from 'svelte';

let cart: Cart = getContext('cart');

const isCartEmpty: boolean = $derived(cart.products.length === 0);
</script>

<h1>PANIER</h1>
<button
    class:desactivated={ isCartEmpty }
    onclick={() => cart.clear()}
>
    vider
</button>
<button 
    class:desactivated={ isCartEmpty }
    onclick={() => goto('/checkout', { replaceState: true })}
>
    commander
</button>
{#each cart.products as cartProduct (cartProduct.id)}
    <p>{ cartProduct.product.title } ({ cartProduct.quantity })</p>
    <button onclick={() => cart.remove(cartProduct)}>retirer</button>
{/each}

<style>
.desactivated {
    opacity: .4;
    pointer-events: none;
}
</style>
