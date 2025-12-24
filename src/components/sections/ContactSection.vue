<template>
  <section
    ref="sectionRef"
    id="contact"
    class="section relative overflow-hidden flex flex-col !pb-0"
  >
    <!-- Background hills and winter scene removed from here -->

    <!-- Background particles -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute w-96 h-96 rounded-full blur-[120px] animate-pulse-glow"
        style="
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(112, 0, 255, 0.1);
        "
      ></div>
    </div>

    <div class="flex-grow flex items-center justify-center w-full z-10">
      <div class="container-custom max-w-5xl">
        <div
          class="text-center mb-16"
          :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
          style="transition: all 0.8s ease-out;"
        >
          <h2 class="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary mb-4">
            Get In Touch
          </h2>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, opportunities, and collaborations.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <!-- Email Card -->
          <a
            href="mailto:connect@rkisdp.dev"
            class="glass-card group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center p-3 md:p-6"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out 0.1s',
            }"
          >
            <div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-primary/20 transition-colors">
              <font-awesome-icon :icon="['fas', 'envelope']" class="text-lg md:text-2xl text-primary" />
            </div>
            <h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">Email</h3>
            <p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4">Drop me a line anytime</p>
            <span class="text-xs md:text-base text-primary font-medium group-hover:underline">connect@rkisdp.dev</span>
          </a>

          <!-- LinkedIn Card -->
          <a
            href="https://www.linkedin.com/in/rkisdp/"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center p-3 md:p-6"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out 0.2s',
            }"
          >
            <div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-blue-600/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-blue-600/20 transition-colors">
              <font-awesome-icon :icon="['fab', 'linkedin']" class="text-lg md:text-2xl text-blue-500" />
            </div>
            <h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">LinkedIn</h3>
            <p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4">Connect professionally</p>
            <span class="text-xs md:text-base text-blue-500 font-medium group-hover:underline">rkisdp</span>
          </a>

          <!-- GitHub Card -->
          <a
            href="https://github.com/rkisdp"
            target="_blank"
            rel="noopener noreferrer"
            class="glass-card group hover:-translate-y-2 transition-transform duration-300 flex flex-col items-center text-center p-3 md:p-6"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out 0.3s',
            }"
          >
            <div class="w-10 h-10 md:w-16 md:h-16 rounded-full bg-gray-700/10 flex items-center justify-center mb-3 md:mb-6 group-hover:bg-gray-700/20 transition-colors">
              <font-awesome-icon :icon="['fab', 'github']" class="text-lg md:text-2xl text-foreground" />
            </div>
            <h3 class="text-base md:text-xl font-bold text-foreground mb-1 md:mb-2">GitHub</h3>
            <p class="text-xs md:text-base text-muted-foreground mb-2 md:mb-4">Check out my code</p>
            <span class="text-xs md:text-base text-foreground font-medium group-hover:underline">rkisdp</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="w-full text-center pt-8 border-t border-white/5 bg-background/50 backdrop-blur-sm"
      :style="{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.8s ease-out 0.4s',
      }"
    >
      <div class="wrapper flex justify-center gap-4 mb-6">
        <a
          v-for="(social, index) in socials"
          :key="index"
          :href="social.url"
          target="_blank"
          rel="noopener noreferrer"
          class="button"
          :style="{ '--hover-color': social.color, '--hover-icon-color': social.hoverIconColor || '#ffffff' }"
        >
          <div class="icon">
            <font-awesome-icon :icon="social.icon" />
          </div>
          <span>{{ social.name }}</span>
        </a>
      </div>
      <p class="text-muted-foreground text-sm font-mono mt-10 mb-8">
        {{ new Date().getFullYear() }} Divya Prakash. No rights reserved. Feel free to copy.
      </p>
      
      <div v-if="getThemeComponent(THEME_COMPONENTS.WINTER_SCENE)" class="w-full overflow-hidden pointer-events-none">
        <component :is="getThemeComponent(THEME_COMPONENTS.WINTER_SCENE)?.component" />
      </div>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useTheme } from "../../composables/useTheme";
import { THEME_COMPONENTS } from "../../types/theme";

const { getThemeComponent } = useTheme();

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);

const socials = [
  { name: "Email", url: "mailto:connect@rkisdp.dev", icon: ['fas', 'envelope'], color: "#EA4335" },
  { name: "GitHub", url: "https://github.com/rkisdp", icon: ['fab', 'github'], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/rkisdp/", icon: ['fab', 'linkedin'], color: "#0077b5" },
  { name: "Medium", url: "https://medium.com/@rkisdp", icon: ['fab', 'medium'], color: "#ffffff", hoverIconColor: "#000000" },
  { name: "Stack Overflow", url: "https://stackoverflow.com/users/11983208/divya-prakash", icon: ['fab', 'stack-overflow'], color: "#f48024" },
];

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
      rootMargin: "0px",
      threshold: 0.2,
    }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
<style scoped>
.wrapper .button {
  display: inline-flex;
  align-items: center;
  height: 50px;
  width: 50px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.05);
  text-decoration: none;
}

.wrapper .button:hover {
  width: 180px;
}

.wrapper .button .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  transition: all 0.3s ease-out;
  flex-shrink: 0;
  color: #fff;
}

.wrapper .button:hover .icon {
  background: var(--hover-color);
  color: var(--hover-icon-color);
}

.wrapper .button .icon svg {
  font-size: 20px;
  line-height: 50px;
  transition: all 0.3s ease-out;
}

.wrapper .button span {
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  transition: all 0.3s ease-out;
  color: #fff;
  white-space: nowrap;
  opacity: 0;
}

.wrapper .button:hover span {
  opacity: 1;
  color: var(--hover-color);
}
</style>
