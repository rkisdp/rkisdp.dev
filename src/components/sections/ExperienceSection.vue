<template>
  <section
      ref="sectionRef"
      id="experience"
      class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
        class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    ></div>

    <div
        class="h-full w-full flex flex-col items-center justify-center pt-24 pb-12 md:pt-16 md:pb-8 lg:py-0"
    >
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <div
            class="transition-all duration-800 ease-out"
            :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        >
          <h2
              class="text-xl sm:text-2xl md:text-4xl font-bold text-center text-gray-100 mb-6 sm:mb-8 md:mb-12"
          >
            Professional Experience
          </h2>

          <!-- Mobile Slider Version -->
          <div
              class="md:hidden transition-all duration-800 ease-out delay-200"
              :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
          >
            <div class="relative">
              <!-- Experience slider -->
              <div class="overflow-hidden rounded-lg">
                <div
                    ref="sliderContainer"
                    class="flex transition-transform duration-500 ease-in-out"
                    :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
                >
                  <div
                      v-for="(job, index) in jobs"
                      :key="index"
                      class="w-full flex-shrink-0 px-2"
                  >
                    <div
                        class="bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg shadow-lg cursor-pointer overflow-hidden"
                        @click="openModal(job)"
                    >
                      <!-- Image at the top - reduced size -->
                      <div class="w-full h-24 overflow-hidden">
                        <img
                            :src="job.logo"
                            :alt="job.company"
                            class="w-full h-full object-contain p-2 bg-gray-800/50"
                        />
                      </div>

                      <!-- Content below image -->
                      <div class="p-4">
                        <!-- Position -->
                        <h3 class="text-lg font-medium text-blue-100 mb-1 text-center">
                          {{ job.position }}
                        </h3>

                        <!-- Period -->
                        <p class="text-sm text-gray-400 mb-2 text-center">
                          {{ job.period }}
                        </p>

                        <!-- Company -->
                        <h4 class="text-base text-gray-300 mb-3 text-center">
                          {{ job.company }}
                        </h4>

                        <!-- Responsibilities summary - text-justified -->
                        <p class="text-sm text-gray-400 mb-3 text-justify">
                          {{ job.responsibilities.slice(0, 2).join(" ") }}...
                        </p>

                        <!-- View details button -->
                        <div class="text-center">
                          <button class="inline-flex items-center text-sm text-blue-400 hover:text-blue-300">
                            View details
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Navigation buttons for mobile -->
              <div class="flex justify-between mt-3 mx-auto max-w-xs">
                <button
                    @click="prevSlide"
                    class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentSlide === 0"
                    aria-label="Previous experience"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button
                    @click="nextSlide"
                    class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10 disabled:opacity-50 disabled:cursor-not-allowed"
                    :disabled="currentSlide === jobs.length - 1"
                    aria-label="Next experience"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <!-- Dots navigation -->
              <div class="flex justify-center mt-4 space-x-2">
                <button
                    v-for="(_, index) in jobs"
                    :key="index"
                    @click="goToSlide(index)"
                    class="w-2 h-2 rounded-full transition-all focus:outline-none"
                    :class="
                    currentSlide === index
                      ? 'bg-blue-500 scale-125'
                      : 'bg-gray-600 hover:bg-gray-500'
                  "
                    :aria-label="`Go to experience ${index + 1}`"
                ></button>
              </div>
            </div>
          </div>

          <!-- Desktop Grid View -->
          <div class="hidden md:block max-w-5xl mx-auto">
            <!-- Top row -->
            <div
                class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8"
                :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
                style="transition-delay: 200ms;"
            >
              <ExperienceCard
                  v-for="jobId in topRowJobIds"
                  :key="jobId"
                  :job="jobs[jobId]"
                  @click="openModal(jobs[jobId])"
              />
            </div>

            <!-- Bottom row -->
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:px-[20%]"
                :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
                style="transition-delay: 400ms;"
            >
              <ExperienceCard
                  v-for="jobId in bottomRowJobIds"
                  :key="jobId"
                  :job="jobs[jobId]"
                  @click="openModal(jobs[jobId])"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <JobModal v-if="selectedJob" :job="selectedJob" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import ExperienceCard from "../ExperienceCard.vue";
import JobModal from "../JobModal.vue";
import innovaccerImage from "../../assets/images/companies/innovaccer.jpg";
import appknoxImage from "../../assets/images/companies/appknox.jpg";
import thoughts2binaryImage from "../../assets/images/companies/thoughts2binary.jpg";
import barytechImage from "../../assets/images/companies/barytech.jpg";
import yoyobooksImage from "../../assets/images/companies/yoyobooks.jpg";

interface Job {
  company: string;
  position: string;
  period: string;
  shortPeriod: string;
  year: string;
  logo: string;
  responsibilities: string[];
  url: string;
}

// Job data
const jobs: Job[] = [
  {
    company: "Xysec Labs Private Limited",
    position: "Software Development Engineer",
    period: "February 2025 - Present",
    shortPeriod: "Feb '25 - Present",
    year: "2025",
    logo: appknoxImage,
    responsibilities: [
      "Developing and maintaining secure software applications",
      "Implementing robust security features and protocols",
      "Collaborating with security researchers and analysts",
      "Conducting code reviews and security audits",
      "Optimizing application performance and security",
    ],
    url: "https://www.appknox.com",
  },
  {
    company: "Barycenter Technologies Private Limited",
    position: "Senior Software Engineer",
    period: "May 2024 - January 2025",
    shortPeriod: "May '24 - Jan '25",
    year: "2024",
    logo: barytechImage,
    responsibilities: [
      "Led development of microservices-based applications",
      "Designed and implemented scalable system architecture",
      "Mentored junior developers and conducted code reviews",
      "Optimized database queries and application performance",
      "Integrated third-party APIs and services",
    ],
    url: "https://eino.world/en_gb/",
  },
  {
    company: "Innovaccer Analytics Private Limited",
    position: "Software Development Engineer",
    period: "December 2021 - September 2022",
    shortPeriod: "Dec '21 - Sep '22",
    year: "2021",
    logo: innovaccerImage,
    responsibilities: [
      "Developed healthcare data analytics solutions",
      "Implemented ETL pipelines for processing large datasets",
      "Created RESTful APIs for data access and integration",
      "Collaborated with data scientists to implement ML models",
      "Optimized database queries for improved performance",
    ],
    url: "https://innovaccer.com",
  },
  {
    company: "Thoughts2Binary Consulting LLP",
    position: "Associate Software Developer",
    period: "November 2019 - December 2021",
    shortPeriod: "Nov '19 - Dec '21",
    year: "2019",
    logo: thoughts2binaryImage,
    responsibilities: [
      "Developed web applications using React and Node.js",
      "Created and maintained RESTful APIs",
      "Designed and implemented database schemas",
      "Integrated payment gateways and third-party services",
      "Deployed applications to cloud environments",
    ],
    url: "https://thoughts2binary.com",
  },
  {
    company: "YoYo Books India LLP",
    position: "CTO, Full Stack Developer",
    period: "November 2016 - September 2018",
    shortPeriod: "Nov '16 - Sep '18",
    year: "2016",
    logo: yoyobooksImage,
    responsibilities: [
      "Led technical strategy and development for digital publishing platform",
      "Architected and developed full-stack web applications",
      "Managed development team and provided technical leadership",
      "Implemented e-commerce and content management systems",
      "Ensured scalability, security, and performance of platforms",
    ],
    url: "https://yoyobooks.in",
  },
];

// Computed values for job indexes
const topRowJobIds = computed(() => [0, 2, 4]); // X, I, Y
const bottomRowJobIds = computed(() => [1, 3]); // B, T

// State
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const sliderContainer = ref<HTMLElement | null>(null);
const selectedJob = ref<Job | null>(null);
const currentSlide = ref(0);

// Methods
const openModal = (job: Job) => {
  selectedJob.value = job;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedJob.value = null;
  document.body.style.overflow = "";
};

// Slider navigation
const nextSlide = () => {
  if (currentSlide.value < jobs.length - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
  resetAutoplayTimer();
};

// Autoplay functionality
let autoplayInterval: number | null = null;
const autoplayDelay = 6000; // 6 seconds
const isPaused = ref(false);

const startAutoplay = () => {
  if (autoplayInterval) return;

  autoplayInterval = window.setInterval(() => {
    if (!isPaused.value) {
      if (currentSlide.value < jobs.length - 1) {
        currentSlide.value++;
      } else {
        currentSlide.value = 0;
      }
    }
  }, autoplayDelay);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

const resetAutoplayTimer = () => {
  stopAutoplay();
  startAutoplay();
};

// Pause autoplay when user interacts with the slider
const pauseAutoplay = () => {
  isPaused.value = true;
};

const resumeAutoplay = () => {
  isPaused.value = false;
};

// Event handlers
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && selectedJob.value) {
    closeModal();
  }
};

// Lifecycle
onMounted(() => {
  const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.value = true;
          startAutoplay();
        } else {
          stopAutoplay();
        }
      },
      { threshold: 0.1 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  // Set up slider interaction events
  if (sliderContainer.value) {
    sliderContainer.value.addEventListener('mouseenter', pauseAutoplay);
    sliderContainer.value.addEventListener('mouseleave', resumeAutoplay);
    sliderContainer.value.addEventListener('touchstart', pauseAutoplay);
    sliderContainer.value.addEventListener('touchend', resumeAutoplay);
  }

  window.addEventListener("keydown", handleKeyDown);

  onUnmounted(() => {
    observer.disconnect();
    stopAutoplay();
    window.removeEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "";

    // Remove event listeners
    if (sliderContainer.value) {
      sliderContainer.value.removeEventListener('mouseenter', pauseAutoplay);
      sliderContainer.value.removeEventListener('mouseleave', resumeAutoplay);
      sliderContainer.value.removeEventListener('touchstart', pauseAutoplay);
      sliderContainer.value.removeEventListener('touchend', resumeAutoplay);
    }
  });
});
</script>

<style scoped>
/* Add these responsive styles */
.section {
  @apply min-h-[calc(100vh-4rem)] md:min-h-screen;
}
</style>