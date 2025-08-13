<template>
  <Analytics />
  <SpeedInsights />
  <main class="relative min-h-screen">
    <Navigation />

    <div class="snap-y snap-mandatory h-screen overflow-y-scroll">
      <HeroSection />
      <ImpactSection />
      <SkillsSection />
      <ExperienceSection />
      <ArticlesSection />
      <EducationSection />
      <TestimonialsSection />
      <ContactSection />
    </div>

    <!-- Floating Resume Button -->
    <div
      class="fixed bottom-6 right-3 sm:right-6 z-50"
      :class="{ 'animated': buttonAnimated }"
    >
      <a
          href="https://drive.google.com/file/d/1yihhxB9peXDNWzzC6uj0RaznEU76UV-9/view?usp=drive_link"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:translate-y-[-2px]"
          @mouseover="buttonAnimated = true"
          @mouseleave="buttonAnimated = false"
      >
        <font-awesome-icon :icon="['fas', 'download']" size="sm" />
        <span class="hidden sm:inline text-sm sm:text-base">Download My Resume</span>
        <span class="sm:hidden text-sm">Resume</span>
      </a>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Navigation from './components/Navigation.vue';
import HeroSection from './components/sections/HeroSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import ImpactSection from './components/sections/ImpactSection.vue';
import EducationSection from './components/sections/EducationSection.vue';
import ArticlesSection from './components/sections/ArticlesSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';

const buttonAnimated = ref(false);
</script>

<style scoped>
.animated {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
