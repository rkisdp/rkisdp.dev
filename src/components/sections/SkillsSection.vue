<template>
  <section
    ref="sectionRef"
    id="skills"
    class="section relative overflow-hidden pt-20 md:pt-0"
  >
    <!-- Decorative background element. -->
    <div
      class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    ></div>

    <div
      class="h-full w-full flex flex-col items-center justify-center py-4 md:py-0"
    >
      <div class="w-full md:w-[80%] max-w-[900px] z-10 px-2 md:px-0">
        <div
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2
            class="text-xl md:text-4xl mb-3 md:mb-8 text-gray-200 text-center"
          >
            Skills
          </h2>

          <div
            class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5 mx-auto w-full max-w-[340px] sm:max-w-none"
          >
            <div
              v-for="(skill, index) in skills"
              :key="index"
              class="skill-card"
              :style="{
                opacity: isVisible ? 1 : 0,
                transform: `translateY(${isVisible ? 0 : 20}px)`,
                transition: `opacity 0.6s ease-out ${
                  index * 100 + 100
                }ms, transform 0.6s ease-out ${index * 100 + 100}ms`,
              }"
            >
              <div
                class="flex justify-center items-center mb-1 md:mb-2 h-12 md:h-12"
              >
                <img
                  :src="skill.image"
                  :alt="skill.name"
                  class="h-8 w-8 md:h-10 md:w-10 object-contain"
                  :class="{ invert: skill.invert }"
                  loading="lazy"
                />
              </div>
              <h3 class="text-xs md:text-sm text-blue-100">{{ skill.name }}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import awsImage from "../../assets/images/skills/aws.png";

interface Skill {
  name: string;
  image: string;
  invert?: boolean;
}

const skills: Skill[] = [
  {
    name: "Python",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Golang",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Django",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    invert: true,
  },
  {
    name: "Flask",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    invert: true,
  },
  {
    name: "FastAPI",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "MySQL",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
  },
  {
    name: "PostgreSQL",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Elasticsearch",
    image: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg",
  },
  {
    name: "Redis",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    image: awsImage,
  },
  {
    name: "Kafka",
    image:
      "https://svn.apache.org/repos/asf/kafka/site/logos/originals/png/ICON%20-%20White%20on%20Transparent.png",
  },
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
      rootMargin: "0px",
      threshold: 0.1,
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
.skill-card {
  @apply bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-lg p-3 md:p-4 shadow-lg;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 110px;
}
</style>
