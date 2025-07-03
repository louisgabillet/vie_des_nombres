<script lang="ts">
</script>

<div class="app__footer">
    <div class="app__footer-clock">
        <div class="app__footer-clock-handle app__footer-clock-hours"></div>
        <div class="app__footer-clock-handle app__footer-clock-minutes"></div>
        <div class="app__footer-clock-handle app__footer-clock-seconds"></div>
    </div>
</div>

<style>
.app__footer {
    width: 100%;
    height: 400px;
    position: relative;
    background: black;
}
.app__footer-clock {
    width: 300px;
    aspect-ratio: 1 / 1;
    background: red;
    position: absolute;
    inset: 0;
    margin: auto;
    border-radius: 50%;
}
.app__footer-clock-handle {
    height: 50%;
    position: absolute;
    inset: 0;
    margin: 0 auto;
    transform-origin: bottom;
}
.app__footer-clock-hours {
    width: 10px;
    background: blue;
}
.app__footer-clock-minutes {
    width: 10px;
    background: blue;
    z-index: 1;
}
.app__footer-clock-seconds {
    width: 1px;
    background: yellow;
    z-index: 2;
}
</style>
