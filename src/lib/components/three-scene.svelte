<script lang="ts">
import { onMount } from "svelte";
import * as THREE from "three";
import vertexShader from "$lib/shaders/vertex"
import fragmentShader from "$lib/shaders/fragment"

type Props = {
    mainColor: number,
    bgColor: number,
    width?: string,
    height?: string,
    top?: number,
    left?: number,
}

let { 
    mainColor,
    bgColor,
    width = '100%',
    height = '100%',
    top = 0,
    left = 0,
}: Props = $props();

let animatedFrameId: number = -1;

onMount(() => {
    const threeScene: HTMLDivElement | null = document.querySelector('.app__three-scene');

    if (!threeScene) return;

    const { offsetWidth, offsetHeight } = threeScene;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false });

    const uniforms = {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(offsetWidth, offsetHeight) },
        uMainColor: { value: new THREE.Color(mainColor) },
        uBgColor: { value: new THREE.Color(bgColor) },
    };

    renderer.setSize(offsetWidth, offsetHeight);
    threeScene.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = (time: number) => {
        animatedFrameId = requestAnimationFrame(animate);

        uniforms.iTime.value = time * 0.001;
        renderer.render(scene, camera);
    }
    const resize = () => {
        const { offsetWidth, offsetHeight } = threeScene;

        renderer.setSize(offsetWidth, offsetHeight);
        uniforms.iResolution.value.set(offsetWidth, offsetHeight);
    }

    animatedFrameId = requestAnimationFrame(animate);
    window.addEventListener('resize', resize);

    return () => {
        renderer.dispose();
        window.removeEventListener('resize', resize);
        if (animatedFrameId >= 0) cancelAnimationFrame(animatedFrameId);
    }
});

</script>

<div 
    class="app__three-scene"
    style:--three-scene-width={ width }
    style:--three-scene-height={ height }
    style:--three-scene-top={ top }
    style:--three-scene-left={ left }
></div>

<style>
.app__three-scene {
    position: fixed;
    width: var(--three-scene-width);
    height: var(--three-scene-height);
    top: var(--three-scene-top);
    left: var(--three-scene-left);
    z-index: -1;
}
</style>
