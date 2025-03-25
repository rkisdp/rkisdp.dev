<template>
  <section
    ref="sectionRef"
    id="education"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    />

    <div class="h-full w-full flex flex-col items-center justify-center pt-16 pb-8 md:py-0">
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <div
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-2xl md:text-4xl mb-6 md:mb-8 text-gray-200 text-center">
            Education
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
            <div
              v-for="(item, index) in educationItems"
              :key="index"
              class="education-card"
              :style="{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: `opacity 0.6s ease-out ${index * 150 + 100}ms, transform 0.6s ease-out ${index * 150 + 100}ms`,
              }"
            >
              <h3 class="text-lg md:text-xl text-blue-100 mb-2">{{ item.degree }}</h3>
              <div class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-2 text-gray-300 mb-2">
                <span class="text-sm md:text-base">{{ item.institution }}</span>
                <span class="hidden md:block text-gray-500">•</span>
                <span class="text-xs md:text-sm text-gray-400">{{ item.period }}</span>
              </div>
              <p v-if="item.description" class="text-gray-300/90 text-xs md:text-sm mt-2">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

const educationItems: EducationItem[] = [
  {
    degree: 'MSc - Business Analytics in Finance',
    institution: 'University of Southampton',
    period: '2022-2023',
  },
  {
    degree: 'BCom(Hons.) Finance',
    institution: 'Banaras Hindu University',
    period: '2015-2018',
  },
  {
    degree: 'UG Diploma in Computer Applications',
    institution: 'Banaras Hindu University',
    period: '2015-2018',
  },
  {
    degree: 'Class 12th',
    institution: 'DAV Public School (CBSE)',
    period: '2014',
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
.education-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-4 md:p-6 shadow-lg;
  height: 100%;
}
</style>
