<script lang="ts">
import { getContext } from 'svelte';
import { goto } from '$app/navigation';
import { handleFormSubmit } from '$lib/form/submit';
import type Cart from '$lib/cart/class.svelte';
import type { FormSubmitAction } from '$lib/form/types';
import type { Product } from '$lib/types';

const cart: Cart = getContext('cart');

const actions: Record<string, FormSubmitAction<Product>> = $state({
    remove: {
        callback: (product: Product) => cart.remove(product.id),
        pending: false,
    },
    clear: {
        callback: () => cart.clear(),
        pending: false,
    },
})

const isCartEmpty: boolean = $derived(cart.products.length === 0);
</script>

<h1>PANIER</h1>
<form 
    method="POST"
    action="?/clear"
    onsubmit={(e) => handleFormSubmit(e, actions.clear)}
>
    <button 
        type="submit"
        class:desactivated={ actions.clear.pending || isCartEmpty }
    >
        Vider le panier
    </button>
</form>
<button 
    class:desactivated={ isCartEmpty }
    onclick={() => goto('/checkout', { replaceState: true })}
>
    commander
</button>
{#each cart.products as { id, product, quantity } (id)}
    <p>{ product.title } ({ quantity })</p>
    <form 
        method="POST"
        action="?/remove"
        onsubmit={(e) => handleFormSubmit(e, { ...actions.remove, callback: () => actions.remove.callback(product) })}
    >
        <button 
            type="submit"
            class="global-nav__cart-button"
            aria-label="Remove product from cart"
            class:desactivated={ actions.remove.pending }
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
            >
                <path d="M12.78 4.28a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72z"/>
            </svg>
        </button>
        <input type="hidden" name="id" value={ product.id }>
    </form>
{/each}

<style>
.desactivated {
    opacity: .4;
    pointer-events: none;
}
</style>
