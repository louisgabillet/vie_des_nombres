<script lang="ts">
import { onMount } from "svelte";
import * as THREE from "three";
import vertexShader from "$lib/shaders/vertex"
import fragmentShader from "$lib/shaders/fragment"

type Props = {
    mainColor: string,
    bgColor: string,
}
type UniformValue<T> = {
    value: T,
}
type Uniforms = {
    iTime: UniformValue<number>,
    iResolution: UniformValue<THREE.Vector2>,
    uMainColor: UniformValue<THREE.Color>,
    uBgColor: UniformValue<THREE.Color>,
}

let { mainColor, bgColor }: Props = $props();

let threeScene: HTMLDivElement | null = null
let threeCanvas: HTMLCanvasElement | null = null
let animatedFrameId: number = -1;

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
let renderer: THREE.WebGLRenderer | null = null;

const uniforms: Uniforms = {
    iTime: { value: 0.0 },
    iResolution: { value: new THREE.Vector2(0, 0) },
    uMainColor: { value: new THREE.Color(mainColor) },
    uBgColor: { value: new THREE.Color(bgColor) },
};
const geometry = new THREE.PlaneGeometry(2, 2);
const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms });

const mesh = new THREE.Mesh(geometry, material);

const animate = (time: number) => {
    animatedFrameId = requestAnimationFrame(animate);

    uniforms.iTime.value = time * 0.001;
    uniforms.uMainColor.value.lerp(new THREE.Color(mainColor), 0.035);
    uniforms.uBgColor.value.lerp(new THREE.Color(bgColor), 0.035);

    if (renderer) renderer.render(scene, camera);
}
const resize = () => {
    if (!threeScene || !renderer) return;

    const { offsetWidth, offsetHeight } = threeScene;

    renderer.setSize(offsetWidth, offsetHeight);
    uniforms.iResolution.value.set(offsetWidth, offsetHeight);
}

onMount(() => {
    if (!threeScene || !threeCanvas) return;

    const { offsetWidth, offsetHeight } = threeScene;

    renderer = new THREE.WebGLRenderer({ canvas: threeCanvas, antialias: false });
    uniforms.iResolution.value = new THREE.Vector2(offsetWidth, offsetHeight);

    renderer.setSize(offsetWidth, offsetHeight);
    scene.add(mesh);

    animatedFrameId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
        if (renderer) renderer.dispose();
        if (animatedFrameId >= 0) cancelAnimationFrame(animatedFrameId);

        window.removeEventListener('resize', resize);
    }
});

</script>

<div 
    bind:this={ threeScene }
    class="app__three-scene"
>
    <canvas bind:this={ threeCanvas }></canvas>
</div>

<style>
.app__three-scene {
    height: 100%;
    position: fixed;
    inset: 0;
    top: var(--scroll-top);
    z-index: -1;
}
</style>
