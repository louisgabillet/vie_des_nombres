<script lang="ts">
import Carousel from "$lib/components/carousel.svelte";
</script>

<section class="main__section hero-section">
    <div class="hero-section__content">
        <h1 class="hero-section__title hero-section__title--left">En apprendre</h1> 
        <h1 class="hero-section__title hero-section__title--right">plus sur</h1> 
        <h1 class="hero-section__title">vous</h1> 
    </div>
</section>
<section class="main__section infos-section">
</section>
<section class="main__section process-section">
    <p>processus de la commande</p>
</section>
<section class="main__section question-section">
    <p>FAQ questions les plus posées</p>
</section>

<style>
.main__section {
    width: 100%;
}
.hero-section {
    height: 100vh;
    padding-top: calc(var(--global-nav-height) * 2);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.hero-section__content {
    width: min-content;

}
.hero-section__title {
    font-size: 70px;
    font-weight: 400;
    white-space: nowrap;
    text-align: center;
}
.hero-section__title--left {
    margin-left: -100px;
    text-align: start;
}
.hero-section__title--right {
    margin-right: -100px;
    text-align: end;
}

.infos-section,
.process-section,
.question-section {
    height: 90vh;
}
</style>

