<script lang="ts">
import { goto } from "$app/navigation";
import { page } from "$app/state";
import { onMount } from "svelte";

type Props = {
    id: string,
}

let { id }: Props = $props();

let data: Record<string, unknown> | null = $state(null);

let backdrop: HTMLDivElement | null = null;
let openModalElement: HTMLElement | null = null;
let openScrollTop: number = 0;

let firstFocusableElement: HTMLElement | null = null;
let lastFocusableElement: HTMLElement | null = null;

let open: boolean = $state(false);

onMount(() => {
    const main: HTMLElement | null = document.querySelector('.main');
    const focusTrap: HTMLElement | null = document.querySelector('.definition-modal__focus-trap');

    if (focusTrap) {
        const focusable = `button, [href], input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])`;
        const focusableElements: NodeListOf<HTMLElement> = focusTrap.querySelectorAll(focusable);

        firstFocusableElement = focusableElements[0];
        lastFocusableElement = focusableElements[focusableElements.length - 1];

        openModalElement = document.activeElement as HTMLElement;
        openScrollTop = window.scrollY || document.documentElement.scrollTop;
        firstFocusableElement.focus();
    }

    if (main) {
        main.style.position = 'fixed';
        main.style.top = `-${ openScrollTop }px`;
    }
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', keydown);

    setTimeout(() => open = true);
    fetchDefinition();

    return () => {
        if (main) {
            main.style.removeProperty('position');
            main.style.removeProperty('top');

            //window.scrollTo({ top: openScrollTop, behavior: 'instant' });
        }
        if (backdrop) backdrop.removeEventListener('click', close);
        document.removeEventListener('keydown', keydown);

        if (openModalElement) openModalElement.focus();
    }
})

const fetchDefinition = async () => {
    try {
        const res = await fetch(`/api/definitions?id=${ id }`, {
            method: 'GET',
            headers: { 'content-type': 'application/json' }
        });

        if (!res.ok) throw new Error(`(${res.status}) Failed to fetch definition. ${res.statusText}`);
        data = await res.json();

    } catch (err) {
        console.error('Load function error:', err);
    }
}
const trapFocus = (e: KeyboardEvent) => {
    const focused: Element | null = document.activeElement;

    if (!firstFocusableElement || !lastFocusableElement || !focused) return;

    const isOnFirst: boolean = focused === firstFocusableElement;
    const isOnLast: boolean = focused === lastFocusableElement;

    if (e.shiftKey && isOnFirst) {
        e.preventDefault();
        lastFocusableElement.focus();
        return;
    } 

    if (!e.shiftKey && isOnLast) {
        e.preventDefault();
        firstFocusableElement.focus();
    }
}
const keydown = (e: KeyboardEvent) => {
    const isTabPressed: boolean = e.code === 'Tab' || e.key === 'Tab';
    const isEscPressed: boolean = e.code === 'Escape' || e.key === 'Escape';

    if (isTabPressed) trapFocus(e);
    if (isEscPressed) close();
}
const close = () => {
    open = false;
    setTimeout(() => {
        goto(page.url.pathname)
    }, 300);
}
</script>

<div class="definition-modal">
    <div 
        role="dialog"
        aria-modal="true"
        class="definition-modal__content definition-modal__focus-trap"
        class:definition-modal__content--hidden={ !open }
    >
        <button onclick={ close }>close</button>
        <button onclick={ close }>close 2</button>
        {#if data}
            <h3>{ data.name }</h3> 
            <p>{ data.description }</p> 
        {/if}
    </div>
    <div 
        bind:this={ backdrop }
        class="definition-modal__backdrop"
        class:definition-modal__backdrop--hidden={ !open }
        tabindex="-1"
    ></div>
</div>

<style>
.definition-modal {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    z-index: 998;
    padding: 50px;
}
.definition-modal__content {
    width: 50%;
    height: 150vh;
    min-height: 100%;
    background: var(--global-bg-color);
    margin: 0 auto;
    border-radius: 1rem 1rem 0 0;
    padding: 22px;
    outline: 1px solid var(--global-border-color);
}
.definition-modal__content--hidden {
    opacity: 0;
    /*transform: translateY(65%);*/
}
.definition-modal__backdrop {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #00000080;
    z-index: -1;
    backdrop-filter: blur(8px);
    transition: all 300ms ease;
}
.definition-modal__backdrop--hidden {
    backdrop-filter: blur(0);
    opacity: 0;
}

@media screen and (prefers-reduced-motion: no-preference) {
    .definition-modal__content {
        transition: opacity 0.3s cubic-bezier(0.76, 0, 0.24, 1);
    }
    .definition-modal__backdrop {
        transition: all 0.3s cubic-bezier(0.76, 0, 0.24, 1);
    }
}
</style>
