<script lang="ts">
import "../style.css";
import { browser } from "$app/environment";
import { onDestroy, onMount, setContext, type Snippet } from "svelte";
import { afterNavigate } from "$app/navigation";
import Cart from "$lib/cart/class.svelte";
import GlobalNav from "$lib/components/global-nav.svelte";
import Definition from "$lib/components/definition.svelte";
import Sky from "$lib/components/sky.svelte";
import type { Cart as CartType } from "$lib/cart/types";
	import { page } from "$app/state";

type Props = {
    children: Snippet<[]>,
    data: { 
        cart: CartType; 
        themes: any; 
    },
}

let { children, data }: Props = $props();

const cart = new Cart(data.cart.id, data.cart.products);
const isDefinitionOpen = $derived(page.url.searchParams.get('def'));

let scrollbar: HTMLDivElement | null = null; 

let isScrollbarVisible: boolean = $state(false);
let hideScrollbarTimeout: ReturnType<typeof setTimeout> | null = null;

let pageHeight: number = 0;
let clientHeight: number = 0;
let scrollbarTrackHeight: number = 0;

let scrollbarThumbHeight: number = $state(0);
let scrollbarThumbTop: number = $state(0);


setContext('cart', cart);

onMount(() => {
    scrollbar = document.querySelector('.global-scrollbar');

    if (!browser) return;

    updateHeights();
    scrollbarThumbHeight = +(clientHeight  / pageHeight * scrollbarTrackHeight).toFixed(4);

    window.addEventListener('resize', resizeEvent)
    window.addEventListener('scroll', scrollEvent)
})
onDestroy(() => {
    if (!browser) return;

    window.removeEventListener('resize', resizeEvent)
    window.removeEventListener('scroll', scrollEvent)
})
afterNavigate(() => updateHeights())

const resizeEvent = () => {
    updateHeights();
    moveThumb();
}
const scrollEvent = () => {
    if (hideScrollbarTimeout) clearTimeout(hideScrollbarTimeout);

    isScrollbarVisible = true;
    moveThumb();

    hideScrollbarTimeout = setTimeout(() => isScrollbarVisible = false, 400);
}

const updateHeights = () => {
    pageHeight = document.documentElement.scrollHeight;
    clientHeight = window.innerHeight;

    scrollbarTrackHeight = scrollbar ? scrollbar.offsetHeight : 0;

    const thumbHeight = clientHeight  / pageHeight * scrollbarTrackHeight;
    scrollbarThumbHeight = +thumbHeight.toFixed(4);
}
const moveThumb = () => {
    const scrollableHeight: number = pageHeight - clientHeight;
    const maxThumbTop: number = scrollbarTrackHeight - scrollbarThumbHeight;

    const top: number = window.scrollY / scrollableHeight * maxThumbTop;
    scrollbarThumbTop = +top.toFixed(5);
}

</script>

<GlobalNav themes={ data.themes } />
<main class="main">
    {@render children()}
    <div style="height: 200Vh;"></div>
</main>
<div class="global-scrollbar" class:global-scrollbar--hide={ !isScrollbarVisible }>
    <div 
        class="global-scrollbar__thumb"
        style:--height={ scrollbarThumbHeight ? `${ scrollbarThumbHeight }px` : "100%" }
        style:--top="{ scrollbarThumbTop }px"
    ></div>
</div>
{#if isDefinitionOpen}
    <Definition id={ isDefinitionOpen } />
{/if}
<Sky />

<style>
.global-scrollbar {
    width: 6px;
    height: 20vh;
    background-color: #ffffff1a;
    border-radius: 3px;
    position: fixed;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    transition: opacity 400ms ease;
    z-index: 999;
}
.global-scrollbar--hide {
    opacity: 0;
}
.global-scrollbar__thumb {
    width: 100%;
    height: var(--height);
    border-radius: inherit;
    background-color: #fff;
    position: absolute;
    top: var(--top);
    left: 0;
}

.main {
    max-width: var(--global-max-width);
    margin: 0 auto;
    padding: var(--global-nav-height) 22px;
    inset: 0;
}
</style>


