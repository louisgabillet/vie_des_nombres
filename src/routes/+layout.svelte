<script lang="ts">
import "../style.css";
import Sky from "$lib/components/sky.svelte";
import { onDestroy, onMount } from "svelte";
import { browser } from "$app/environment";
	import { afterNavigate } from "$app/navigation";

let { children } = $props();

const globalLinks = [
    {
        id: '1',
        name: 'menu',
        href: '/'
    },
    {
        id: '2',
        name: 'thèmes',
        href: '/themes'
    },
    {
        id: '3',
        name: 'contact',
        href: '/contact'
    },
    {
        id: '4',
        name: 'tarifs',
        href: '/pricing'
    },
    {
        id: '5',
        name: 'panier',
        href: '/cart'
    },
];

let scrollbar: HTMLDivElement | null = null; 

let isScrollbarVisible: boolean = $state(false);
let hideScrollbarTimeout: ReturnType<typeof setTimeout> | null = null;

let pageHeight: number = 0;
let clientHeight: number = 0;
let scrollbarTrackHeight: number = 0;

let scrollbarThumbHeight: number = $state(0);
let scrollbarThumbTop: number = $state(0);


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

<nav class="global-nav">
    <div class="global-nav__content" data-glass>
        <ul class="global-nav__list">
            {#each globalLinks as { id, name, href } (id)}
                <li>
                    <a { href } class="global-nav__link" data-link>{ name }</a>
                </li>    
            {/each}
        </ul>
    </div>
</nav>
<Sky />
<main class="main">
    {@render children()}
</main>
<div class="global-scrollbar" class:global-scrollbar--hide={ !isScrollbarVisible }>
    <div 
        class="global-scrollbar__thumb"
        style:--height={ scrollbarThumbHeight ? `${ scrollbarThumbHeight }px` : "100%" }
        style:--top="{ scrollbarThumbTop }px"
    ></div>
</div>
<div style="height: 200Vh;"></div>

<style>
.global-nav__content {
    width: 100%;
    max-width: var(--global-max-width);
    margin: 0 auto;
    padding: 0 22px;
    border-top: none;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}
.global-nav__list {
    width: auto;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    list-style: none;
}


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
}
</style>


