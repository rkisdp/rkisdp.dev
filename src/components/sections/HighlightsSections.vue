<template>
  <section
    ref="sectionRef"
    id="highlights"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    />

    <div class="h-full w-full flex flex-col items-center justify-center pt-16 pb-8 md:py-0">
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <div
          class="text-center mb-8 md:mb-12"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-2xl md:text-4xl mb-6 md:mb-8 text-gray-200">
            Impact Highlights
          </h2>

          <!-- Grid container -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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
              <h3 class="text-lg md:text-xl mb-2 md:mb-3 text-blue-100">{{ item.title }}</h3>
              <p class="text-gray-300/90 text-xs md:text-sm">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface HighlightItem {
  title: string;
  description: string;
  delay: string;
}

const highlightItems: HighlightItem[] = [
  {
    title: 'Building Highly Scallable Systems',
    description: 'Creating dynamic data visualizations that respond to user interactions and help tell complex stories through visual narratives.',
    delay: '100ms'
  },
  {
    title: 'Fluid User Interfaces',
    description: 'Designing interfaces that flow naturally and provide seamless transitions between states for an intuitive user experience.',
    delay: '250ms'
  },
  {
    title: 'Real-time Data Processing',
    description: 'Building systems that can process and visualize data streams in real-time, enabling immediate insights and actions.',
    delay: '400ms'
  },
  {
    title: 'Immersive Experiences',
    description: 'Developing applications that create immersive digital environments through thoughtful animations and visual cues.',
    delay: '550ms'
  }
];

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

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
      threshold: 0.1
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

<style scoped>
.highlight-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 md:p-6 shadow-lg;
  height: 100%;
}
</style>
