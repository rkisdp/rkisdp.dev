<template>
  <div class="snowfall-container fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div
      v-for="flake in flakes"
      :key="flake.id"
      class="snowflake"
      :style="{
        left: flake.left + '%',
        animationDuration: flake.duration + 's',
        animationDelay: flake.delay + 's',
        opacity: flake.opacity,
        fontSize: `${flake.size}em`,
      }"
    >
      ❄
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Snowflake {
  id: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  size: number;
}

const flakes = ref<Snowflake[]>([]);
const flakeCount = 50; // Number of snowflakes

function createSnowflake(id: number): Snowflake {
  return {
    id,
    left: Math.random() * 100,
    duration: 3 + Math.random() * 7, // 3-10 seconds
    delay: Math.random() * 5,
    opacity: 0.3 + Math.random() * 0.7, // 0.3-1.0
    size: 0.5 + Math.random() * 1.5, // 0.5-2.0
  };
}

function initializeSnowflakes() {
  flakes.value = Array.from({ length: flakeCount }, (_, i) => createSnowflake(i));
}

onMounted(() => {
  initializeSnowflakes();
});

onUnmounted(() => {
  flakes.value = [];
});
</script>

<style scoped>
.snowfall-container {
  user-select: none;
}

.snowflake {
  position: absolute;
  top: -10px;
  color: white;
  font-size: 1.5em;
  line-height: 1;
  animation: snowfall linear infinite;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

@keyframes snowfall {
  0% {
    transform: translateY(-100vh) translateX(0) rotate(0deg);
  }
  50% {
    transform: translateY(50vh) translateX(20px) rotate(180deg);
  }
  100% {
    transform: translateY(100vh) translateX(-20px) rotate(360deg);
  }
}
</style>
