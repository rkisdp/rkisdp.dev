<template>
  <section
    ref="sectionRef"
    id="impact"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    ></div>

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

    <div
      class="h-full w-full flex flex-col items-center justify-start pt-48 pb-4 md:py-0 md:justify-center"
    >
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <!-- Impact Areas Section -->
        <div
          class="max-w-3xl mx-auto text-center mt-8 mb-2 md:mb-16"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 20}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-xl sm:text-3xl md:text-4xl mb-4 md:mb-8 text-gray-200">
            Creating Meaningful Impact
          </h2>
          <p class="text-base sm:text-lg mb-4 md:mb-6 text-gray-300/90">
            I transform complex challenges into elegant, efficient solutions
            that make a real difference. My focus is on building innovations
            that simplify lives and empower organizations to achieve more.
          </p>
          <p class="text-sm sm:text-base md:text-lg text-gray-400/90 italic">
            Every solution begins with a deep understanding of the human
            experience, followed by thoughtful design that bridges technology
            and real-world needs.
          </p>
        </div>

        <!-- Highlights Section -->
        <div
          class="text-center"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <!-- Mobile Version -->
          <MobileImpactHighlights />

          <!-- Desktop Version -->
          <div class="hidden md:block">
            <h2 class="text-xl md:text-3xl mb-8 text-gray-200">
              Impact Highlights
            </h2>
            <!-- Grid container -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              <!-- All highlight items -->
              <div
                v-for="(item, index) in highlightItems"
                :key="`item-${index}`"
                class="highlight-card"
                :style="{
                  opacity: isVisible ? 1 : 0,
                  transform: `translateY(${isVisible ? 0 : 20}px)`,
                  transition: `opacity 0.6s ease-out ${item.delay}, transform 0.6s ease-out ${item.delay}`,
                }"
              >
                <h3 class="text-xl md:text-2xl mb-4 md:mb-5 text-blue-100">
                  {{ item.title }}
                </h3>
                <p class="text-gray-300/90 text-base md:text-lg">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import MobileImpactHighlights from "./MobileImpactHighlights.vue";
import { highlightItems } from "../../data/highlightItems";

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const glowRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
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

<style scoped>
.highlight-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-5 sm:p-6 md:p-8 shadow-lg;
  height: 100%;
}

/* Add responsive styles for the section */
.section {
  @apply min-h-[calc(100vh-4rem)] md:min-h-screen;
}
</style>
