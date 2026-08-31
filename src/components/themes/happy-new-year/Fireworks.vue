<template>
  <div ref="container" class="fireworks-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { FireworksWorld } from './fireworks-engine';

const container = ref<HTMLElement | null>(null);
let world: FireworksWorld | null = null;

onMounted(() => {
  if (container.value) {
    world = new FireworksWorld(container.value);
  }
});

onUnmounted(() => {
  if (world) {
    world.dispose();
    world = null;
  }
});
</script>

<style scoped>
.fireworks-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 50;
  overflow: hidden;
}
</style>
