<script lang="ts">
import "../style.css";
import { setContext, type Snippet } from "svelte";
import Cart from "$lib/cart/class.svelte";
import Definition from "$lib/components/definition.svelte";
import type { Cart as CartType } from "$lib/cart/types";
import { page } from "$app/state";
import ThreeScene from "$lib/components/three-scene.svelte";
import Nav from "$lib/components/nav.svelte";
import Scrollbar from "$lib/components/scrollbar.svelte";
import GlobalNav from "$lib/components/global-nav.svelte";
import Sky from "$lib/components/sky.svelte";

type Props = {
    children: Snippet<[]>,
    data: { 
        cart: CartType; 
        //themes: any; 
    },
}

let { children, data }: Props = $props();

const cart = new Cart(data.cart.id, data.cart.products);
const isDefinitionOpen = $derived(page.url.searchParams.get('def'));

setContext('cart', cart);

</script>

<!--<GlobalNav themes={ data.themes } />-->

<Nav />
<main class="main">
    {@render children()}
</main>
<div class="global-footer">
    <p>footer</p>
</div>

{#if isDefinitionOpen}
    <Definition id={ isDefinitionOpen } />
{/if}
<!--<Sky />-->
<Scrollbar />
<ThreeScene 
    mainColor={ 0x596789 }
    bgColor={ 0x000000 }
    width="100vw"
    height="100vh"
/>

<style>
.main {
    min-height: 100vh;
    padding: calc(var(--global-nav-height) * 2) 22px;
    inset: 0;
}
.global-footer {
    width: 100%;
    height: 250px;
    outline: 1px solid #7c7c7c33;
}
</style>


