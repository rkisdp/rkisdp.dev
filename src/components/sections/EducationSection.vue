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
              <div class="flex items-start space-x-4">
                <div class="logo-container">
                  <img 
                    :src="item.logo" 
                    :alt="item.institution"
                    class="institution-logo"
                  />
                </div>
                <div class="flex-1">
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
  logo: string;
}

const educationItems: EducationItem[] = [
  {
    degree: 'MSc - Business Analytics in Finance',
    institution: 'University of Southampton',
    period: '2022-2023',
    logo: 'https://media.licdn.com/dms/image/v2/C4E0BAQEOlU_74GJ2lA/company-logo_200_200/company-logo_200_200/0/1663657402449?e=1748476800&v=beta&t=hJzwK7Yfa8vYflUijOvUtge30b2D_Vnsqn9ITIqGP00'
  },
  {
    degree: 'BCom(Hons.) Finance',
    institution: 'Banaras Hindu University',
    period: '2015-2018',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHBI-8DAUffpg/company-logo_200_200/company-logo_200_200/0/1689927104926/sos_banaras_logo?e=1748476800&v=beta&t=dui1qVyDZpI8_hNOAReHyfo03XaUJvvjGQ1xT_k_QY4'
  },
  {
    degree: 'UG Diploma in Computer Applications',
    institution: 'Banaras Hindu University',
    period: '2015-2018',
    logo: 'https://media.licdn.com/dms/image/v2/D4D0BAQHBI-8DAUffpg/company-logo_200_200/company-logo_200_200/0/1689927104926/sos_banaras_logo?e=1748476800&v=beta&t=dui1qVyDZpI8_hNOAReHyfo03XaUJvvjGQ1xT_k_QY4'
  },
  {
    degree: 'Class 12th',
    institution: 'DAV Public School (CBSE)',
    period: '2014',
    logo: 'https://media.licdn.com/dms/image/v2/C560BAQEIhQoVEY4lIA/company-logo_200_200/company-logo_200_200/0/1630603646622?e=1748476800&v=beta&t=u3lgyqhq75i0d3OjQv3bD-_p90uQjiBXb5O2LvJcLf0'
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

.logo-container {
  @apply flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden bg-white/10;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.institution-logo {
  @apply w-full h-full object-contain p-1;
}
</style>
