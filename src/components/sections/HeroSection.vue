<template>
  <section
    class="section relative flex flex-col items-center justify-center overflow-hidden min-h-screen"
  >
    <NebulaBackground :opacity="opacity" :zoomLevel="zoomLevel" />

    <div class="h-full w-full flex flex-col items-center justify-center z-10">
      <div
        class="w-full max-w-7xl px-4 flex flex-col items-center text-center"
      >
        <h2 
          class="text-primary font-mono mb-4 tracking-wider text-sm sm:text-base animate-fade-in-up"
          :style="{ opacity: Math.min(1, opacity * 2), transform: `translateY(${(1 - opacity) * 20}px)` }"
        >
          HELLO, I AM
        </h2>
        
        <h1
          class="text-5xl sm:text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tighter uppercase mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          :style="{
            opacity,
            transform: `scale(${0.9 + opacity * 0.1})`,
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
          }"
        >
          divya prakash
        </h1>

        <p
          class="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl font-light tracking-wide mb-10"
          :style="{
            opacity: Math.max(0, opacity - 0.2),
            transform: `translateY(${(1 - opacity) * 40}px)`,
            transition: 'opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s',
          }"
        >
          Engineering reliable and scalable systems that handle real-world chaos.
<!--          Engineering <span class="text-green-400 font-medium">secure</span>, <span class="text-accent font-medium">scalable</span>, and <span class="text-primary font-medium">intelligent</span> digital solutions.-->
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import NebulaBackground from "../NebulaBackground.vue";

const opacity = ref(0);
const zoomLevel = ref(1.2);
const scrollY = ref(0);

onMounted(() => {
  // Animate in
  setTimeout(() => {
    opacity.value = 1;
    zoomLevel.value = 1;
  }, 300);

  // Handle scroll effect
  const handleScroll = () => {
    scrollY.value = window.scrollY;
    
    if (scrollY.value < window.innerHeight) {
      // Parallax effect for hero section
      const newZoom = 1 + scrollY.value * 0.0003;
      const newOpacity = 1 - (scrollY.value / window.innerHeight) * 1.2;

      zoomLevel.value = newZoom;
      opacity.value = Math.max(0, newOpacity);
    }
  };

  window.addEventListener("scroll", handleScroll);

  onUnmounted(() => {
    window.removeEventListener("scroll", handleScroll);
  });
});
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
