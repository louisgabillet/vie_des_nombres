<script lang="ts">
let { data } = $props();
</script>

<h1>TOUS LES THEMES</h1>
{#if data}
    {#each data.themes as theme (theme.id)}
       <a href="/themes/{ theme.id }" data-link>{ theme.title }</a> 
    {/each}
{/if}
