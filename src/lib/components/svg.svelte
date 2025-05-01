<script lang="ts">
import library from "$lib/assets/icons/svg-library";

type Props = {
    name: string,
    width: number,
    height: number,
    viewBox?: string,
    fill?: string,
}

let {
    name,
    width,
    height,
    viewBox = `0 0 ${ width } ${ height }`,
    fill = '#fff',
}: Props = $props();

const svg = library[name];
</script>

{#if svg}
    <svg 
        xmlns="http://www.w3.org/2000/svg"
        { width }
        { height }
        { viewBox }
        { fill }
    >
        <path d={ svg.path }></path>
    </svg>
{/if}
