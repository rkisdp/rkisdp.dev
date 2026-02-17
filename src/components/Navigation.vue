<template>
  <nav
    class="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl rounded-full border border-white/10 bg-background/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-300"
    :class="{ 'py-2': isScrolled, 'py-4': !isScrolled }"
  >
    <div class="flex items-center justify-between px-6">
      <div class="flex-shrink-0">
        <a href="/" class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary font-mono hover:opacity-80 transition-opacity">
          DP
        </a>
      </div>

      <button
        class="md:hidden text-primary hover:text-accent transition-colors"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
      </button>

      <ul class="hidden md:flex items-center space-x-1">
        <li
          v-for="item in navItems"
          :key="item.name"
        >
          <a
            :href="item.href"
            class="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:text-white group"
            :class="activeSection === item.href ? 'text-white' : 'text-muted-foreground'"
          >
            {{ item.name }}
            <span 
              class="absolute inset-0 rounded-full bg-white/5 scale-0 transition-transform duration-300 group-hover:scale-100"
              :class="{ 'scale-100 bg-white/10': activeSection === item.href }"
            ></span>
          </a>
        </li>
      </ul>

      <div class="hidden md:flex items-center space-x-4 pl-4 border-l border-white/10">
        <a
          href="https://www.linkedin.com/in/rkisdp/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
        </a>
        <a
          href="https://github.com/rkisdp"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="text-muted-foreground hover:text-primary transition-colors transform hover:scale-110 duration-300"
        >
          <font-awesome-icon :icon="['fab', 'github']" size="lg" />
        </a>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="mobileMenuOpen"
        class="absolute top-full left-0 right-0 mt-2 mx-auto w-full bg-background/90 backdrop-blur-xl rounded-2xl border border-white/10 p-4 flex flex-col space-y-2 md:hidden shadow-2xl"
      >
        <a
          v-for="item in navItems"
          :key="item.name"
          :href="item.href"
          class="px-4 py-3 rounded-xl text-center transition-colors"
          :class="activeSection === item.href ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:bg-white/5 hover:text-white'"
          @click="closeMobileMenu"
        >
          {{ item.name }}
        </a>
        <div class="flex justify-center space-x-6 pt-4 border-t border-white/10">
          <a
            href="https://www.linkedin.com/in/rkisdp/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="xl" />
          </a>
          <a
            href="https://github.com/rkisdp"
            target="_blank"
            rel="noopener noreferrer"
            class="text-muted-foreground hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="xl" />
          </a>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Highlights", href: "/#impact" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Education", href: "/#education" },
  { name: "Articles", href: "/#articles" },
  { name: "Testimonials", href: "/#testimonials" },
  { name: "Contact", href: "/#contact" },
];

const activeSection = ref("");
const mobileMenuOpen = ref(false);
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
  
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 150;

  sections.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop;
    const sectionHeight = (section as HTMLElement).offsetHeight;
    const sectionId = section.getAttribute("id") || "";

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      activeSection.value = `#${sectionId}`;
    }
  });
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
