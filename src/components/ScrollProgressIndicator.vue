<template>
  <div class="fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-1">
    <button
      v-for="section in sections"
      :key="section.id"
      @click="scrollToSection(section.id)"
      class="group flex items-center gap-2 cursor-pointer bg-transparent border-0 p-0"
      :aria-label="`Go to ${section.label}`"
    >
      <span
        class="text-xs font-medium whitespace-nowrap transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 text-white/60"
      >
        {{ section.label }}
      </span>
      <span
        class="block h-[2px] rounded-full transition-all duration-300"
        :class="activeSection === section.id
          ? 'w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]'
          : 'w-5 bg-white/25 group-hover:w-6 group-hover:bg-white/55'"
      />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useLenis } from '../composables/useLenis';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'hero',         label: 'Home' },
  { id: 'impact',       label: 'Highlights' },
  { id: 'skills',       label: 'Skills' },
  { id: 'experience',   label: 'Experience' },
  { id: 'education',    label: 'Education' },
  { id: 'articles',     label: 'Articles' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'contact',      label: 'Contact' },
];

const activeSection = ref('hero');
const { lenis } = useLenis();

const scrollToSection = (id: string) => {
  const isMobile = window.innerWidth < 768;
  if (id === 'hero') {
    lenis.value?.scrollTo(0, { duration: 1.5 });
  } else {
    lenis.value?.scrollTo(`#${id}`, {
      duration: 1.5,
      offset: isMobile ? -50 : -10,
    });
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id;
        }
      });
    },
    { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
  );

  sections.forEach(({ id }) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  onUnmounted(() => observer.disconnect());
});
</script>
