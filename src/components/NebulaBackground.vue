<template>
  <div
    class="absolute inset-0 w-full h-full -z-10 overflow-hidden"
    :style="{
      opacity,
      transform: `scale(${zoomLevel})`,
      transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out',
    }"
  >
    <svg width="1280" height="720" viewBox="0 0 1280 720" class="w-full h-full">
      <defs>
        <radialGradient id="backgroundGradient" cx="50%" cy="50%" r="100%">
          <stop offset="0%" stop-color="rgba(10, 50, 100, 0.2)" />
          <stop offset="50%" stop-color="rgba(5, 30, 60, 0.1)" />
          <stop offset="100%" stop-color="rgba(5, 30, 60, 0)" />
        </radialGradient>
      </defs>

      <!-- Nebula gradients -->
      <defs>
        <radialGradient id="nebulaGradient0" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(80, 150, 250, 0.4)" />
          <stop offset="50%" stop-color="rgba(40, 100, 200, 0.2)" />
          <stop offset="100%" stop-color="rgba(10, 50, 150, 0)" />
        </radialGradient>

        <radialGradient id="nebulaGradient1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(80, 220, 120, 0.35)" />
          <stop offset="50%" stop-color="rgba(40, 180, 100, 0.2)" />
          <stop offset="100%" stop-color="rgba(20, 100, 60, 0)" />
        </radialGradient>

        <radialGradient id="nebulaGradient2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(60, 220, 220, 0.3)" />
          <stop offset="50%" stop-color="rgba(30, 160, 180, 0.15)" />
          <stop offset="100%" stop-color="rgba(10, 80, 100, 0)" />
        </radialGradient>

        <radialGradient id="nebulaGradient3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(255, 215, 80, 0.25)" />
          <stop offset="50%" stop-color="rgba(200, 170, 40, 0.12)" />
          <stop offset="100%" stop-color="rgba(120, 100, 10, 0)" />
        </radialGradient>

        <radialGradient id="nebulaGradient4" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="rgba(150, 220, 80, 0.35)" />
          <stop offset="50%" stop-color="rgba(100, 180, 40, 0.18)" />
          <stop offset="100%" stop-color="rgba(50, 120, 20, 0)" />
        </radialGradient>
      </defs>

      <!-- Nebulae -->
      <g class="nebulae" ref="nebulaeRef">
        <ellipse
          v-for="(nebula, index) in nebulae"
          :key="index"
          :cx="nebula.cx"
          :cy="nebula.cy"
          :rx="nebula.rx"
          :ry="nebula.ry"
          :fill="nebula.fill"
          :opacity="nebula.opacity"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { PropType } from "vue";

interface Nebula {
  cx: string;
  cy: string;
  rx: string;
  ry: string;
  fill: string;
  opacity: number;
}

const props = defineProps({
  opacity: {
    type: Number as PropType<number>,
    default: 1,
  },
  zoomLevel: {
    type: Number as PropType<number>,
    default: 1,
  },
});

const nebulaeRef = ref<SVGGElement | null>(null);

// Generate random nebulae positions and colors
const generateNebulae = () => {
  const numNebulae = 5;
  const nebulae: Nebula[] = [];

  for (let i = 0; i < numNebulae; i++) {
    const cx = Math.random() * 100;
    const cy = Math.random() * 100;
    const rx = 30 + Math.random() * 40;
    const ry = 25 + Math.random() * 35;
    const opacity = 0.8 + Math.random() * 0.2;
    const gradientIndex = i % 5;

    nebulae.push({
      cx: `${cx}%`,
      cy: `${cy}%`,
      rx: `${rx}%`,
      ry: `${ry}%`,
      fill: `url(#nebulaGradient${gradientIndex})`,
      opacity,
    });
  }

  return nebulae;
};

const nebulae = ref<Nebula[]>(generateNebulae());

// Animation logic
onMounted(() => {
  const nebulaeElement = nebulaeRef.value;
  if (!nebulaeElement) return;

  const nebulaElements = Array.from(nebulaeElement.children) as SVGElement[];

  nebulaElements.forEach((nebula, index) => {
    // Set initial transforms for animation
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.00001 + Math.random() * 0.00002;

    let currentX = parseFloat(nebula.getAttribute("cx") || "50");
    let currentY = parseFloat(nebula.getAttribute("cy") || "50");
    let dirX = Math.cos(angle);
    let dirY = Math.sin(angle);

    const animate = () => {
      // Very slow movement
      currentX += dirX * speed;
      currentY += dirY * speed;

      // Boundary check and direction change
      if (currentX < 10 || currentX > 90) dirX *= -1;
      if (currentY < 10 || currentY > 90) dirY *= -1;

      nebula.setAttribute("cx", `${currentX}%`);
      nebula.setAttribute("cy", `${currentY}%`);

      requestAnimationFrame(animate);
    };

    const animationDelay = index * 100;
    setTimeout(() => {
      requestAnimationFrame(animate);
    }, animationDelay);
  });
});
</script>
