<template>
  <Analytics />
  <SpeedInsights />
  <ThemeGlobalComponents />
  <Background />
  <main class="relative min-h-screen z-10">
    <Navigation />

    <div class="w-full">
      <HeroSection />
      <ImpactSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ArticlesSection />
      <TestimonialsSection />
      <ContactSection />
    </div>

    <!-- Floating Action Buttons -->
    <div class="fixed bottom-6 right-3 sm:right-6 z-50 flex flex-row items-center gap-[10px]">
      <a
        href="https://drive.google.com/file/d/1GAQD4yhAcxU8KQ29KPYeG_b-4C9zFYhR/view?usp=sharing"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 h-12 rounded-full shadow-lg transition-all duration-300 hover:shadow-blue-500/30 hover:translate-y-[-1px]"
        :class="{ 'animated': buttonAnimated }"
        @mouseover="buttonAnimated = true"
        @mouseleave="buttonAnimated = false"
      >
        <font-awesome-icon :icon="['fas', 'download']" size="sm" />
        <span class="hidden sm:inline text-sm sm:text-base">Download My Resume</span>
        <span class="sm:hidden text-sm">Resume</span>
      </a>
      <ChatButton />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { Analytics } from '@vercel/analytics/vue';
import { SpeedInsights } from '@vercel/speed-insights/vue';
import Lenis from 'lenis';
import Navigation from './components/Navigation.vue';
import Background from './components/Background.vue';
import HeroSection from './components/sections/HeroSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import ImpactSection from './components/sections/ImpactSection.vue';
import EducationSection from './components/sections/EducationSection.vue';
import ArticlesSection from './components/sections/ArticlesSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ContactSection from './components/sections/ContactSection.vue';
import ThemeGlobalComponents from './components/ThemeGlobalComponents.vue';
import ChatButton from './components/ChatButton.vue';
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

  /**
   * Recursive function to update the Lenis scroll instance on each animation frame.
   * @param time - The current timestamp.
   */
  function raf(time: number) {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  /**
   * Intercepts anchor link clicks to provide smooth scrolling using Lenis.
   * Handles both pure anchors (#) and relative anchors (/#).
   * @param e - The click event.
   */
  const handleAnchorClick = (e: Event) => {
    const anchor = e.currentTarget as HTMLAnchorElement;
    const href = anchor.getAttribute('href');
    if (href && href.includes('#')) {
      e.preventDefault();
      const targetId = '#' + href.split('#')[1];
      if (targetId !== '#') {
        const isMobile = window.innerWidth < 768;
        lenis?.scrollTo(targetId, {
          duration: 1.5,
          offset: isMobile ? -50 : -10,
        });
      }
    }
  };

  document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });

  onUnmounted(() => {
    lenis?.destroy();
    document.querySelectorAll('a[href^="#"], a[href^="/#"]').forEach(anchor => {
      anchor.removeEventListener('click', handleAnchorClick);
    });
  });
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
