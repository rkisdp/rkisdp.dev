<template>
  <section
    ref="sectionRef"
    id="vision"
    class="section bg-gradient-to-br from-background to-blue-950/10 relative"
  >
    <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIxMDAlIiB5MT0iMTAwJSIgeDI9IjAlIiB5Mj0iMCUiIGlkPSJhIj48c3RvcCBzdG9wLWNvbG9yPSIjMjAzMDQwIiBzdG9wLW9wYWNpdHk9Ii4wNSIgb2Zmc2V0PSIwJSIvPjxzdG9wIHN0b3AtY29sb3I9IiMwMDMwNjAiIHN0b3Atb3BhY2l0eT0iMCIgb2Zmc2V0PSIxMDAlIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZD0iTTAgNjBMMzAgMzAgNjAgNjB6IiBmaWxsPSJ1cmwoI2EpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')]"></div>

    <div class="h-full w-full flex items-center justify-center">
      <div class="container-custom max-w-4xl">
        <div
          class="p-8 lg:p-12 rounded-lg backdrop-blur-sm border border-white/5 bg-blue-900/5"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            transitionDelay: '0.1s'
          }"
        >
          <h2 class="text-3xl md:text-4xl mb-8 text-gray-200">Vision</h2>
          <p class="text-lg mb-10 text-gray-300/90">
            A world where technology enhances human potential rather than replacing it.
            Where elegant solutions make complex problems feel simple, and where
            innovation is measured by its positive impact on lives.
          </p>

          <ul class="space-y-4">
            <li
              v-for="(item, index) in visionItems"
              :key="index"
              class="flex items-center space-x-3 text-gray-300/90"
              :style="{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
                transitionDelay: `${0.2 + index * 0.1}s`
              }"
            >
              <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

const visionItems = [
  'Human-centered thinking',
  'Elegant simplicity',
  'Measurable outcomes'
];

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
      rootMargin: '0px',
      threshold: 0.3
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  // Cleanup
  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
