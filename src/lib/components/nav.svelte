<script lang="ts">
import { getContext, onMount } from "svelte";
import type Cart from "$lib/cart/class.svelte";
import { afterNavigate } from "$app/navigation";

const cart: Cart = getContext('cart');
const cartQuantity = $derived(cart.stats.quantity);

let app: HTMLElement | null = null;

let isNavHidden: boolean = $state(false);
let isMenuOpen: boolean = $state(false);

onMount(() => {
    const nav: HTMLElement | null = document.querySelector('.app__nav');
    app = document.querySelector('.app');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isNavHidden = !entry.isIntersecting;
        })
    }, {
            root: app,
            rootMargin: '200px 0px 0px 0px',
        }
    )

    if (nav) observer.observe(nav);

    return () => {
        if (nav) observer.unobserve(nav);
    }
})
afterNavigate(() => {
    isMenuOpen = false
    if (app) app.scrollTo({ top: 0 });
});

const toogleMenu = () => {
    isMenuOpen = !isMenuOpen;
}
</script>

<div
    class="app__nav-menu-trigger"
    class:app__nav-menu-trigger--hidden={ !isNavHidden }
>
    <button 
        class="app__nav-hamburger"
        class:app__nav-hamburger--hidden={ !isNavHidden }
        aria-label="Ouvrir le menu"
        onclick={ toogleMenu }
    >
        <div class="app__nav-hamburger-line"></div>
        <div class="app__nav-hamburger-line"></div>
        <div class="app__nav-hamburger-line"></div>
    </button>
</div>
<div
    class="app__nav-menu"
    class:app__nav-menu--closed={ !isMenuOpen }
>
    <ul class="app__nav-menu-list">
        <li class="app__nav-menu-item">
            <a 
                href="/"
                class="app__nav-link app__nav-menu-link"
            >
                <span class="app__nav-link-text">Accueil</span>
            </a>
        </li>
        <li class="app__nav-menu-item">
            <a 
                href="/themes"
                class="app__nav-link app__nav-menu-link"
            >
                <span class="app__nav-link-text">Thèmes</span>
            </a>
        </li>
        <li class="app__nav-menu-item">
            <a 
                href="/about"
                class="app__nav-link app__nav-menu-link"
            >
                <span class="app__nav-link-text">En Savoir Plus</span>
            </a>
        </li>
        <li class="app__nav-menu-item">
            <a 
                href="/contact"
                class="app__nav-link app__nav-menu-link"
            >
                <span class="app__nav-link-text">Contactez-moi</span>
            </a>
        </li>
    </ul>
</div> 
<nav 
    class="app__nav"
    class:app__nav--hidden={ isNavHidden }
>
    <ul class="app__nav-list">
        <li class="app__nav-item app__nav-logo">
            <a 
                href="/"
                class="app__nav-link"
                aria-label="Vie Des Nombres - Logo"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    class="app__nav-link-svg"
                    width="30"
                    height="44"
                    viewBox="0 0 1500 1500"
                    fill="currentColor"
                >
                    <g>
                        <path class="cls-1" d="M1335.12,362.28c-7.87-3.69-15.99-6.89-24.36-9.47-18.45-5.66-38.01-8.61-57.82-8.61-2.21,0-4.55,0-6.77.13-53.52,1.84-114.54,25.34-174.08,69.26l-.13.13c-34.82,25.71-69.14,58.31-101,97.81,123.89-17.71,243.47-18.08,352.35-3.57,13.29,1.85,26.58,3.82,39.49,6.03,39.12,6.64,76.65,15.26,112.2,25.71-27.93-83.66-75.78-147.76-139.88-177.41Z"/>
                        <path class="cls-1" d="M658.34,1110.16c-16.61-110.6-9.97-234.24,23.99-359.48-135.45,58.44-237.57,135.95-297.23,214.81-18.95,24.97-33.71,50.07-43.68,74.8-15.01,36.42-20.05,71.97-14.15,104.82,22.64,126.35,208.16,224.89,445.85,243.96-48.72-60.16-84.03-136.81-104.2-223.54-4.18-17.96-7.75-36.54-10.58-55.36Z"/>
                    </g>
                    <g>
                        <path class="cls-1" d="M1163.99,199.88c-55.61-54.99-132.01-88.95-216.28-88.95-169.9,0-307.57,137.67-307.57,307.57,0-169.9-137.79-307.57-307.57-307.57S25,248.6,25,418.5c0,183.06,63.97,351.12,170.64,483.13,8.61,10.58,17.35,20.92,26.45,31,14.89-26.45,32.85-52.41,53.64-77.63,102.48-124.62,272.63-231.9,480.79-295.76,98.3-189.71,250.49-322.21,407.47-359.37Z"/>
                        <path class="cls-1" d="M1163.37,652.5c-70.62,0-143.2,6.64-215.55,19.56-27.81,4.92-54.99,10.83-81.32,17.35-9.47,22.89-18.33,46.88-26.08,71.97-35.55,114.91-44.66,234.49-26.58,338.69.74,4.43,1.48,8.74,2.46,13.04,173.59-82.43,311.38-228.22,383.48-407.59,6.77-16.86,13.04-34.08,18.7-51.55-18.08-.98-36.54-1.47-55.12-1.47Z"/>
                    </g>
                </svg>
            </a> 
        </li>
        <li class="app__nav-item">
            <a 
                href="/themes"
                class="app__nav-link"
            >
                <span class="app__nav-link-text">Thèmes</span>
            </a>
        </li>
        <li class="app__nav-item">
            <a 
                href="/about"
                class="app__nav-link"
            >
                <span class="app__nav-link-text">En Savoir Plus</span>
            </a>
        </li>
        <li class="app__nav-item">
            <a 
                href="/contact"
                class="app__nav-link"
            >
                <span class="app__nav-link-text">Contactez-moi</span>
            </a>
        </li>
        <li class="app__nav-item">
            <a 
                href="/cart"
                class="app__nav-link"
                aria-label="Panier"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    class="app__nav-link-svg"
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

<style>
.app__nav {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 997;
}
.app__nav--hidden {
    opacity: 0;
    visibility: hidden;
}
.app__nav-list {
    --gap: calc(var(--global-nav-height) / 2);
    width: 100%;
    display: flex;
    align-items: center;
    gap: var(--gap);
    list-style: none;
    padding: var(--gap) var(--global-nav-height);
}
.app__nav-item {
    height: var(--global-nav-height);
}
.app__nav-link {
    height: 100%;
    font-size: var(--font-size-text-xs);
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
.app__nav-link-text {
    position: relative;
    padding-block: 5px;
}
.app__nav-link-text::before {
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
.app__nav-link-svg {
    pointer-events: none;
}
.app__nav-logo {
    margin-right: auto;
}
.app__cart-badge {
    min-width: 1.3em;
    height: 1.3em;
    background-color: var(--global-text-color);
    font-size: var(--font-size-text-xxs);
    color: var(--global-bg-color);
    display: grid;
    place-content: center;
    position: absolute;
    bottom: 10px;
    z-index: 1;
    border-radius: 1.3em;
    padding-inline: 4px;
    transform: translateX(25%);
}
.app__nav-menu-trigger {
    position: fixed;
    top: 0;
    right: 0;
    padding: calc(var(--global-nav-height) / 2) var(--global-nav-height);
    background-color: transparent;
    z-index: 998;
}
.app__nav-menu-trigger--hidden {
    opacity: 0;
    visibility: hidden;
}
.app__nav-hamburger {
    width: 14px;
    height: var(--global-nav-height);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    background-color: transparent;
    outline: none;
    border: none;
    cursor: pointer;
}
.app__nav-hamburger--hidden {
    transform: scale(0);
}
.app__nav-hamburger::before {
    content: '';
    position: absolute;
    height: var(--global-nav-height);
    aspect-ratio: 1 / 1;
    background-color: #59678933;
    border-radius: 50%;
    z-index: -1;
}
.app__nav-hamburger-line {
    width: 100%;
    height: 1px;
    background-color: #fff;
    border-radius: 2px;
}
.app__nav-menu {
    position: fixed;
    inset: 0;
    z-index: 997;
    background-color: black;
    display: grid;
    place-content: center;
}
.app__nav-menu--closed {
    transform: translateY(-100%);
    visibility: hidden;
}
.app__nav-menu-list {
    list-style: none;
}
.app__nav-menu-link {
    font-size: 40px;
    justify-content: flex-end;
}

@media screen and (hover: hover) {
    .app__nav-link:hover > .app__nav-link-text::before {
        transform-origin: 0% 50%;
        transform: scale3d(1, 1, 1);
    }
}
@media screen and (prefers-reduced-motion: no-preference) {
    .app__nav,
    .app__nav-menu-trigger,
    .app__nav-menu {
        transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .app__nav-link-text::before,
    .app__nav-hamburger {
        transition: transform 0.3s cubic-bezier(0.76, 0, 0.24, 1);
    }
}
</style>
