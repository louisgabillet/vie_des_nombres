<script lang="ts">
import { browser } from "$app/environment";
import { afterNavigate } from "$app/navigation";
import { onDestroy, onMount } from "svelte";

type Props = {
    parentClass: string,
}

let { parentClass }: Props = $props();

let app: HTMLDivElement | null = null; 
let scrollbar: HTMLDivElement | null = null; 

let isScrollbarVisible: boolean = $state(false);
let hideScrollbarTimeout: ReturnType<typeof setTimeout> | null = null;

let pageHeight: number = 0;
let clientHeight: number = 0;
let scrollbarTrackHeight: number = $state(0);

let scrollbarThumbHeight: number = $state(0);
let scrollbarThumbTop: number = $state(0);

let pointerStartY: number = 0;
let isPointerDown: boolean = $state(false);

onMount(() => {
    app = document.querySelector(parentClass);
    scrollbar = document.querySelector('.app__scrollbar');

    if (!browser) return;

    updateHeights();
    scrollbarThumbHeight = +(clientHeight  / pageHeight * scrollbarTrackHeight).toFixed(4);

    window.addEventListener('resize', resize)
    if (app) app.addEventListener('scroll', scroll)
})
onDestroy(() => {
    if (!browser) return;

    window.removeEventListener('resize', resize)
    if (app) app.removeEventListener('scroll', scroll)
})
afterNavigate(() => updateHeights())

const resize = () => {
    updateHeights();
    moveThumb();
}
const scroll = () => {
    if (hideScrollbarTimeout) clearTimeout(hideScrollbarTimeout);

    isScrollbarVisible = true;
    moveThumb();

    hideScrollbarTimeout = setTimeout(() => isScrollbarVisible = false, 400);
}

export const updateHeights = () => {
    pageHeight = app ? app.scrollHeight : 0;
    clientHeight = window.innerHeight;

    scrollbarTrackHeight = scrollbar ? scrollbar.offsetHeight : 0;

    const thumbHeight = clientHeight  / pageHeight * scrollbarTrackHeight;
    scrollbarThumbHeight = +thumbHeight.toFixed(4);
}
const moveThumb = () => {
    const scrollTop: number = app ? app.scrollTop : 0;
    const scrollableHeight: number = pageHeight - clientHeight;
    const maxThumbTop: number = scrollbarTrackHeight - scrollbarThumbHeight;

    const top: number = scrollTop / scrollableHeight * maxThumbTop;
    scrollbarThumbTop = +top.toFixed(5);
}
const pointerdown = (e: PointerEvent) => {
    pointerStartY = e.clientY - scrollbarThumbTop;
    isPointerDown = true;

    e.preventDefault();

    window.addEventListener('pointermove', pointermove);
    window.addEventListener('pointerup', pointerup);
}
const pointermove = (e: PointerEvent) => {
    const distance: number = e.clientY - pointerStartY;
    const maxThumbTop: number = scrollbarTrackHeight - scrollbarThumbHeight;
    const scrollableHeight: number = pageHeight - clientHeight;

    const scrollTop = scrollbarThumbTop / maxThumbTop * scrollableHeight;

    scrollbarThumbTop = Math.min(maxThumbTop, Math.max(+distance.toFixed(5), 0));
    if (app) app.scrollTo({ top: scrollTop });
}
const pointerup = () => {
    isPointerDown = false;

    window.removeEventListener('pointermove', pointermove);
    window.removeEventListener('pointerup', pointerup);
}
</script>

<div 
    class="app__scrollbar"
    class:app__scrollbar--hidden={ !isScrollbarVisible && !isPointerDown }
    class:app__scrollbar--desactivated={ scrollbarThumbHeight >= scrollbarTrackHeight }
>
    <div 
        class="app__scrollbar-thumb"
        onpointerdown={ pointerdown }
        style:--height={ scrollbarThumbHeight ? `${ scrollbarThumbHeight }px` : "100%" }
        style:--top="{ scrollbarThumbTop }px"
    ></div>
    <div class="app__scrollbar-track"></div>
</div>

<style>
.app__scrollbar {
    --scrollbar-width: 6px;
    --padding: 10px;
    width: calc(var(--scrollbar-width) + var(--padding) * 2);
    height: 20vh;
    border-radius: 3px;
    position: fixed;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    z-index: 996;
    padding: 0 var(--padding);
}
.app__scrollbar--hidden {
    opacity: 0;
}
.app__scrollbar--desactivated {
    visibility: hidden;
}
.app__scrollbar-track {
    width: 100%;
    height: 100%;
    background-color: #ffffff1a;
    border-radius: inherit;
}
.app__scrollbar-thumb {
    width: var(--scrollbar-width);
    height: var(--height);
    border-radius: inherit;
    background-color: #fff;
    position: absolute;
    top: var(--top);
    z-index: 1;
}

@media screen and (hover: hover) {
    .app__scrollbar--hidden:hover {
       opacity: 1; 
    }
}
@media screen and (prefers-reduced-motion: no-preference) {
    .app__scrollbar {
        transition: opacity 0.4s ease;
    }
}
</style>
