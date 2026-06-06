<template>
  <section
    ref="sectionRef"
    id="education"
    class="section relative overflow-hidden"
  >

    <div
      class="h-full w-full flex flex-col items-center justify-center"
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
            class="section-title mb-12 md:mb-20 text-center"
          >
            Education
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-10">
            <div
              v-for="(item, index) in educationItems"
              :key="index"
              class="h-full"
              :style="{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: `opacity 0.6s ease-out ${
                  index * 150 + 100
                }ms, transform 0.6s ease-out ${index * 150 + 100}ms`,
              }"
            >
              <div class="education-card">
                <div class="flex items-start space-x-3 md:space-x-4">
                  <div class="logo-container">
                    <img
                      :src="item.logo"
                      :alt="item.institution"
                      class="institution-logo"
                    />
                  </div>
                  <div class="flex-1">
                    <h3 class="text-base md:text-xl text-blue-100 mb-1 md:mb-2">
                      {{ item.degree }}
                    </h3>
                    <div
                      class="flex flex-col md:flex-row md:items-center space-y-0.5 md:space-y-0 md:space-x-2 text-gray-300 mb-1 md:mb-2"
                    >
                      <span class="text-xs md:text-base">{{
                        item.institution
                      }}</span>
                      <span class="hidden md:block text-gray-500">•</span>
                      <span class="text-xs text-gray-400">{{ item.period }}</span>
                    </div>
                    <p
                      v-if="item.description"
                      class="text-gray-300/90 text-xs md:text-sm mt-1 md:mt-2"
                    >
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver";
import uosImage from "../../assets/images/education/uos.jpeg";
import bhuImage from "../../assets/images/education/bhu.jpeg";
import davImage from "../../assets/images/education/dav.jpeg";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
  logo: string;
}

const educationItems: EducationItem[] = [
  {
    degree: "MSc - Business Analytics in Finance",
    institution: "University of Southampton",
    period: "2022-2023",
    logo: uosImage,
  },
  {
    degree: "BCom(Hons.) Finance",
    institution: "Banaras Hindu University",
    period: "2015-2018",
    logo: bhuImage,
  },
  {
    degree: "UG Diploma in Computer Applications",
    institution: "Banaras Hindu University",
    period: "2015-2018",
    logo: bhuImage,
  },
  {
    degree: "10+2",
    institution: "DAV Public School (CBSE)",
    period: "2014",
    logo: davImage,
  },
];

const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useIntersectionObserver(sectionRef, { threshold: 0.1 });

</script>

<style scoped>
.education-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-3 md:p-6 shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:-translate-y-2 relative overflow-hidden;
  height: 100%;
}

.education-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), transparent);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
  z-index: 0;
}

.education-card:hover::before {
  opacity: 1;
}

.education-card > * {
  position: relative;
  z-index: 10;
}

.logo-container {
  @apply flex-shrink-0 w-12 h-12 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-white/5 p-1.5 sm:p-2.5 border border-white/10 flex items-center justify-center;
}

.institution-logo {
  @apply w-full h-full object-contain rounded;
}
</style>
