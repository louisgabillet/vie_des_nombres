<script lang="ts">
import { getContext } from 'svelte';
import type Cart from '$lib/cart/class.svelte.js';

let { data } = $props();
let cart: Cart = getContext('cart');
</script>

<h1 data-headline>{ data.title }</h1>
<p data-text>{ data.description }</p>
<button onclick={() => cart.add({ id: data.id, quantity: 1, product: data })}>ajouter au panier</button>
