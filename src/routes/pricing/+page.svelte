<script lang="ts">
let { data } = $props();
</script>

<h1>TARIFS</h1>
{#if data}
    {#each data.themes as theme (theme.id)}
       <p>{ theme.title }: { theme.price }</p> 
    {/each}
{/if}
