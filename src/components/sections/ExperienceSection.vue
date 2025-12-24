<template>
  <section
    ref="sectionRef"
    id="experience"
    class="section relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
    </div>

    <div class="container-custom relative z-10">
      <div
        class="text-center mb-12"
        :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        style="transition: all 0.8s ease-out;"
      >
        <h2 class="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-primary mb-4 tracking-tight">
          Experience
        </h2>
        <p class="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
          A dual-stream journey through my career milestones.
        </p>
      </div>

      <!-- Desktop View (Horizontal Scroll) -->
      <div 
        class="hidden md:block relative w-full overflow-x-auto pb-8 hide-scrollbar cursor-grab active:cursor-grabbing"
        ref="scrollContainer"
        @mousedown="startDrag"
        @mouseleave="stopDrag"
        @mouseup="stopDrag"
        @mousemove="drag"
      >
        <div class="flex flex-col gap-12 min-w-max px-4 md:px-10 py-4">
          
          <!-- Upper Row -->
          <div class="flex gap-6 md:gap-8">
            <div
              v-for="(job, index) in upperJobs"
              :key="`upper-${index}`"
              class="relative group w-[340px]"
              :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
              :style="{ transitionDelay: `${index * 100}ms`, transitionDuration: '0.8s' }"
            >

              <!-- Card -->
              <div 
                class="w-full bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] cursor-pointer relative overflow-hidden"
                @click="openModal(job)"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div class="relative z-10">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-20 h-20 rounded-lg bg-white/5 p-2.5 border border-white/10 flex items-center justify-center shrink-0">
                      <img v-if="job.logo" :src="job.logo" :alt="job.company" class="w-full h-full object-contain rounded" />
                      <font-awesome-icon v-else :icon="['fas', 'briefcase']" class="text-primary text-2xl" />
                    </div>
                    <div class="min-w-0">
                      <h3 class="text-lg font-bold text-white group-hover:text-primary transition-colors truncate" :title="job.position">{{ job.position }}</h3>
                      <h4 class="text-sm text-gray-400 truncate">{{ job.company }}</h4>
                    </div>
                  </div>

                  <div class="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-primary/80 mb-4">
                    {{ job.shortPeriod }}
                  </div>

                  <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {{ job.responsibilities[0] }}
                  </p>

                  <div class="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          <!-- Lower Row -->
          <div class="flex gap-6 md:gap-8">
            <div
              v-for="(job, index) in lowerJobs"
              :key="`lower-${index}`"
              class="relative group w-[340px]"
              :class="{'opacity-0 -translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
              :style="{ transitionDelay: `${(index + 3) * 100}ms`, transitionDuration: '0.8s' }"
            >

              <!-- Card -->
              <div 
                class="w-full bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] cursor-pointer relative overflow-hidden"
                @click="openModal(job)"
              >
                <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div class="relative z-10">
                  <div class="flex items-center gap-4 mb-4">
                    <div class="w-20 h-20 rounded-lg bg-white/5 p-2.5 border border-white/10 flex items-center justify-center shrink-0">
                      <img v-if="job.logo" :src="job.logo" :alt="job.company" class="w-full h-full object-contain rounded" />
                      <font-awesome-icon v-else :icon="['fas', 'briefcase']" class="text-cyan-400 text-2xl" />
                    </div>
                    <div class="min-w-0">
                      <h3 class="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors truncate" :title="job.position">{{ job.position }}</h3>
                      <h4 class="text-sm text-gray-400 truncate">{{ job.company }}</h4>
                    </div>
                  </div>

                  <div class="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-400/80 mb-4">
                    {{ job.shortPeriod }}
                  </div>

                  <p class="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                    {{ job.responsibilities[0] }}
                  </p>

                  <div class="flex items-center gap-1.5 text-xs text-accent font-bold uppercase tracking-wider group-hover:gap-2 transition-all">
                    <span>Explore</span>
                    <font-awesome-icon :icon="['fas', 'arrow-right']" />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      <!-- Mobile View (Vertical Timeline) -->
      <div class="md:hidden relative px-4 pb-8">
        <!-- Vertical Line -->
        <div class="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-cyan-400/50 to-transparent"></div>

        <div class="flex flex-col gap-8">
          <div 
            v-for="(job, index) in jobs" 
            :key="`mobile-${index}`"
            class="relative pl-12"
            :class="{'opacity-0 translate-x-8': !isVisible, 'opacity-100 translate-x-0': isVisible}"
            :style="{ transitionDelay: `${index * 100}ms`, transitionDuration: '0.6s' }"
          >
            <!-- Timeline Dot -->
            <div class="absolute left-[11px] top-6 w-3 h-3 rounded-full bg-background border-2 border-primary z-10 shadow-[0_0_10px_rgba(0,212,255,0.5)]"></div>

            <!-- Card -->
            <div 
              class="w-full bg-[#111827]/80 backdrop-blur-sm border border-white/5 rounded-xl p-6 active:scale-[0.98] transition-all duration-200 cursor-pointer relative overflow-hidden"
              @click="openModal(job)"
            >
              <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>

              <div class="relative z-10">
                <div class="flex items-center gap-4 mb-4">
                  <div class="w-20 h-20 rounded-lg bg-white/5 p-2.5 border border-white/10 flex items-center justify-center shrink-0">
                    <img v-if="job.logo" :src="job.logo" :alt="job.company" class="w-full h-full object-contain rounded" />
                    <font-awesome-icon v-else :icon="['fas', 'briefcase']" class="text-primary text-2xl" />
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-xl font-bold text-white mb-1">{{ job.position }}</h3>
                    <h4 class="text-base text-gray-400">{{ job.company }}</h4>
                  </div>
                </div>

                <div class="inline-block px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-primary/80 mb-4">
                  {{ job.shortPeriod }}
                </div>

                <div class="flex items-center gap-2 text-sm text-accent font-bold uppercase tracking-wider">
                  <span>View Details</span>
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <JobModal v-if="selectedJob" :job="selectedJob" @close="closeModal" />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import JobModal from "../JobModal.vue";
import innovaccerImage from "../../assets/images/companies/innovaccer.jpg";
import appknoxImage from "../../assets/images/companies/appknox.jpg";
import thoughts2binaryImage from "../../assets/images/companies/thoughts2binary.jpg";
import barytechImage from "../../assets/images/companies/barytech.jpg";
import yoyobooksImage from "../../assets/images/companies/yoyobooks.jpg";

interface Job {
  company: string;
  position: string;
  period: string;
  shortPeriod: string;
  year: string;
  logo: string;
  responsibilities: string[];
  url: string;
}

// Job data
const jobs: Job[] = [
  {
    company: "Xysec Labs Private Limited",
    position: "Software Development Engineer",
    period: "February 2025 - Present",
    shortPeriod: "Feb '25 - Present",
    year: "2025",
    logo: appknoxImage,
    responsibilities: [
      "Developing and maintaining secure software applications",
      "Implementing robust security features and protocols",
      "Collaborating with security researchers and analysts",
      "Conducting code reviews and security audits",
      "Optimizing application performance and security",
    ],
    url: "https://www.appknox.com",
  },
  {
    company: "Barycenter Technologies Private Limited",
    position: "Senior Software Engineer",
    period: "May 2024 - January 2025",
    shortPeriod: "May '24 - Jan '25",
    year: "2024",
    logo: barytechImage,
    responsibilities: [
      "Led development of microservices-based applications",
      "Designed and implemented scalable system architecture",
      "Mentored junior developers and conducted code reviews",
      "Optimized database queries and application performance",
      "Integrated third-party APIs and services",
    ],
    url: "https://eino.world/en_gb/",
  },
  {
    company: "Innovaccer Analytics Private Limited",
    position: "Software Development Engineer",
    period: "December 2021 - September 2022",
    shortPeriod: "Dec '21 - Sep '22",
    year: "2021",
    logo: innovaccerImage,
    responsibilities: [
      "Developed healthcare data analytics solutions",
      "Implemented ETL pipelines for processing large datasets",
      "Created RESTful APIs for data access and integration",
      "Collaborated with data scientists to implement ML models",
      "Optimized database queries for improved performance",
    ],
    url: "https://innovaccer.com",
  },
  {
    company: "Thoughts2Binary Consulting LLP",
    position: "Associate Software Developer",
    period: "November 2019 - December 2021",
    shortPeriod: "Nov '19 - Dec '21",
    year: "2019",
    logo: thoughts2binaryImage,
    responsibilities: [
      "Developed web applications using React and Node.js",
      "Created and maintained RESTful APIs",
      "Designed and implemented database schemas",
      "Integrated payment gateways and third-party services",
      "Deployed applications to cloud environments",
    ],
    url: "https://thoughts2binary.com",
  },
  {
    company: "YoYo Books India LLP",
    position: "CTO, Full Stack Developer",
    period: "November 2016 - September 2018",
    shortPeriod: "Nov '16 - Sep '18",
    year: "2016",
    logo: yoyobooksImage,
    responsibilities: [
      "Led technical strategy and development for digital publishing platform",
      "Architected and developed full-stack web applications",
      "Managed development team and provided technical leadership",
      "Implemented e-commerce and content management systems",
      "Ensured scalability, security, and performance of platforms",
    ],
    url: "https://yoyobooks.in",
  },
  {
    company: "Freelance",
    position: "Full Stack Developer",
    period: "September 2018 - November 2019",
    shortPeriod: "Sep '18 - Nov '19",
    year: "2018",
    logo: "", // Placeholder or generic icon
    responsibilities: [
      "Developed custom web solutions for various clients",
      "Managed full project lifecycle from requirements to deployment",
      "Specialized in Vue.js and Node.js development",
    ],
    url: "#",
  }
];

// Computed properties for layout
const upperJobs = computed(() => jobs.slice(0, 3));
const lowerJobs = computed(() => jobs.slice(3));

// State
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const selectedJob = ref<Job | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);

// Drag to scroll logic
let isDown = false;
let startX: number;
let scrollLeft: number;

const startDrag = (e: MouseEvent) => {
  if (!scrollContainer.value) return;
  isDown = true;
  scrollContainer.value.classList.add('active');
  startX = e.pageX - scrollContainer.value.offsetLeft;
  scrollLeft = scrollContainer.value.scrollLeft;
};

const stopDrag = () => {
  isDown = false;
  if (scrollContainer.value) {
    scrollContainer.value.classList.remove('active');
  }
};

const drag = (e: MouseEvent) => {
  if (!isDown || !scrollContainer.value) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.value.offsetLeft;
  const walk = (x - startX) * 2; // Scroll-fast
  scrollContainer.value.scrollLeft = scrollLeft - walk;
};

// Methods
const openModal = (job: Job) => {
  selectedJob.value = job;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedJob.value = null;
  document.body.style.overflow = "";
};

// Lifecycle
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.1 }
  );

  if (sectionRef.value) {
    observer.observe(sectionRef.value);
  }

  onUnmounted(() => {
    observer.disconnect();
    document.body.style.overflow = "";
  });
});
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>