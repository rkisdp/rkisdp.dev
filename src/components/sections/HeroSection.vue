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
          v-if="currentThemeId === ThemeId.HOLI"
          :style="{
            opacity,
            transform: `scale(${0.9 + opacity * 0.1})`,
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
          }"
          class="text-5xl sm:text-7xl md:text-9xl mb-6"
        >
          <PaintSplashText 
            text="DIVYA PRAKASH"
            :colors="currentTheme.config?.colors"
          />
        </h1>

        <h1
          v-else
          class="text-5xl sm:text-7xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white tracking-tighter uppercase mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          :style="{
            opacity,
            transform: `scale(${0.9 + opacity * 0.1})`,
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out',
          }"
        >
          DIVYA PRAKASH
        </h1>

        <div
          class="terminal-container"
          :style="{
            opacity: Math.max(0, opacity - 0.2),
            transform: `translateY(${(1 - opacity) * 40}px)`,
            transition: 'opacity 1.5s ease-out 0.3s, transform 1.5s ease-out 0.3s',
          }"
        >
          <h2 class="terminal-title">I build scalable backends.</h2>
          <div class="terminal-line">
            <span class="prompt">></span>
            <span class="typed-text">{{ currentTypedText }}</span>
            <span class="cursor"></span>
          </div>
        </div>
      </div>
    </div>
    

  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import NebulaBackground from "../NebulaBackground.vue";
import PaintSplashText from "../themes/holi/PaintSplashText.vue";
import { useTheme } from "../../composables/useTheme";
import { ThemeId } from "../../types/theme";

const { currentTheme, currentThemeId } = useTheme();
const opacity = ref(0);
const zoomLevel = ref(1.2);
const scrollY = ref(0);

const texts = [
  "Building secure APIs...",
  "Designing scalable systems...",
  "Optimizing databases...",
  "Automating workflows..."
];

const currentTypedText = ref("");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = texts[textIndex];
  if (!isDeleting) {
    currentTypedText.value = currentText.slice(0, charIndex++);
    if (charIndex > currentText.length) {
      setTimeout(() => isDeleting = true, 1200);
    }
  } else {
    currentTypedText.value = currentText.slice(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      charIndex = 0;
      textIndex = (textIndex + 1) % texts.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 40 : 80);
}

onMounted(() => {
  // Start typing effect
  typeEffect();

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

.terminal-container {
  text-align: center;
  margin-bottom: 2.5rem;
}

.terminal-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;
  margin-bottom: 0.5rem;
}

@media (min-width: 640px) {
  .terminal-title {
    font-size: 2rem;
  }
}

.terminal-line {
  font-family: "Courier New", monospace;
  font-size: 1rem;
  color: #00ff88;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (min-width: 640px) {
  .terminal-line {
    font-size: 1.25rem;
  }
}

.prompt {
  margin-right: 8px;
}

.cursor {
  display: inline-block;
  width: 8px;
  background-color: #00ff88;
  margin-left: 4px;
  animation: blink 1s infinite;
  height: 1.2em;
}

@keyframes blink {
  0%, 50%, 100% { opacity: 1; }
  25%, 75% { opacity: 0; }
}

</style>
