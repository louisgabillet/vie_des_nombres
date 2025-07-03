<script lang="ts">
import "../style.css";
import "../fonts.css";
import { onMount, setContext, type Snippet } from "svelte";
import { page } from "$app/state";
import { onNavigate } from "$app/navigation";
import { prefersReducedMotion } from "svelte/motion";
import Cart from "$lib/cart/class.svelte";
import Definition from "$lib/components/definition.svelte";
import type { Cart as CartType } from "$lib/cart/types";
import ThreeScene from "$lib/components/three-scene.svelte";
import Header from "$lib/components/header.svelte";
import Scrollbar from "$lib/components/scrollbar.svelte";
import { ROUTES } from "$lib/links"
import GlobalNav from "$lib/components/global-nav.svelte";
import Sky from "$lib/components/sky.svelte";
	import Footer from "$lib/components/footer.svelte";

type Props = {
    children: Snippet<[]>,
    data: { 
        cart: CartType; 
    },
}

let { children, data }: Props = $props();

const cart = new Cart(data.cart.id, data.cart.products);
const isDefinitionOpen = $derived(page.url.searchParams.get('def'));

let app: HTMLDivElement | null = $state(null);

let scrollTop: number = $state(0);
let isAnimating: boolean = $state(false);
let isNavigating: boolean = $state(false);

//const mainColors = ['#2779a9', '#596789', '#897b59', '#a3bae1', '#7280A3', '#635989', '#597F89', '#895967', '#678959', '#89597F']

const getBaseRoute = (path: string): string => {
    const segments: string[] = path.split('/').filter(Boolean);
    return segments.length > 0 ? `/${ segments[0] }` : '/';
}
const getRouteColor = (routeId: string | null): string => {
    if (!routeId) return '#2779a9';

    const baseRoute = getBaseRoute(routeId);
    const routeData = Object.values(ROUTES).find(route => route.path === baseRoute);

    return routeData ? routeData.color : '#2779a9';
}

let mainColor: string = $derived(getRouteColor(page.route.id));
let bgColor: string = $state('#000000');

setContext('cart', cart);
onMount(() => app = document.querySelector('.app'))

onNavigate(() => {
    if (prefersReducedMotion.current) return;
    if (app) scrollTop = app.scrollTop;

    isAnimating = true;
    isNavigating = true;

    return new Promise((res) => setTimeout(() => navigate(res), 800))
});
const navigate = (res: (value: void | (() => void) | PromiseLike<void | (() => void)>) => void) => {
    scrollTop = 0;
    isNavigating = false;

    res();
}
const afterAnimation = () => {
    isAnimating = false
}
</script>


{#if isAnimating}
    <div 
        class="app__transition"
        onanimationend={ afterAnimation }
    >
        <div class="app__transition-scene">
            <ThreeScene 
                { mainColor }
                { bgColor }
            />
        </div>
    </div>
{/if}
<div 
    class="app__page"
    class:app__page--navigating={ isNavigating }
    style:--scroll-top={ `${ scrollTop }px` }
>
    <Header
        { mainColor }
        { isNavigating }
        { isAnimating }
    />
    <main class="app__main">
        {@render children()}
    </main>
    <Footer />
    {#if isDefinitionOpen}
        <Definition id={ isDefinitionOpen } />
    {/if}
    <ThreeScene 
        { mainColor }
        { bgColor }
    />
</div>
<!--<Sky />-->
<Scrollbar parentClass='.app'/>

<style>
.app__page {
    height: 100%;
}
.app__page--navigating {
    position: fixed;
    inset: 0;
    top: calc(var(--scroll-top) * -1);
}
.app__transition {
    position: fixed;
    inset: 0;
    z-index: 999;
}
.app__transition-scene {
    height: 100%;
    background-color: #000;
    transform: translateY(100%);
    display: grid;
    place-content: center;
}
.app__main {
    min-height: 100vh;
    inset: 0;
}

@keyframes page-transition-enter {
64% {
    transform: translateY(0);
    opacity: 1;
}
100% {
    transform: translateY(0);
    opacity: 0;
}
}
@keyframes page-exit {
to {
    transform: translateY(-100px) scale(.9);
    opacity: .5;
}
}

@media screen and (prefers-reduced-motion: no-preference) {
    .app__page--navigating {
        animation: page-exit .8s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .app__transition-scene {
        animation: page-transition-enter 1.25s cubic-bezier(0.76, 0, 0.24, 1);
    }
}
</style>


