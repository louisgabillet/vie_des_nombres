<script lang="ts">
import "../style.css";

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
]
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

<main class="main">
    {@render children()}
</main>

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

.main {
    max-width: var(--global-max-width);
    margin: 0 auto;
}
</style>


