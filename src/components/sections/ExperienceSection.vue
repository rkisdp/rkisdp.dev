<template>
  <section
    ref="sectionRef"
    id="experience"
    class="section relative overflow-hidden"
  >
    <!-- Decorative background element -->
    <div
      class="absolute top-[-100px] left-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
    />

    <div class="h-full w-full flex flex-col items-center justify-center pt-16 pb-8 md:py-0">
      <div class="w-[95%] md:w-[90%] max-w-[1200px] z-10 px-4 md:px-0">
        <div
          :style="{
            opacity: isVisible ? 1 : 0,
            transform: `translateY(${isVisible ? 0 : 30}px)`,
            transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
          }"
        >
          <h2 class="text-2xl md:text-4xl font-bold text-center text-gray-100 mb-12">
            Professional Experience
          </h2>

          <div class="max-w-5xl mx-auto">
            <!-- Top row -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
              <ExperienceCard 
                v-for="jobId in topRowJobIds" 
                :key="jobId"
                :job="jobs[jobId]"
                @click="openModal(jobs[jobId])"
              />
            </div>
            
            <!-- Bottom row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 md:px-[20%]">
              <ExperienceCard 
                v-for="jobId in bottomRowJobIds" 
                :key="jobId"
                :job="jobs[jobId]"
                @click="openModal(jobs[jobId])"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <JobModal 
      v-if="selectedJob" 
      :job="selectedJob" 
      @close="closeModal"
    />
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import ExperienceCard from '../ExperienceCard.vue';
import JobModal from '../JobModal.vue';
import innovaccerImage from '../../assets/innovaccer.jpg';
import appknoxImage from '../../assets/appknox.jpg';
import thoughts2binaryImage from '../../assets/thoughts2binary.jpg';
import barytechImage from '../../assets/barytech.jpg';
import yoyobooksImage from '../../assets/yo yo books.jpg';

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
      "Optimizing application performance and security"
    ],
    url: "https://www.appknox.com"
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
      "Deployed applications to cloud environments"
    ],
    url: "https://thoughts2binary.com"
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
      "Integrated third-party APIs and services"
    ],
    url: "https://eino.world/en_gb/"
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
      "Ensured scalability, security, and performance of platforms"
    ],
    url: "https://yoyobooks.in"
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
      "Optimized database queries for improved performance"
    ],
    url: "https://innovaccer.com"
  },
];

// Computed values for job indexes
const topRowJobIds = computed(() => [0, 2, 4]); // X, I, Y
const bottomRowJobIds = computed(() => [1, 3]); // B, T

// State
const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const selectedJob = ref<Job | null>(null);

// Methods
const openModal = (job: Job) => {
  selectedJob.value = job;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  selectedJob.value = null;
  document.body.style.overflow = '';
};

// Event handlers
const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && selectedJob.value) {
    closeModal();
  }
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

  window.addEventListener('keydown', handleKeyDown);

  onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('keydown', handleKeyDown);
    document.body.style.overflow = '';
  });
});
</script>

<style scoped>
/* No styles needed here as they're moved to the ExperienceCard component */
</style>
