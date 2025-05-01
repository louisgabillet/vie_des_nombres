<script lang="ts">
import { getContext, onMount } from 'svelte';
import { afterNavigate } from '$app/navigation';
import type Cart from '$lib/cart/class.svelte';
import { handleFormSubmit } from '$lib/form/submit';
import type { FormSubmitAction } from '$lib/form/types';
import type { Product } from '$lib/types';

type Link = {
    id: string,
    name: string,
    href: string,
    submenu: SubMenuLinks[],
}
type SubMenuLinks = {
    name: string,
    href: string,
    text: string,
}

let { themes } = $props();

const cart: Cart = getContext('cart');
const links: Link[] = [
    {
        id: "0",
        name: "Thèmes",
        href: "/themes",
        submenu: [
            ...themes.map(t => ({
                name: t.title,
                href: `/themes/${ t.id }`,
                text: t.description,
            })),
            { 
                name: "Voir tous les thèmes",
                href: "/themes",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit."
            },
        ],
    },
    {
        id: "1",
        name: "En Savoir Plus",
        href: "/about",
        submenu: [
            { 
                name: "Mon Histoire",
                href: "/about",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", 
            },
            { 
                name: "Ma Vision",
                href: "/about",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", 
            },
        ],
    },
    {
        id: "2",
        name: "Définitions",
        href: "/definitions",
        submenu: [
            { 
                name: "Numérologie",
                href: "/definitions",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", 
            },
            { 
                name: "Pythagore",
                href: "/definitions",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", 
            },
            { 
                name: "Voir toutes les définitions",
                href: "/definitions",
                text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.", 
            },
        ],
    },
];
const actions: Record<string, FormSubmitAction<Product>> = $state({
    remove: {
        callback: (product: Product) => cart.remove(product.id),
        pending: false,
    },
})

const cartLimit: number = 3;
const cartItems = $derived(cart.products.slice(0, cartLimit));
const cartLength = $derived(cart.products.length);
const cartQuantity = $derived(cart.stats.quantity);

let subMenuTriggers: NodeListOf<HTMLElement>;
let nbrSubMenuTriggers: number = $state(0);

let isSubMenuOpen: boolean = $state(false);
let tabIndex: number = $state(-1);

const isTabIndex: boolean = $derived(tabIndex >= 0);

onMount(() => {
    const nav: HTMLElement | null = document.querySelector('.global-nav');

    subMenuTriggers = document.querySelectorAll('.global-nav__submenu-trigger');
    nbrSubMenuTriggers = subMenuTriggers.length;

    //window.addEventListener('scroll', () => { if (isSubMenuOpen) closeSubmenu() });
    subMenuTriggers.forEach((item) => item.addEventListener('mouseover', openSubmenu));
    if (nav) nav.addEventListener('mouseleave', closeSubmenu);

    return () => {
        subMenuTriggers.forEach((item) => item.removeEventListener('mouseover', openSubmenu));
        if (nav) nav.removeEventListener('mouseleave', closeSubmenu);
    }
});
afterNavigate(() => closeSubmenu())

const openSubmenu = (e: MouseEvent) => {
    const target: HTMLElement | null = e.currentTarget as HTMLElement;
    const index = Array.from(subMenuTriggers).indexOf(target);

    if (index >= 0 && tabIndex !== index) tabIndex = index;
    isSubMenuOpen = true;
};
const closeSubmenu = () => {
    isSubMenuOpen = false;
    tabIndex = -1;
};
</script>

<nav class="global-nav">
    <div class="global-nav__content">
        <ul class="global-nav__list">
            <li class="global-nav__item">
                <a 
                    href="/"
                    class="global-nav__link"
                    aria-label="Vie Des Nombres - Logo"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
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
            {#each links as { id, name, href }, i (id)}
                <li class="global-nav__item global-nav__submenu-trigger">
                    <a 
                        { href }
                        class="global-nav__link"
                        class:global-nav__submenu-trigger--open={ tabIndex === i }
                    >
                        { name }
                    </a>
                </li>
            {/each}
            <li class="global-nav__item">
                <a 
                    href="/contact"
                    class="global-nav__link"
                >
                    Contactez-Moi
                </a>
            </li>
            <li class="global-nav__item global-nav__submenu-trigger">
                <a 
                    href="/cart"
                    class="global-nav__link"
                    class:global-nav__submenu-trigger--open={ tabIndex === nbrSubMenuTriggers - 1 }
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        class="global-nav__link-svg"
                        width="14" 
                        height="44" 
                        viewBox="0 0 14 44" 
                        fill="currentColor"
                    >
                        <path d="m11.3535 16.0283h-1.0205a3.4229 3.4229 0 0 0 -3.333-2.9648 3.4229 3.4229 0 0 0 -3.333 2.9648h-1.02a2.1184 2.1184 0 0 0 -2.117 2.1162v7.7155a2.1186 2.1186 0 0 0 2.1162 2.1167h8.707a2.1186 2.1186 0 0 0 2.1168-2.1167v-7.7155a2.1184 2.1184 0 0 0 -2.1165-2.1162zm-4.3535-1.8652a2.3169 2.3169 0 0 1 2.2222 1.8652h-4.4444a2.3169 2.3169 0 0 1 2.2222-1.8652zm5.37 11.6969a1.0182 1.0182 0 0 1 -1.0166 1.0171h-8.7069a1.0182 1.0182 0 0 1 -1.0165-1.0171v-7.7155a1.0178 1.0178 0 0 1 1.0166-1.0166h8.707a1.0178 1.0178 0 0 1 1.0164 1.0166z"></path>
                    </svg>
                    {#if cartQuantity > 0}
                        <span class="global-nav__cart-badge">{ cartQuantity }</span>
                    {/if}
                </a>
            </li>
        </ul>
        <div 
            class="global-nav__submenu"
            class:global-nav__submenu--open={isSubMenuOpen}
        >
            <div class="global-nav__flyout-container">
                <div class="global-nav__flyout-content">
                    {#each links as { id, submenu }, i (id)}
                        {#if submenu.length > 0}
                            <div
                                class="global-nav__flyout-group"
                                class:global-nav__flyout-group--open={ tabIndex === i }
                                class:global-nav__flyout-group--prev={ isTabIndex && tabIndex > i }
                                class:global-nav__flyout-group--next={ isTabIndex && tabIndex < i }
                            >
                                {#each submenu as { name, href, text } (name)}
                                    <a 
                                        { href }
                                        class="global-nav__submenu-link"
                                    >
                                        <span class="global-nav__submenu-link-text global-nav__submenu-link-text--overflow">{ name }</span>
                                        <span class="global-nav__submenu-link-subtext global-nav__submenu-link-subtext--overflow">{ text }</span>
                                    </a>
                                {/each}
                            </div>
                        {/if}
                    {/each}
                    <div
                        class="global-nav__flyout-group"
                        class:global-nav__flyout-group--open={ tabIndex === nbrSubMenuTriggers - 1 }
                        class:global-nav__flyout-group--prev={ isTabIndex && tabIndex > nbrSubMenuTriggers - 1 }
                        class:global-nav__flyout-group--next={ isTabIndex && tabIndex < nbrSubMenuTriggers - 1 }
                    >
                        {#if cart.products.length > 0}
                            {#each cartItems as { id, product, quantity } (id)}
                                <div class="global-nav__cart-item">
                                    <a 
                                        href="/themes/{ product.id }"  
                                        class="global-nav__submenu-link"
                                    >
                                        <span class="global-nav__submenu-link-text global-nav__submenu-link-text--overflow">{ product.title } { quantity > 1 ? `x${ quantity }` : '' }</span>
                                        <span class="global-nav__submenu-link-subtext global-nav__submenu-link-subtext--overflow">{ product.description }</span>
                                    </a>
                                    <form 
                                        method="POST"
                                        action="/cart?/remove"
                                        onsubmit={(e) => handleFormSubmit(e, { ...actions.remove, callback: () => actions.remove.callback(product) })}
                                    >
                                        <button 
                                            type="submit"
                                            class="global-nav__cart-button"
                                            aria-label="Remove product from cart"
                                            class:global-nav__cart-button--desactivated={ actions.remove.pending }
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
                                </div>
                            {/each}
                            {#if cartLength > cartLimit}
                                <div class="global-nav__cart-item">
                                    <a 
                                        href="/cart"  
                                        class="global-nav__submenu-link"
                                    >
                                        <span class="global-nav__submenu-link-text global-nav__submenu-link-text--overflow">{ cartLength - cartLimit } { cartLength - cartLimit > 1 ? 'autres articles' : 'autre article' } dans votre panier</span>
                                    </a>
                                </div>
                            {/if}
                        {:else}
                            <a 
                                href="/themes"  
                                class="global-nav__submenu-link global-nav__cart-empty"
                            >
                                <span class="global-nav__submenu-link-text global-nav__submenu-link-text--overflow">Votre panier est vide</span>
                                <span class="global-nav__submenu-link-subtext global-nav__submenu-link-subtext--overflow">N'hésitez pas à voir les thèmes disponibles.</span>
                            </a>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
</nav>

<style>
.global-nav {
    --global-nav-height: 44px;
    position: relative;
    background-color: var(--global-bg-color);
    z-index: 999;
    border-bottom: 1px solid #7c7c7c33;
}
.global-nav__content {
    width: 100%;
    max-width: var(--global-max-width);
    margin: 0 auto;
    padding: 0 22px;
}
.global-nav__list {
    width: auto;
    height: var(--global-nav-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
    user-select: none;
    list-style: none;
}
.global-nav__item {
    height: var(--global-nav-height);
}
.global-nav__submenu-trigger--open {
    opacity: .9;
}
.global-nav__link {
    position: relative;
    height: var(--global-nav-height);
    font-size: var(--font-size-text-xs);
    font-weight: 400;
    color: var(--global-text-color);
    display: flex;
    align-items: center;
    justify-content: center;
    padding-inline: 8px;
    white-space: nowrap;
    text-decoration: none;
    z-index: 1;
}
.global-nav__link-svg {
    pointer-events: none;
}
.global-nav__submenu {
    --global-nav-flyout-height: 200px;
    width: 100%;
    height: var(--global-nav-height);
    background-color: var(--global-bg-color);
    overflow: hidden;
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
}
.global-nav__submenu--open {
    height: calc(var(--global-nav-height) + var(--global-nav-flyout-height));
    visibility: visible;
}
.global-nav__submenu-link {
    width: fit-content;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;
    overflow: hidden;
}
.global-nav__submenu-link-text {
    color: var(--global-text-color);
    font-size: var(--font-size-text);
}
.global-nav__submenu-link-subtext {
    color: var(--global-text-color-secondary);
    font-size: var(--font-size-text-xs);
}
.global-nav__submenu-link-text--overflow,
.global-nav__submenu-link-subtext--overflow {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.global-nav__flyout-container {
    margin-top: var(--global-nav-height);
    max-height: calc(100% - var(--global-nav-height));
    overflow-y: hidden;
    border-bottom: 1px solid #7c7c7c33;
}
.global-nav__flyout-content {
    width: 100%;
    height: var(--global-nav-flyout-height);
    margin: 0 auto;
    max-width: var(--global-max-width);
    padding: var(--global-nav-height) calc(var(--global-nav-height) / 2);
    display: grid;
}
.global-nav__flyout-group {
    grid-area: 1 / 1;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
    /*grid-template-columns: repeat(3, 1fr);*/
    grid-auto-flow: column;
    grid-template-rows: repeat(2, 1fr);
    gap: calc(var(--global-nav-height) / 2);
    visibility: hidden;
    opacity: 0;
    /*transform: translateY(-10px);*/
}
.global-nav__flyout-group--open {
    visibility: visible;
    opacity: 1;
    transform: translateX(0);
}
.global-nav__flyout-group--prev {
    transform: translateX(-15px);
}
.global-nav__flyout-group--next {
    transform: translateX(15px);
}
.global-nav__cart-badge {
    min-width: 1.3em;
    height: 1.3em;
    background-color: var(--global-text-color);
    font-size: var(--font-size-text-xxs);
    color: var(--global-bg-color);
    display: grid;
    place-content: center;
    position: absolute;
    bottom: 10px;
    right: 3px;
    z-index: 1;
    border-radius: 1.3em;
    padding-inline: 4px;
    pointer-events: none;
}
.global-nav__cart-empty {
    position: absolute;
    inset: 0;
    margin: auto;
    align-items: center;
}
.global-nav__cart-item {
    position: relative;
    display: grid;
    grid-template-columns: 1fr min-content;
    gap: calc(var(--global-nav-height) / 4);
}
.global-nav__cart-button {
    font-size: var(--font-size-text-l);
    background-color: transparent;
    outline: none;
    border: none;
    color: var(--global-text-color);
    cursor: pointer;
    padding-inline: 10px;
}
.global-nav__cart-button--desactivated {
    opacity: .4;
    pointer-events: none;
}

@media screen and (hover: hover) {
    .global-nav__link:hover,
    .global-nav__submenu-link:hover {
        opacity: .9;
    }
    .global-nav__cart-button:hover {
        color: var(--global-error-color);
    }
}
@media screen and (prefers-reduced-motion: no-preference) {
    .global-nav__submenu {
        transition:
            height 300ms ease,
            visibility 300ms ease;
    }
    .global-nav__flyout-group {
        transition:
            transform 200ms ease,
            opacity 200ms ease,
            visibility 200ms ease;
    }
    .global-nav__flyout-group--open {
        transition-delay: 100ms;
    }
    .global-nav__link,
    .global-nav__submenu-link {
        transition: opacity 200ms ease;
    }
    .global-nav__cart-button {
        transition: color 200ms ease;
    }
}
</style>
