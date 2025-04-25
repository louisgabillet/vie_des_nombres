<script lang="ts">
import type Cart from '$lib/cart/class.svelte.js';
import { getContext } from 'svelte';

let cart: Cart = getContext('cart');
</script>

<h1>CART</h1>
<button onclick={() => cart.clear(cart.id)}>vider</button>
{#each cart.products as cartProduct (cartProduct.id)}
    <p>{ cartProduct.product.title } ({ cartProduct.quantity })</p>
    <button onclick={() => cart.add(cartProduct)}>+1</button>
    <button onclick={() => cart.decrement(cartProduct)}>{ cartProduct.quantity > 1 ? '-1' : 'retirer' }</button>
    <button onclick={() => cart.remove(cartProduct)}>retirer</button>
{/each}
