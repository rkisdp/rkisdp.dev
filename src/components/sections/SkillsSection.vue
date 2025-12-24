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
        class="text-center mb-16"
        :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        style="transition: all 0.8s ease-out;"
      >
        <h2 class="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary mb-4">
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
import { ref, onMounted, onUnmounted } from "vue";
import awsImage from "../../assets/images/skills/aws.png";
import kafkaImage from "../../assets/images/skills/kafka.png";

interface Skill {
  name: string;
  image: string;
  invert?: boolean;
}

const skills: Skill[] = [
  {
    name: "Python",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "Golang",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg",
  },
  {
    name: "Django",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
    invert: true,
  },
  {
    name: "Flask",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    invert: true,
  },
  {
    name: "FastAPI",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
  },
  {
    name: "MySQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original-wordmark.svg",
  },
  {
    name: "PostgreSQL",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Elasticsearch",
    image: "https://www.vectorlogo.zone/logos/elastic/elastic-icon.svg",
  },
  {
    name: "Redis",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Docker",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "AWS",
    image: awsImage,
  },
  {
    name: "Kafka",
    image: kafkaImage,
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

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>
