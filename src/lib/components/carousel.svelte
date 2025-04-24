<script lang="ts">
import { onMount } from "svelte";

let { cards: slides } = $props();

const timerDuration: number = 3000;

let slider: HTMLDivElement | null = null;

let direction: number = $state(-1);
let index: number = $state(0);

let interval: ReturnType<typeof setInterval>;
let timer: number = $state(0);
let timerPercent: number = $derived(timer / timerDuration * 100)

let noTransition: boolean = $state(false);
let isPaused: boolean = $state(true);

onMount(() => {
    slider = document.querySelector('.carousel__slider');

    if (!slider) return;

    interval = setInterval(updateTimer, 10)

    slider.addEventListener('transitionend', transitionend);
    slider.addEventListener('transitionstart', transitionstart);

    return (() => clearInterval(interval));
})

const updateTimer = () => {
    if (isPaused) return;

    if (timer >= timerDuration) changeDirection(-1);
    timer += 10;
}

const changeDirection = (newDirection: -1 | 1) => {
    if (!slider) return;

    const child = direction == -1 ? slider.firstElementChild : slider.lastElementChild;

    if (!child) return;

    const isSwitchingToRight: boolean = newDirection == 1 && direction == -1;
    const isSwitchingToLeft: boolean = newDirection == -1 && direction == 1;

    if (isSwitchingToRight) {
        slider.appendChild(child);
        direction = 1
    } else if (isSwitchingToLeft) {
        slider.prepend(child);
        direction = -1
    };

    slider.style.setProperty('--translate-x', `${ 100 * direction }%`);
}
const transitionstart = () => {
    const goToEnd: boolean = index <= 0 && direction == 1;
    const goToStart: boolean = index >= slides.length - 1 && direction == -1;

    index = goToEnd ? slides.length - 1 : goToStart ? 0 : index + direction * -1;

    isPaused = true;
    timer = 0;
}
const transitionend = () => {
    if (!slider) return;

    noTransition = true;
    const child = direction == -1 ? slider.firstElementChild : slider.lastElementChild;

    if (child && direction == -1) {
        slider.appendChild(child);
    } else if (child && direction == 1) {
        slider.prepend(child);
    }

    isPaused = false;

    slider.style.setProperty('--translate-x', `0`);
    setTimeout(() => noTransition = false);
}
</script>

<div 
    class="carousel__slider" 
    class:carousel__slider--transition={ !noTransition }
    style:--translate-x="0"
    style:--direction={ direction > 0 ? 'flex-end' : 'flex-start' }
>
    {#each slides as { id, name } (id)}
        <div class="carousel__slide" data-name={ name }>
            <p>{ name }</p>
        </div> 
    {/each}
</div>
<div class="carousel__pagination" style:--nbr-slides={ slides.length }>
    {#each Array(slides.length), i}
       <div class="carousel__pagination-bullet" class:carousel__pagination-bullet--active={ i == index }></div> 
    {/each}
</div>
<div class="carousel__controls">
    <button onclick={() =>  isPaused = !isPaused }>{ isPaused ? 'PLAY' : 'PAUSE' }</button>
    <button onclick={() => changeDirection(1) }>PREVIOUS</button>
    <button onclick={() => changeDirection(-1) }>NEXT</button>
</div>
<div class="carousel__timer" style:--timer="{ timer / timerDuration * 100 }%"></div>

<style>
.carousel__slider {
    height: 100%;
    display: flex;
    justify-content: var(--direction);
    transform: translateX(var(--translate-x));
}
.carousel__slider--transition {
    transition: transform 320ms ease;
}
.carousel__slide {
    height: 100%;
    aspect-ratio: 16 / 9;
    max-width: 100%;
    flex: 0 0 100%;
}
.carousel__pagination {
    --bullet-width: 5px;

    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: var(--bullet-width);
}
.carousel__pagination-bullet {
    width: var(--bullet-width);
    height: var(--bullet-width);
    border-radius: var(--bullet-width);
    background-color: #fff;
    opacity: .4;
    transition: width 320ms ease;
}
.carousel__pagination-bullet--active {
    opacity: 1;
}
.carousel__controls {
    position: absolute;
    bottom: 0;
    right: 0;
}
.carousel__timer {
    position: absolute;
    bottom: 0;
    height: 2px;
    background-color: #fff;
    width: var(--timer);
}
</style>
