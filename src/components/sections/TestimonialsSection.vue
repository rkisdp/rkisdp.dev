<template>
  <section
    ref="sectionRef"
    id="testimonials"
    class="section relative overflow-hidden flex items-center"
  >
    <!-- Background particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-down"
        style="
          top: 65%;
          left: 15%;
          background-color: rgba(0, 100, 200, 0.02);
          opacity: 0.2;
          animation-duration: 25s;
        "
      ></div>
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-right"
        style="
          top: 25%;
          left: 70%;
          background-color: rgba(0, 80, 180, 0.03);
          opacity: 0.3;
          animation-duration: 28s;
        "
      ></div>
    </div>

    <div class="container-custom max-w-6xl mx-auto px-4 w-full">
      <div
        class="text-center mb-12 md:mb-20"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 30}px)`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }"
      >
        <h2 class="section-title mb-4">
          Testimonials
        </h2>
        <p class="text-sm md:text-lg text-gray-300/90 max-w-xl mx-auto">
          What others say about working with me
        </p>
      </div>

      <div
        class="relative mt-4 md:mt-12"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transitionDelay: '0.2s',
        }"
      >
        <!-- Testimonial slider -->
        <div class="overflow-hidden rounded-lg">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0 px-1 sm:px-2 md:px-4"
            >
              <div
                class="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-3 md:p-8 shadow-xl"
              >
                <div
                  class="flex flex-col sm:flex-row sm:items-center mb-3 md:mb-6"
                >
                  <div
                    class="h-12 w-12 sm:h-16 sm:w-16 rounded-full overflow-hidden mb-2 sm:mb-0 sm:mr-4 border-2 border-blue-500/50 mx-auto sm:mx-0"
                  >
                    <img
                      :src="testimonial.image"
                      :alt="testimonial.name"
                      class="h-full w-full object-cover"
                    />
                  </div>
                  <div class="text-center sm:text-left">
                    <h4 class="text-base md:text-xl font-medium text-gray-200">
                      {{ testimonial.name }}
                    </h4>
                    <p class="text-xs md:text-base text-gray-400">
                      {{ testimonial.designation }}
                    </p>
                    <a
                      :href="testimonial.linkedin"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-1"
                    >
                      <font-awesome-icon
                        :icon="['fab', 'linkedin']"
                        class="text-base md:text-lg mr-1"
                      />
                      <span class="text-xs md:text-sm">View Profile</span>
                    </a>
                  </div>
                </div>
                <div class="mb-2 md:mb-4 text-center sm:text-left">
                  <font-awesome-icon
                    :icon="['fas', 'quote-left']"
                    class="text-blue-500/50 text-lg md:text-3xl mr-2 opacity-50"
                  />
                </div>
                <p
                  class="text-gray-300 text-xs sm:text-base md:text-lg italic leading-relaxed line-clamp-4 sm:line-clamp-none"
                >
                  {{ testimonial.text }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation buttons - outside card on mobile -->
        <div class="flex justify-between mt-3 mx-auto max-w-xs sm:hidden">
          <button
            @click="prevSlide"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
            :disabled="currentSlide === 0"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </button>

          <button
            @click="nextSlide"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
            :class="{
              'opacity-50 cursor-not-allowed':
                currentSlide === testimonials.length - 1,
            }"
            :disabled="currentSlide === testimonials.length - 1"
          >
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </div>

        <!-- Navigation buttons - on sides for larger screens -->
        <button
          @click="prevSlide"
          class="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:-translate-x-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>

        <button
          @click="nextSlide"
          class="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:translate-x-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
          :class="{
            'opacity-50 cursor-not-allowed':
              currentSlide === testimonials.length - 1,
          }"
          :disabled="currentSlide === testimonials.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>

        <!-- Dots navigation -->
        <div class="flex justify-center mt-4 md:mt-8 space-x-2">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all focus:outline-none"
            :class="
              currentSlide === index
                ? 'bg-blue-500 scale-125'
                : 'bg-gray-600 hover:bg-gray-500'
            "
            :aria-label="`Go to testimonial ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue";
import { testimonials } from "../../data/testimonials";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver";

const sectionRef = ref<HTMLElement | null>(null);
const currentSlide = ref(0);

const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.2 });

/**
 * Advances to the next slide. If at the end, loops back to the start.
 */
const nextSlide = () => {
  if (currentSlide.value < testimonials.length - 1) {
    currentSlide.value++;
  } else {
    currentSlide.value = 0;
  }
};

/**
 * Goes to the previous slide. If at the start, loops to the end.
 */
const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  } else {
    currentSlide.value = testimonials.length - 1;
  }
};

/**
 * Navigates directly to a specific slide index.
 * @param index - The index of the slide to navigate to.
 */
const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Auto-rotation logic
let autoplayInterval: number | null = null;

/**
 * Starts the automatic rotation of testimonial slides.
 */
const startAutoplay = () => {
  stopAutoplay();
  autoplayInterval = window.setInterval(nextSlide, 8000);
};

/**
 * Stops the automatic rotation of testimonial slides.
 */
const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};


watch(isVisible, (visible) => {
  if (visible) {
    startAutoplay();
  } else {
    stopAutoplay();
  }
});

onUnmounted(() => {
  stopAutoplay();
});
</script>