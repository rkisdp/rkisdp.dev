<template>
  <section
    ref="sectionRef"
    id="contact"
    class="section relative overflow-hidden flex flex-col pt-20 md:pt-0"
  >
    <!-- Background particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-down"
        style="
          top: 80%;
          left: 80%;
          background-color: rgba(0, 100, 200, 0.02);
          opacity: 0.2;
          animation-duration: 22s;
        "
      ></div>
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-right"
        style="
          top: 60%;
          left: 15%;
          background-color: rgba(0, 80, 180, 0.03);
          opacity: 0.3;
          animation-duration: 24s;
        "
      ></div>
    </div>

    <div class="flex-grow flex items-center justify-center py-4 md:py-0">
      <div class="container-custom max-w-4xl px-4 md:px-0">
        <div
          class="text-center mb-2 md:mb-10"
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-xl md:text-4xl mb-1 md:mb-4 text-gray-200">
            Get In Touch
          </h2>
          <p class="text-sm md:text-lg text-gray-300/90 mb-2 md:mb-10">
            I'm always open to discussing new projects, opportunities, and
            collaborations.
          </p>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-8 mb-2 md:mb-0"
        >
          <div
            class="contact-card"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.1s',
            }"
          >
            <h3 class="text-lg md:text-xl mb-1 md:mb-2 text-gray-200">Email</h3>
            <p class="text-sm md:text-base text-gray-400 mb-3 md:mb-4">
              Drop me an email
            </p>
            <a
              href="mailto:connect@rkisdp.dev"
              class="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
            >
              <font-awesome-icon :icon="['fas', 'envelope']" />
              <span>connect@rkisdp.dev</span>
            </a>
          </div>

          <div
            class="contact-card"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.2s',
            }"
          >
            <h3 class="text-lg md:text-xl mb-1 md:mb-2 text-gray-200">
              LinkedIn
            </h3>
            <p class="text-sm md:text-base text-gray-400 mb-3 md:mb-4">
              Connect with me professionally
            </p>
            <a
              href="https://www.linkedin.com/in/rkisdp/"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
            >
              <font-awesome-icon :icon="['fab', 'linkedin']" />
              <span>rkisdp</span>
            </a>
          </div>

          <div
            class="contact-card"
            :style="{
              opacity: isVisible ? 1 : 0,
              transform: `translateY(${isVisible ? 0 : 30}px)`,
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
              transitionDelay: '0.3s',
            }"
          >
            <h3 class="text-lg md:text-xl mb-1 md:mb-2 text-gray-200">
              GitHub
            </h3>
            <p class="text-sm md:text-base text-gray-400 mb-3 md:mb-4">
              Check out my code and projects
            </p>
            <a
              href="https://github.com/rkisdp"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
            >
              <font-awesome-icon :icon="['fab', 'github']" />
              <span>rkisdp</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer
      class="mt-auto pb-2 md:pb-6 pt-2 md:pt-10 w-full text-center"
      :style="{
        opacity: isVisible ? 1 : 0,
        transform: `translateY(${isVisible ? 0 : 20}px)`,
        transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        transitionDelay: '0.3s',
      }"
    >
      <div class="flex justify-center space-x-3 md:space-x-6 mb-2 md:mb-4">
        <a
          href="mailto:connect@rkisdp.dev"
          class="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Email"
        >
          <font-awesome-icon :icon="['fas', 'envelope']" size="lg" />
        </a>
        <a
          href="https://github.com/rkisdp"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Github"
        >
          <font-awesome-icon :icon="['fab', 'github']" size="lg" />
        </a>
        <a
          href="https://www.linkedin.com/in/rkisdp/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="LinkedIn"
        >
          <font-awesome-icon :icon="['fab', 'linkedin']" size="lg" />
        </a>
        <a
          href="https://medium.com/@rkisdp"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Medium"
        >
          <font-awesome-icon :icon="['fab', 'medium']" size="lg" />
        </a>
        <a
          href="https://stackoverflow.com/users/11983208/divya-prakash"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-400 hover:text-blue-400 transition-colors"
          aria-label="Stack Overflow"
        >
          <font-awesome-icon :icon="['fab', 'stack-overflow']" size="lg" />
        </a>
      </div>
      <p class="text-gray-500 text-sm">2025 @ NO Copyright Reserved; Divya Prakash</p>
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

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
      rootMargin: "0px",
      threshold: 0.2,
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
.contact-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-2 md:p-6 shadow-lg;
  height: 100%;
}
</style>
