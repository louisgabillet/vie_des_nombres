<script lang="ts">
	import Carousel from "$lib/components/carousel.svelte";

const themes = [
    {
        id: '1',
        name: 'Venus',
    },
    {
        id: '2',
        name: 'Grande Ourse',
    },
    {
        id: '3',
        name: `3 Belles d'été`,
    },
]
</script>

<!--<section class="main__section carousel">
    <Carousel cards={ themes } />
</section>-->
<a href="?def=1" data-link="text">Numérologie</a>
<a href="?def=2" data-link="text">Pythagore</a>

<style>
.main__section {
    width: 100%;
}

.carousel {
    position: relative;
    overflow: hidden;
    outline: 1px solid white;
}
</style>

