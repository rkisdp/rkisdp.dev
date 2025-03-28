<template>
  <section ref="sectionRef" id="impact-areas" class="section relative">
    <div class="h-full w-full flex items-center justify-center relative">
      <!-- Glow effect -->
      <div class="absolute w-full h-full overflow-hidden">
        <div
          ref="glowRef"
          class="absolute top-[70%] left-[80%] w-64 h-64 bg-blue-500/5 rounded-full filter blur-3xl"
          :style="{
            boxShadow: '0 0 15px rgba(0, 153, 255, 0.3)',
            opacity: 0,
            transition: 'opacity 0.5s ease-in-out',
          }"
        ></div>
      </div>

      <!-- Content -->
      <div class="container-custom">
        <div
          class="max-w-3xl mx-auto text-center"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 20}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-3xl md:text-4xl mb-8 text-gray-200">
            Creating Meaningful Impact
          </h2>
          <p class="text-lg mb-6 text-gray-300/90">
            I transform complex challenges into elegant, efficient solutions
            that make a real difference. My focus is on building innovations
            that simplify lives and empower organizations to achieve more.
          </p>
          <p class="text-lg text-gray-400/90 italic">
            Every solution begins with a deep understanding of the human
            experience, followed by thoughtful design that bridges technology
            and real-world needs.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const glowRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        isVisible.value = entry.isIntersecting;
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  // Glow effect animation
  const animateGlow = () => {
    if (!isVisible.value || !glowRef.value) return;

    const glow = glowRef.value;
    const position = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let animationId: number;

    const animate = () => {
      // Smoothly follow the target position
      position.x += (target.x - position.x) * 0.05;
      position.y += (target.y - position.y) * 0.05;

      // Update the translateX and translateY
      glow.style.opacity = "1";
      glow.style.transform = `translate(${position.x}px, ${position.y}px)`;

      animationId = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Periodically change the target position
    const interval = setInterval(() => {
      // Random target position within a range
      target.x = Math.random() * 100 - 50;
      target.y = Math.random() * 100 - 50;
    }, 3000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(interval);
      if (glow) glow.style.opacity = "0";
    };
  };

  const cleanup = animateGlow();

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
    if (cleanup) cleanup();
  });
});
</script>
