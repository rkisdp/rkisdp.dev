
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
        class="h-full w-full flex flex-col items-center justify-start md:justify-center"
    >
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <!-- Impact Areas Section -->
        <div
            class="max-w-3xl mx-auto text-center mb-12 md:mb-20 transition-all duration-800 ease-out"
            :class="{'opacity-0 translate-y-5': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        >
          <h2 class="section-title mb-4">
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
            class="text-center transition-all duration-800 ease-out"
            :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        >
          <!-- Mobile Version -->
          <div class="md:hidden">
            <h3 class="text-xl mb-4 text-gray-200 text-center">Impact Highlights</h3>
            <p class="text-sm text-gray-400/90 mb-4">These are the patterns, technologies, and practices I use to build reliable systems that scale. Each capability is tied to production outcomes, not just familiarity, but demonstrated impact.</p>

            <!-- Mobile Carousel -->
            <div class="relative overflow-hidden">
              <div
                  ref="carouselContainer"
                  class="flex transition-transform duration-300 ease-in-out"
                  :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
              >
                <div
                    v-for="(item, index) in highlightItems"
                    :key="`mobile-item-${index}`"
                    class="w-full flex-shrink-0 px-4"
                >
                  <div class="highlight-card">
                    <h3 class="text-xl mb-4 text-blue-100">{{ item.title }}</h3>
                    <p class="text-gray-300/90 text-base">{{ item.description }}</p>
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
                    @click="goToSlide(index)"
                    aria-label="Go to slide"
                ></button>
              </div>

              <!-- Navigation Arrows -->
              <button
                  class="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/80 p-2 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                  @click="prevSlide"
                  :disabled="currentIndex === 0"
                  aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                  class="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/80 p-2 rounded-full focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
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

          <!-- Desktop Version -->
          <div class="hidden md:block">
            <h3 class="text-xl md:text-3xl mb-4 text-gray-200">
              Impact Highlights
            </h3>
            <p class="text-sm md:text-base text-gray-400/90 mb-8">These are the patterns, technologies, and practices I use to build reliable systems that scale. Each capability is tied to production outcomes, not just familiarity, but demonstrated impact.</p>
            <!-- Grid container -->
            <div
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            >
              <!-- All highlight items -->
              <div
                  v-for="(item, index) in highlightItems"
                  :key="`item-${index}`"
                  class="highlight-card transition-all duration-600 ease-out"
                  :class="{'opacity-0 translate-y-5': !isVisible, 'opacity-100 translate-y-0': isVisible}"
                  :style="{
                  transitionDelay: `${index * 100}ms`,
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
import { ref, onMounted, onUnmounted, watch } from "vue";
import { highlightItems } from "../../data/highlightItems";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver";

const sectionRef = ref<HTMLElement | null>(null);
const glowRef = ref<HTMLDivElement | null>(null);
const carouselContainer = ref<HTMLElement | null>(null);
const currentIndex = ref(0);
const autoplayInterval = ref<number | null>(null);
const isPaused = ref(false);

const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });

/**
 * Advances the mobile carousel to the next slide.
 */
const nextSlide = () => {
  if (currentIndex.value < highlightItems.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
};

/**
 * Moves the mobile carousel to the previous slide.
 */
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

/**
 * Navigates to a specific slide in the mobile carousel.
 * @param index - The index of the slide to navigate to.
 */
const goToSlide = (index: number) => {
  currentIndex.value = index;
  resetAutoplayTimer();
};

/**
 * Starts the automatic rotation of the mobile carousel.
 */
const startAutoplay = () => {
  if (autoplayInterval.value) return;
  autoplayInterval.value = window.setInterval(() => {
    if (!isPaused.value) nextSlide();
  }, 5000);
};

/**
 * Stops the automatic rotation of the mobile carousel.
 */
const stopAutoplay = () => {
  if (autoplayInterval.value) {
    clearInterval(autoplayInterval.value);
    autoplayInterval.value = null;
  }
};

/**
 * Resets the autoplay timer.
 */
const resetAutoplayTimer = () => {
  stopAutoplay();
  startAutoplay();
};

const pauseAutoplay = () => { isPaused.value = true; };
const resumeAutoplay = () => { isPaused.value = false; };

onMounted(() => {
  // Glow effect animation logic
  let animationId: number;
  let intervalId: number;

  const animateGlow = () => {
    if (!glowRef.value) return;

    const glow = glowRef.value;
    const position = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const animate = () => {
      position.x += (target.x - position.x) * 0.05;
      position.y += (target.y - position.y) * 0.05;

      glow.style.opacity = isVisible.value ? "1" : "0";
      glow.style.transform = `translate(${position.x}px, ${position.y}px)`;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    intervalId = window.setInterval(() => {
      target.x = Math.random() * 100 - 50;
      target.y = Math.random() * 100 - 50;
    }, 3000);
  };

  animateGlow();

  if (carouselContainer.value) {
    carouselContainer.value.addEventListener('mouseenter', pauseAutoplay);
    carouselContainer.value.addEventListener('mouseleave', resumeAutoplay);
    carouselContainer.value.addEventListener('touchstart', pauseAutoplay);
    carouselContainer.value.addEventListener('touchend', resumeAutoplay);
  }

  onUnmounted(() => {
    stopAutoplay();
    cancelAnimationFrame(animationId);
    clearInterval(intervalId);
    if (carouselContainer.value) {
      carouselContainer.value.removeEventListener('mouseenter', pauseAutoplay);
      carouselContainer.value.removeEventListener('mouseleave', resumeAutoplay);
      carouselContainer.value.removeEventListener('touchstart', pauseAutoplay);
      carouselContainer.value.removeEventListener('touchend', resumeAutoplay);
    }
  });
});

watch(isVisible, (visible) => {
  if (visible) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
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