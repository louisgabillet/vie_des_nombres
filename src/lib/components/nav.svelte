<script lang="ts">
import { getContext, onMount } from "svelte";
import { afterNavigate } from "$app/navigation";
import { ROUTES, SOCIALS } from "$lib/links";
import type Cart from "$lib/cart/class.svelte";
import Scrollbar from "./scrollbar.svelte";
import { LARGE_SCREEN } from "$lib";

type Props = {
    mainColor: string;
    isNavigating: boolean;
    isAnimating: boolean;
}

let { mainColor, isNavigating, isAnimating }: Props = $props();

const cart: Cart = getContext('cart');
const cartQuantity = $derived(cart.stats.quantity);

const getLinksByLocation = (location: string) => Object.entries(ROUTES).filter(([ _, route ]) => (route.location as Record<string, boolean>)[location]);
const getRangeOfLinks = (index: number) => links.menu.slice(index * nbrInMenuGroup, (index + 1) * nbrInMenuGroup);

const links = {
    header: getLinksByLocation('header'),
    menu: getLinksByLocation('menu'),
}

const nbrInMenuGroup: number = 18;
const nbrMenuGroup: number = Math.ceil(links.menu.length / nbrInMenuGroup);

let app: HTMLElement | null = null;

let isNavHidden: boolean = $state(false);
let isMenuOpen: boolean = $state(false);
let noTransition: boolean = $state(false);
let isPageLoaded: boolean = $state(false);

const isMenuTriggerHidden: boolean = $derived(!isNavHidden && LARGE_SCREEN.current);
const ariaPressed = $derived(isMenuOpen ? { 'aria-pressed': true } : {});

afterNavigate(() => closeOnNavigation());

onMount(() => {
    const nav: HTMLElement | null = document.querySelector('.app__header-nav');
    app = document.querySelector('.app');

    const observer = new IntersectionObserver((entries) => {
        if (isNavigating) return;
        entries.forEach(entry => isNavHidden = !entry.isIntersecting);
    }, 
        {
            root: app,
            rootMargin: '150px 0px 0px 0px',
        }
    )

    if (nav) observer.observe(nav);
    isPageLoaded = true;

    return () => {
        if (nav) observer.unobserve(nav);
    }
})

export const toogleMenu = () => {
    isMenuOpen = !isMenuOpen;
}
const closeOnNavigation = () => {
    if (!isMenuOpen || !app) return;

    noTransition = true;
    isMenuOpen = false;
}
</script>

<header class="app__header">
    <div class="app__header-action app__header-logo">
        <a 
            href={ ROUTES.HOME.path }
            class="app__header-logo-link"
            aria-label={ ROUTES.HOME.label }
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                class="app__header-logo-link-svg"
                width="35"
                height="44"
                viewBox="0 0 1500 1500"
                fill="currentColor"
            >
                <!--<g fill={ mainColor }>-->
                <g>
                    <path d="M1335.12,362.28c-7.87-3.69-15.99-6.89-24.36-9.47-18.45-5.66-38.01-8.61-57.82-8.61-2.21,0-4.55,0-6.77.13-53.52,1.84-114.54,25.34-174.08,69.26l-.13.13c-34.82,25.71-69.14,58.31-101,97.81,123.89-17.71,243.47-18.08,352.35-3.57,13.29,1.85,26.58,3.82,39.49,6.03,39.12,6.64,76.65,15.26,112.2,25.71-27.93-83.66-75.78-147.76-139.88-177.41Z"/>
                    <path d="M658.34,1110.16c-16.61-110.6-9.97-234.24,23.99-359.48-135.45,58.44-237.57,135.95-297.23,214.81-18.95,24.97-33.71,50.07-43.68,74.8-15.01,36.42-20.05,71.97-14.15,104.82,22.64,126.35,208.16,224.89,445.85,243.96-48.72-60.16-84.03-136.81-104.2-223.54-4.18-17.96-7.75-36.54-10.58-55.36Z"/>
                </g>
                <!--<g fill="currentColor">-->
                <g>
                    <path d="M1163.99,199.88c-55.61-54.99-132.01-88.95-216.28-88.95-169.9,0-307.57,137.67-307.57,307.57,0-169.9-137.79-307.57-307.57-307.57S25,248.6,25,418.5c0,183.06,63.97,351.12,170.64,483.13,8.61,10.58,17.35,20.92,26.45,31,14.89-26.45,32.85-52.41,53.64-77.63,102.48-124.62,272.63-231.9,480.79-295.76,98.3-189.71,250.49-322.21,407.47-359.37Z"/>
                    <path d="M1163.37,652.5c-70.62,0-143.2,6.64-215.55,19.56-27.81,4.92-54.99,10.83-81.32,17.35-9.47,22.89-18.33,46.88-26.08,71.97-35.55,114.91-44.66,234.49-26.58,338.69.74,4.43,1.48,8.74,2.46,13.04,173.59-82.43,311.38-228.22,383.48-407.59,6.77-16.86,13.04-34.08,18.7-51.55-18.08-.98-36.54-1.47-55.12-1.47Z"/>
                </g>
            </svg>
        </a> 
    </div>
    <div
        class="app__header-action app__header-menu-trigger"
        class:app__header-menu-trigger--hidden={ isMenuTriggerHidden || !isPageLoaded }
        class:app__header-menu-trigger--transition-none={ noTransition }
    >
        <button 
            class="app__header-hamburger"
            class:app__header-hamburger--hidden={ isMenuTriggerHidden || !isPageLoaded }
            class:app__header-hamburger--transition-none={ noTransition }
            style:--three-scene-main-color="{ mainColor }33"
            aria-label="Ouvrir le menu"
            {...ariaPressed}
            onclick={ toogleMenu }
        ></button>
    </div>
    <div
        class="app__header-menu"
        class:app__header-menu--transition-none={ noTransition }
        class:app__header-menu--closed={ !isMenuOpen }
        style:--three-scene-main-color="{ mainColor }33"
        ontransitionend={() => noTransition = false}
    >
        <div class="app__header-menu-content">
            {#each Array(nbrMenuGroup) as _, i (i)}
                <ul class="app__header-menu-list">
                    {#each getRangeOfLinks(i) as [ key, route ], i (key)}
                        <li class="app__header-menu-item">
                            <a 
                                href={ route.path }
                                class="app__header-nav-link app__header-menu-link"
                                style:--stagger={ i }
                            >
                                <span class="app__header-nav-link-text">{ route.label }{ route.path === '/cart' ? ` x${ cartQuantity }` : '' }</span>
                            </a>
                        </li>
                    {/each}
                </ul>
            {/each}
            <ul class="app__header-menu-list">
                {#each Object.entries(SOCIALS) as [ key, social ], i (key)}
                    <li class="app__header-menu-item">
                        <a 
                            href={ social.path }
                            class="app__header-nav-link app__header-menu-link app__header-menu-social"
                            style:--stagger={ i }
                        >
                            <span class="app__header-nav-link-text">{ social.label }</span>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <Scrollbar parentClass='.app__header-menu-content'/>
    </div> 
    <!--<nav 
        class="app__header-nav"
        class:app__header-nav--hidden={ isNavHidden || (!isNavigating && isAnimating) ||!LARGE_SCREEN.current }
        class:app__header-nav--transition-none={ isAnimating }
    >-->
    <nav 
        class="app__header-nav"
        class:app__header-nav--hidden={ isNavHidden || isNavigating ||!LARGE_SCREEN.current }
    >
        <ul class="app__header-nav-list">
            {#each links.header as [ key, route ], i (key)}
                <li class="app__header-nav-item">
                    <a 
                        href={ route.path }
                        class="app__header-nav-link"
                        style:--stagger={ i }
                    >
                        <span class="app__header-nav-link-text">{ route.label }</span>
                    </a>
                </li>
            {/each}
            <li class="app__header-nav-item">
                <a 
                    href={ ROUTES.CART.path }
                    class="app__header-nav-link"
                    style:--stagger={ links.header.length }
                    aria-label={ ROUTES.CART.label }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        class="app__header-nav-link-svg"
                        width="14" 
                        height="44" 
                        viewBox="0 0 14 40" 
                        fill="currentColor"
                    >
                        <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                    </svg>
                    {#if cartQuantity > 0}
                        <span class="app__cart-badge">{ cartQuantity }</span>
                    {/if}
                </a>
            </li>
        </ul>
    </nav>
</header>

<style>
.app__header {
    --header-padding-block: calc(var(--global-nav-height) / 2);
    --header-padding-inline: var(--global-nav-height);
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: calc(var(--global-nav-height) / 2) var(--global-nav-height);
    z-index: 996;
}
.app__header-nav {
    width: 100%;
    height: var(--global-nav-height);
}
.app__header-nav--hidden {
    visibility: hidden;
}
.app__header-nav-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: calc(var(--global-nav-height) / 2);
    list-style: none;
}
.app__header-nav-item {
    height: var(--global-nav-height);
}
.app__header-nav-link {
    height: 100%;
    font-size: var(--font-size-text-s);
    font-weight: 400;
    color: var(--global-text-color);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    text-decoration: none;
    z-index: 1;
}
.app__header-nav--hidden .app__header-nav-link {
    transform: translate(-20px, -15px);
    opacity: 0;
}
.app__header-nav-link-text {
    position: relative;
    padding-block: 5px;
    max-width: 100%;
    overflow-x: clip;
    text-overflow: ellipsis;
}
.app__header-nav-link-text::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    border-radius: 2px;
    background-color: currentColor;
    top: 100%;
    left: 0;
    pointer-events: none;
    transform-origin: 100% 50%;
    transform: scale3d(0, 1, 1);
}
.app__header-logo-link-svg,
.app__header-nav-link-svg {
    pointer-events: none;
}
.app__header-nav-link-svg {
    margin-top: -3px;
}
.app__header-action {
    height: var(--global-nav-height);
    aspect-ratio: 1 / 1;
    position: fixed;
    top: var(--scroll-top);
    display: flex;
    align-items: center;
    margin: var(--header-padding-block) var(--header-padding-inline);
    z-index: 998;
}
.app__header-logo {
    left: 0;
}
.app__header-logo-link {
    height: 100%;
    color: #fff;
    margin: 0 auto;
}
.app__cart-badge {
    min-width: 1.3em;
    height: 1.3em;
    background-color: var(--global-text-color);
    font-size: var(--font-size-text-xs);
    color: var(--global-bg-color);
    display: grid;
    place-content: center;
    position: absolute;
    bottom: 10px;
    z-index: 1;
    border-radius: 1.3em;
    padding-inline: 3px;
    transform: translateX(25%);
}
.app__header-menu-trigger {
    right: 0;
}
.app__header-menu-trigger--hidden {
    opacity: 0;
    visibility: hidden;
}
.app__header-hamburger {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    cursor: pointer;
    background-color: var(--three-scene-main-color);
    border-radius: 50%;
    padding: 10px;
}
.app__header-hamburger--hidden {
    transform: translate(20px, 15px) scale(0);
    opacity: 0;
}
.app__header-hamburger::before,
.app__header-hamburger::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    background-color: #fff;
    border-radius: 2px;
    transform-origin: center;
    margin-block: 5px;
}
.app__header-hamburger[aria-pressed="true"]::before {
    transform: translateY(3px) rotate(45deg);
}
.app__header-hamburger[aria-pressed="true"]::after {
    transform: translateY(-3px) rotate(-45deg);
}
.app__header-menu {
    height: 100%;
    background-color: var(--three-scene-main-color);
    backdrop-filter: blur(18px);
    position: fixed;
    inset: 0;
    top: var(--scroll-top);
    z-index: 997;
}
.app__header-menu--closed {
    visibility: hidden;
    opacity: 0;
}
.app__header-menu-content {
    height: 100%;
    margin-right: calc(var(--scrollbar-width) * -1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    row-gap: var(--global-nav-height);
    padding: calc(var(--global-nav-height) * 2) var(--header-padding-inline);
    overflow: hidden scroll;
}
.app__header-menu-list {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-rows: repeat(6, min-content);
    grid-template-columns: repeat(3, min-content);
    grid-auto-flow: column;
    column-gap: 12px;
}
.app__header-menu-link {
    font-size: var(--font-size-text-2xl);
    justify-content: flex-start;
}
.app__header-menu-social {
    font-size: var(--font-size-text-m);
}
.app__header-menu--closed .app__header-menu-link {
    transform: translate(-100px, -50px);
    opacity: 0;
}

@media screen and (hover: hover) {
    .app__header-nav-link:hover > .app__header-nav-link-text::before {
        transform-origin: 0% 50%;
        transform: scale3d(1, 1, 1);
    }
}
@media screen and (prefers-reduced-motion: no-preference) {
    .app__header-nav,
    .app__header-menu {
        transition: 
            opacity 0.8s cubic-bezier(0.76, 0, 0.24, 1),
            visibility 0.8s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .app__header-menu-trigger {
        transition: 
            opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1),
            visibility 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    }
    /*.app__header-nav--transition-none,*/
    .app__header-menu-trigger--transition-none,
    .app__header-hamburger--transition-none,
    .app__header-menu--transition-none {
        transition: none;
    }
    .app__header-nav-link,
    .app__header-nav-link-text::before,
    .app__header-hamburger {
        transition: 
            transform 0.4s cubic-bezier(0.76, 0, 0.24, 1),
            opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .app__header-hamburger:not(.app__header-hamburger--transition-none)::before,
    .app__header-hamburger:not(.app__header-hamburger--transition-none)::after {
        transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .app__header-nav-link {
        transition-delay: calc(0.025s * var(--stagger));
    }
    .app__header-menu-link {
        transition: all 0.8s cubic-bezier(0.76, 0, 0.24, 1);
        transition-delay: calc(0.025s * var(--stagger));
    }
}
@media screen and (max-width: 833px) {
    .app__header {
        --header-padding-inline: 22px;
    }
    .app__header-menu-list {
        display: flex;
        flex-direction: column;
    }
}
</style>
