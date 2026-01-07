<template>
  <Analytics />
  <SpeedInsights />
  <ThemeGlobalComponents />
  <main class="relative min-h-screen z-10">
    <Navigation />

    <div class="w-full">
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
import { ref, onMounted, onUnmounted } from 'vue';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Lenis from 'lenis';
import Navigation from './components/Navigation.vue';
import HeroSection from './components/sections/HeroSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import ImpactSection from './components/sections/ImpactSection.vue';
import EducationSection from './components/sections/EducationSection.vue';
import ArticlesSection from './components/sections/ArticlesSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';
import ThemeGlobalComponents from './components/ThemeGlobalComponents.vue';
import { useTheme } from './composables/useTheme';

useTheme(); // Initialize theme

const buttonAnimated = ref(false);
let lenis: Lenis | null = null;

onMounted(() => {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Handle anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLElement).getAttribute('href');
      if (targetId && targetId !== '#') {
        lenis?.scrollTo(targetId, {
          duration: 1.5,
        });
      }
    });
  });
});

onUnmounted(() => {
  lenis?.destroy();
});
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
