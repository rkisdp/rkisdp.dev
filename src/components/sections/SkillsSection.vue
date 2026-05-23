<template>
  <section
    ref="sectionRef"
    id="skills"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute bottom-[-100px] right-[10%] w-[600px] h-[600px] rounded-full opacity-10 bg-secondary blur-[100px] -z-10"
    ></div>

    <div class="container-custom relative z-10">
      <div
        class="text-center mb-12 md:mb-20"
        :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        style="transition: all 0.8s ease-out;"
      >
        <h2 class="section-title mb-4">
          Skills
        </h2>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          Technologies and tools I use to bring ideas to life.
        </p>
      </div>

      <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="group relative"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 20}px)`,
            transition: `opacity 0.6s ease-out ${index * 50}ms, transform 0.6s ease-out ${index * 50}ms`,
          }"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div class="glass-card flex flex-col items-center justify-center p-3 md:p-6 h-full relative z-10 hover:-translate-y-2 transition-transform duration-300">
            <div class="w-10 h-10 md:w-16 md:h-16 mb-2 md:mb-4 flex items-center justify-center p-1.5 md:p-2 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
              <img
                :src="skill.image"
                :alt="skill.name"
                class="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
                :class="{ invert: skill.invert }"
                loading="lazy"
              />
            </div>
            <h3 class="text-xs md:text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center">{{ skill.name }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { skills } from "../../data/skills";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver";

const sectionRef = ref<HTMLElement | null>(null);
const { isVisible } = useIntersectionObserver(sectionRef);
</script>

