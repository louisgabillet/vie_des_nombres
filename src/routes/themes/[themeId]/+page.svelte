<script lang="ts">
import { page } from "$app/state";

let { data } = $props();
</script>

<h1 data-headline>{ data.title }</h1>
<p data-text>{ data.description }</p>
<a href="/themes/{ page.params.themeId }/order" data-link>acheter</a>
