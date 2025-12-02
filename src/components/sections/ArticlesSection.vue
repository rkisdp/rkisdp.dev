<template>
  <section
    ref="sectionRef"
    id="articles"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    ></div>

    <div
      class="h-full w-full flex flex-col items-center justify-center pt-8 pb-8 md:py-0"
    >
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <div
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2
            class="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary mb-8 text-center"
          >
            My Articles
          </h2>

          <!-- Articles Carousel -->
          <div class="relative">
            <div class="overflow-hidden">
              <div
                ref="articlesContainer"
                class="flex transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(${-currentIndex * slideWidth}px)`,
                }"
              >
                <div
                  v-for="(article, index) in articles"
                  :key="index"
                  class="article-card flex-shrink-0 w-full md:w-1/3 px-2"
                  :style="{
                    opacity: isVisible ? 1 : 0,
                    transform: `translateY(${isVisible ? 0 : 20}px)`,
                    transition: `opacity 0.6s ease-out ${
                      index * 150 + 100
                    }ms, transform 0.6s ease-out ${index * 150 + 100}ms`,
                  }"
                >
                  <div
                    class="h-[320px] bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg shadow-lg overflow-hidden"
                  >
                    <a
                      :href="article.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="block relative"
                    >
                      <div
                        class="h-[180px] bg-gray-800 relative overflow-hidden"
                      >
                        <img
                          :src="article.image"
                          :alt="article.title"
                          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"
                        ></div>
                        <div class="absolute bottom-0 left-0 w-full p-4">
                          <div class="flex items-center">
                            <img
                              src="https://cdn-images-1.medium.com/fit/c/64/64/1*W35QUSvGpcLuxPo3SRTH4w.png"
                              alt="Medium"
                              class="w-5 h-5 mr-2"
                            />
                            <span class="text-xs text-white/90"
                              >Read on Medium</span
                            >
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="p-4">
                      <a
                        :href="article.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-blue-300 transition-colors"
                      >
                        <h3
                          class="text-lg text-blue-100 mb-2 h-auto overflow-hidden text-ellipsis"
                        >
                          {{ article.title }}
                        </h3>
                      </a>
                      <p class="text-gray-300/90 text-xs">{{ article.date }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Navigation Arrows -->
            <button
              @click="prevSlide"
              class="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800 text-white rounded-full p-2 focus:outline-none z-20"
              :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }"
              :disabled="currentIndex === 0"
            >
              <font-awesome-icon :icon="['fas', 'chevron-left']" size="lg" />
            </button>

            <button
              @click="nextSlide"
              class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900/70 hover:bg-gray-800 text-white rounded-full p-2 focus:outline-none z-20"
              :class="{
                'opacity-50 cursor-not-allowed': currentIndex === maxIndex,
              }"
              :disabled="currentIndex === maxIndex"
            >
              <font-awesome-icon :icon="['fas', 'chevron-right']" size="lg" />
            </button>

            <!-- Dots Indicator -->
            <div class="flex justify-center mt-4">
              <button
                v-for="(_, index) in Math.ceil(articles.length / slidesPerView)"
                :key="index"
                @click="goToSlide(index)"
                class="mx-1 w-2 h-2 rounded-full focus:outline-none"
                :class="
                  currentIndex === index
                    ? 'bg-blue-400'
                    : 'bg-gray-600 hover:bg-gray-500'
                "
              ></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";

interface Article {
  title: string;
  url: string;
  date: string;
  image: string;
}

const articles: Article[] = [
  {
    title: "Why Type Checking is a Game-Changer for Python Projects",
    url: "https://rkisdp.medium.com/why-type-checking-is-a-game-changer-for-python-projects-and-how-it-will-save-your-lots-of-time-a10d656d2257",
    date: "Mar 14, 2025",
    image:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*ma0Ee8bOoLhyuBDLua0tYQ.jpeg",
  },
  {
    title: "A Guide To Understanding Django REST Framework Views",
    url: "https://rkisdp.medium.com/guide-of-understanding-django-rest-framework-views-940853a5964f",
    date: "April 5, 2025",
    image:
        "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*70lDa3cF_vQDWuVY8eAZBQ.png",
  },
  {
    title: "Async Programming In Python: Boost Performance and Efficiency of Your Code",
    url: "https://rkisdp.medium.com/async-programming-in-python-boost-performance-and-efficiency-of-your-code-98f1bd29c237",
    date: "August 13, 2025",
    image:
        "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*wZijDlLHoigao77smKm9Hw.png",
  },
];

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const articlesContainer = ref<HTMLDivElement | null>(null);
const currentIndex = ref(0);
const slideWidth = ref(0);
const slidesPerView = ref(3);

const maxIndex = computed(() =>
  Math.max(0, Math.ceil(articles.length / slidesPerView.value) - 1)
);

let resizeObserver: ResizeObserver | null = null;

const updateSlidesPerView = () => {
  const width = window.innerWidth;
  slidesPerView.value = width < 768 ? 1 : width < 1024 ? 2 : 3;
};

const updateSlideWidth = () => {
  if (!articlesContainer.value) return;
  slideWidth.value = articlesContainer.value.offsetWidth / slidesPerView.value;
};

const prevSlide = () =>
  (currentIndex.value = Math.max(0, currentIndex.value - 1));
const nextSlide = () =>
  (currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1));
const goToSlide = (index: number) => (currentIndex.value = index);

onMounted(() => {
  updateSlidesPerView();
  updateSlideWidth();

  resizeObserver = new ResizeObserver(updateSlideWidth);
  articlesContainer.value && resizeObserver.observe(articlesContainer.value);

  const observer = new IntersectionObserver(
    (entries) => {
      isVisible.value = entries[0].isIntersecting;
    },
    { threshold: 0.1 }
  );

  sectionRef.value && observer.observe(sectionRef.value);

  onUnmounted(() => {
    resizeObserver?.disconnect();
    observer.disconnect();
  });
});
</script>

<style scoped>
.article-card:hover {
  transform: translateY(-5px);
}
</style>
