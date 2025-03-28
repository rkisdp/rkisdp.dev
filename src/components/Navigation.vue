<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 p-4 bg-background/20 backdrop-blur-sm border-b border-white/5"
  >
    <div class="flex items-center justify-between mx-auto max-w-[90%]">
      <div class="flex-shrink-0">
        <a href="/" class="text-2xl font-bold text-primary">DP</a>
      </div>

      <button
        class="md:hidden text-2xl text-primary"
        @click="toggleMobileMenu"
        aria-label="Toggle menu"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>

      <ul class="hidden md:flex items-center space-x-10">
        <li
          v-for="item in navItems"
          :key="item.name"
          :class="['relative', { active: activeSection === item.href }]"
        >
          <a
            :href="item.href"
            class="text-primary/90 hover:text-primary transition-colors py-2"
          >
            {{ item.name }}
          </a>
          <div
            v-if="activeSection === item.href"
            class="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"
          ></div>
        </li>
        <div class="ml-4 flex items-center space-x-3">
          <a
            href="https://www.linkedin.com/in/rkisdp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="text-primary/90 hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
          </a>
          <a
            href="https://github.com/rkisdp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="text-primary/90 hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
          </a>
        </div>
      </ul>

      <!-- Mobile menu -->
      <ul
        v-if="mobileMenuOpen"
        class="absolute top-full left-0 w-full bg-background/95 backdrop-blur-md p-4 flex flex-col space-y-4 border-b border-white/5 md:hidden"
      >
        <li
          v-for="item in navItems"
          :key="item.name"
          :class="{ active: activeSection === item.href }"
        >
          <a
            :href="item.href"
            class="text-primary/90 hover:text-primary transition-colors"
            @click="closeMobileMenu"
          >
            {{ item.name }}
          </a>
        </li>
        <div class="flex items-center space-x-3 pt-2">
          <a
            href="https://www.linkedin.com/in/rkisdp/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="text-primary/90 hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
          </a>
          <a
            href="https://github.com/rkisdp"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            class="text-primary/90 hover:text-primary transition-colors"
          >
            <font-awesome-icon :icon="['fab', 'github']" size="lg" />
          </a>
        </div>
      </ul>
    </div>
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

const handleScroll = () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

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
