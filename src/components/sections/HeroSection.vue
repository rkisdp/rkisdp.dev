<template>
  <section class="section relative flex flex-col items-center justify-center overflow-hidden">
    <NebulaBackground :opacity="opacity" :zoomLevel="zoomLevel" />

    <div class="h-full w-full flex flex-col items-center justify-center">
      <div class="w-full md:w-[80%] max-w-[900px] z-10 px-4 md:px-0 flex justify-center">
        <h1
          class="text-3xl sm:text-5xl md:text-8xl text-gray-300/90 tracking-wide uppercase text-center whitespace-nowrap"
          :style="{
            opacity,
            transform: `translateY(${(1 - opacity) * 30}px)`,
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
            letterSpacing: '0.08em',
            width: '100%'
          }"
        >
          divya prakash
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import NebulaBackground from '../NebulaBackground.vue';

const opacity = ref(0);
const zoomLevel = ref(1.2);
const isVisible = ref(false);

onMounted(() => {
  // Animate in
  const timeoutId = setTimeout(() => {
    opacity.value = 1;
    zoomLevel.value = 1;
    isVisible.value = true;
  }, 300);

  // Handle scroll effect
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      // Parallax effect for hero section
      const newZoom = 1 + (scrollPosition * 0.0003);
      const newOpacity = 1 - (scrollPosition / window.innerHeight * 0.8);

      zoomLevel.value = newZoom;
      opacity.value = Math.max(0, newOpacity);
    }
  };

  window.addEventListener('scroll', handleScroll);

  // Cleanup
  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('scroll', handleScroll);
  };
});
</script>
