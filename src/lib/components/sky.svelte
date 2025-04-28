<script lang="ts">
import { onMount } from "svelte";

interface Star {
    x: number;
    y: number;
    size: number;
    color: string;
    alpha: number;
    alphaChange: number;
}

const visibleStarColors = [
    //{ color: "255, 255, 255", weight: 150 },
    { color: "248, 247, 255", weight: 35 },
    { color: "202, 215, 255", weight: 25 },
    { color: "170, 191, 255", weight: 15 },
    { color: "255, 244, 234", weight: 10 },
    { color: "255, 210, 161", weight: 8 },
    { color: "255, 204, 111", weight: 5 },
    { color: "155, 176, 255", weight: 1 } 
];

let sky: HTMLCanvasElement | null = null;
let skyCtx: CanvasRenderingContext2D| null = null;

let stars: Star[] = [];

onMount(() => {
    sky = document.querySelector('.global-sky__stars');
    if (sky) skyCtx = sky.getContext('2d');

    resizeSky();
    animateStars();

    window.addEventListener('resize', resizeSky)
})

const getRandomStarColor = () => {
    const totalWeight = visibleStarColors.reduce((sum, item) => sum + item.weight, 0);
    let rand = Math.random() * totalWeight;

    for (let i = 0; i < visibleStarColors.length; i++) {
        rand -= visibleStarColors[i].weight;
        if (rand < 0) return visibleStarColors[i].color;
    }

    return visibleStarColors[0].color;
}
const generateStars = (numStars: number) => {
    if (!sky || !skyCtx) return;

    stars = [];

    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * sky.width,
            y: Math.random() * sky.height,
            size: Math.random(), 
            color: getRandomStarColor(),
            alpha: Math.random(),
            alphaChange: Math.random() * 0.01 + 0.001,
        });
    }
}
const animateStars = () => {
    if (!sky || !skyCtx) return;

    skyCtx.clearRect(0, 0, sky.width, sky.height);

    for (const star of stars) {
        star.alpha += star.alphaChange;

        if (star.alpha >= 1 || star.alpha <= 0) {
            star.alphaChange *= -1;
            star.alpha = Math.max(0, Math.min(1, star.alpha));
        }

        skyCtx.beginPath();
        skyCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        skyCtx.fillStyle = `rgba(${star.color}, ${star.alpha})`;
        //skyCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        skyCtx.fill();
    }

    requestAnimationFrame(animateStars);
}

const ajustStarDensity = () => {
    if (!sky || !skyCtx) return;

    const screenDensityFactor = sky.width * sky.height / 1000000;
    const numStars = Math.floor(screenDensityFactor * 100);

    generateStars(numStars);
}
const resizeSky = () => {
    if (!sky || !skyCtx) return;

    sky.width = window.innerWidth;
    sky.height = window.innerHeight;

    ajustStarDensity();
}
</script>

<div class="global-sky">
    <canvas class="global-sky__stars"></canvas>
</div>


<style>
.global-sky {
    width: 100vw;
    height: 100vh;
    background-color: var(--global-bg-color);
    position: fixed;
    inset: 0;
    z-index: -1;
}
.global-sky__stars {
    width: 100%;
    height: 100%;
}
</style>
