<template>
  <div class="md:hidden">
    <h2 class="text-xl mb-4 text-gray-200 text-center">Impact Highlights</h2>
    
    <!-- Mobile Carousel -->
    <div class="relative overflow-hidden">
      <div 
        class="flex transition-transform duration-300 ease-in-out"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
      >
        <div 
          v-for="(item, index) in highlightItems" 
          :key="`mobile-item-${index}`"
          class="w-full flex-shrink-0 px-4"
        >
          <div class="highlight-card">
            <h3 class="text-lg mb-2 text-blue-100">{{ item.title }}</h3>
            <p class="text-gray-300/90 text-sm">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation Dots -->
      <div class="flex justify-center mt-2 gap-2">
        <button
          v-for="(_, index) in highlightItems"
          :key="`dot-${index}`"
          class="w-2 h-2 rounded-full transition-all duration-300"
          :class="currentIndex === index ? 'bg-blue-500 w-4' : 'bg-gray-600'"
          @click="currentIndex = index"
          aria-label="Go to slide"
        ></button>
      </div>

      <!-- Navigation Arrows -->
      <button
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 p-2 rounded-full"
        @click="prevSlide"
        :disabled="currentIndex === 0"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 p-2 rounded-full"
        @click="nextSlide"
        :disabled="currentIndex === highlightItems.length - 1"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { highlightItems } from "../../data/highlightItems";

const currentIndex = ref(0);

const nextSlide = () => {
  if (currentIndex.value < highlightItems.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);
</script>

<style scoped>
.highlight-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-3 shadow-lg;
  height: 100%;
}
</style> 