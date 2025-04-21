<script lang="ts">
const products = [
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

<section class="main__section">
    <h1 data-headline>VIE DES NOMBRES</h1>
</section>
<section class="main__section">
    <p data-text>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident voluptates cum nulla autem, quidem odit quibusdam doloribus labore, quis officiis quisquam maxime atque nostrum velit sit eveniet ipsam? Doloremque quo cupiditate neque alias necessitatibus officia vel asperiores illum dignissimos, consequatur ullam itaque cumque aliquid accusantium corrupti pariatur explicabo fugiat quam facilis nisi temporibus earum. Aut quibusdam ipsam dolor laudantium labore omnis maxime amet ipsa eveniet error praesentium a culpa cumque, eum maiores facilis <a href="/definition/delectus" data-link>delectus</a> accusamus molestiae! Nostrum temporibus, cum illo ipsa quos minus ad animi! Ipsam architecto nisi non cum voluptatem fuga ipsum odio harum! Quam eligendi veniam non molestias.</p>
</section>
<section class="main__section">
    {#each products as { id, name } (id)}
       <a href="/themes/{ id }" data-link>{ name }</a> 
    {/each}
</section>

<style>
.main__section {
    width: 100%;
}
</style>

