<template>
  <section
    ref="sectionRef"
    id="testimonials"
    class="section relative overflow-hidden flex items-center min-h-screen"
  >
    <!-- Background particles -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-down"
        style="top: 65%; left: 15%; background-color: rgba(0, 100, 200, 0.02); opacity: 0.2; animation-duration: 25s;"
      ></div>
      <div
        class="absolute w-32 h-32 rounded-full blur-3xl animate-float-right"
        style="top: 25%; left: 70%; background-color: rgba(0, 80, 180, 0.03); opacity: 0.3; animation-duration: 28s;"
      ></div>
    </div>

    <div class="container-custom max-w-6xl mx-auto pt-16 md:pt-20 px-4 w-full">
      <div
        class="text-center mb-6 md:mb-12"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 30}px)`,
          transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
        }"
      >
        <h2 class="text-2xl md:text-4xl mb-3 md:mb-4 text-gray-200">Testimonials</h2>
        <p class="text-base md:text-lg text-gray-300/90 max-w-xl mx-auto">
          What others say about working with me
        </p>
      </div>

      <div
        class="relative mt-6 md:mt-12 md:pb-12"
        :style="{
          opacity: isVisible ? 1 : 0,
          transform: `translateY(${isVisible ? 0 : 40}px)`,
          transition: 'opacity 1s ease-out, transform 1s ease-out',
          transitionDelay: '0.2s'
        }"
      >
        <!-- Testimonial slider -->
        <div class="overflow-hidden rounded-lg">
          <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div
              v-for="(testimonial, index) in testimonials"
              :key="index"
              class="w-full flex-shrink-0 px-1 sm:px-2 md:px-4"
            >
              <div class="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-4 md:p-8 shadow-xl">
                <div class="flex flex-col sm:flex-row sm:items-center mb-4 md:mb-6">
                  <div class="h-16 w-16 rounded-full overflow-hidden mb-3 sm:mb-0 sm:mr-4 border-2 border-blue-500/50 mx-auto sm:mx-0">
                    <img :src="testimonial.image" :alt="testimonial.name" class="h-full w-full object-cover" />
                  </div>
                  <div class="text-center sm:text-left">
                    <h4 class="text-lg md:text-xl font-medium text-gray-200">{{ testimonial.name }}</h4>
                    <p class="text-sm md:text-base text-gray-400">{{ testimonial.designation }}</p>
                    <a 
                      :href="testimonial.linkedin" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-1"
                    >
                      <font-awesome-icon :icon="['fab', 'linkedin']" class="text-lg mr-1" />
                      <span class="text-sm">View Profile</span>
                    </a>
                  </div>
                </div>
                <div class="mb-3 md:mb-4 text-center sm:text-left">
                  <font-awesome-icon :icon="['fas', 'quote-left']" class="text-blue-500/50 text-xl md:text-3xl mr-2 opacity-50" />
                </div>
                <p class="text-gray-300 text-sm sm:text-base md:text-lg italic leading-relaxed line-clamp-6 sm:line-clamp-none">
                  {{ testimonial.text }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation buttons - outside card on mobile -->
        <div class="flex justify-between mt-4 mx-auto max-w-xs sm:hidden">
          <button
            @click="prevSlide"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
            :disabled="currentSlide === 0"
          >
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </button>

          <button
            @click="nextSlide"
            class="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 flex items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
            :class="{ 'opacity-50 cursor-not-allowed': currentSlide === testimonials.length - 1 }"
            :disabled="currentSlide === testimonials.length - 1"
          >
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </button>
        </div>

        <!-- Navigation buttons - on sides for larger screens -->
        <button
          @click="prevSlide"
          class="hidden sm:flex absolute left-0 top-1/2 transform -translate-y-1/2 translate-x-1 md:-translate-x-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === 0 }"
          :disabled="currentSlide === 0"
        >
          <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </button>

        <button
          @click="nextSlide"
          class="hidden sm:flex absolute right-0 top-1/2 transform -translate-y-1/2 -translate-x-1 md:translate-x-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-10 h-10 items-center justify-center focus:outline-none transition-all hover:scale-110 z-10"
          :class="{ 'opacity-50 cursor-not-allowed': currentSlide === testimonials.length - 1 }"
          :disabled="currentSlide === testimonials.length - 1"
        >
          <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </button>

        <!-- Dots navigation -->
        <div class="flex justify-center mt-4 md:mt-8 space-x-2">
          <button
            v-for="(_, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            class="w-2 h-2 md:w-3 md:h-3 rounded-full transition-all focus:outline-none"
            :class="currentSlide === index ? 'bg-blue-500 scale-125' : 'bg-gray-600 hover:bg-gray-500'"
            :aria-label="`Go to testimonial ${index + 1}`"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const isVisible = ref(false);
const sectionRef = ref<HTMLElement | null>(null);
const currentSlide = ref(0);

interface Testimonial {
  name: string;
  designation: string;
  image: string;
  text: string;
  linkedin: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Ravi Gupta",
    designation: "Region Head(EMEA) at Locobuzz",
    image: "https://media.licdn.com/dms/image/v2/D5603AQH1MHqfYxFdZg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1725454599871?e=1748476800&v=beta&t=Kb5jwbk5YekGVP48oBaGHPhT9hHOGFzYxVl77fqxUsM",
    text: "I have directly worked with Divya Prakash and found him to a fantastic and enthusiastic as person. I would really appreciate his skill set and source of information. He is a well connected person and would highly recommend him.",
    linkedin: "https://www.linkedin.com/in/meetravigupta/"
  },
  {
    name: "Kavish Baghel",
    designation: "Senior Engineer at Dunnhumby",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGs5T9HbosoXg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718801329737?e=1748476800&v=beta&t=GzIfiNnSqfYsJHaiuHpbzN8sGW35iYdzHU3qO0Zlqu4",
    text: "Divya has been a great team member. He has always taken full responsibility of the task assigned to him and has always kept the team energy high. He aims to achieve perfection and helps everyone along his work.",
    linkedin: "https://www.linkedin.com/in/kavishbaghel/"
  },
  {
    name: "Abhishek Gajraj",
    designation: "AVP(Product) at Naukri.com",
    image: "https://media.licdn.com/dms/image/v2/C4E03AQEtSlooJ4c0TA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1633604367828?e=1748476800&v=beta&t=59eFZPIBdASVXJZlu6ovXj_XljHOiHn_5vMqZV_knsk",
    text: "Divya is a positive and multi-talented individual with great work skill sets. His in-depth knowledge on the Python has been impressive. He is a sincere and smart working professional with a great appetite to learn new things. His strong work ethics and focused approach are commendable. ",
    linkedin: "https://www.linkedin.com/in/abhishekgajraj/"
  },
  {
    name: "Rohit Sharma",
    designation: "QA Manager at Squareboat",
    image: "https://media.licdn.com/dms/image/v2/D4D03AQFxVKiqDkiGZw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1694670863607?e=1748476800&v=beta&t=dmUOm2Zv-Jv9OIOavcWp53DlfgZ001x9IFHYdlqWbLI",
    text: "Divya Prakash has always been a great resource to work with. He is always willing to jump in as part of the team, whether it be to create a new functionality, to fix a problem or to determine the root cause of a bug. His problem-solving capabilities are very good. In the time that I have worked with Divya, I have been impressed by his thorough, creative approach to his work. He has been an indispensable part of our projects, and I look forward to working with him in the future too.",
    linkedin: "https://www.linkedin.com/in/rohitsharma2206/"
  },
  {
    name: "Abhishek Mishra",
    designation: "Assistant Manager & Deloitte, UK",
    image: "https://media.licdn.com/dms/image/v2/D4E03AQGs2twgyKvFbQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1721423171761?e=1748476800&v=beta&t=wMcuH3BZAPL7DYYdVVME13Nu9ZqMzUbIzC0ttL6YDJQ",
    text: "I have known Divya Prakash as my course mate at the University of Southampton. He is exceptionally talented and has good proficiency in python programming language. Throughout the program, he has successfully developed quality codes and solutions. I highly recommend him for his technical expertise and business knowledge and I am sure he will be a great asset to any company.",
    linkedin: "https://www.linkedin.com/in/abhishekmishra1095/"
  }
];

const nextSlide = () => {
  if (currentSlide.value < testimonials.length - 1) {
    currentSlide.value++;
  }
};

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

const goToSlide = (index: number) => {
  currentSlide.value = index;
};

// Auto-rotate testimonials
let autoplayInterval: number | null = null;

const startAutoplay = () => {
  autoplayInterval = window.setInterval(() => {
    if (currentSlide.value < testimonials.length - 1) {
      currentSlide.value++;
    } else {
      currentSlide.value = 0;
    }
  }, 8000); // Change slide every 8 seconds
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true;
          startAutoplay();
        } else {
          stopAutoplay();
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
    stopAutoplay();
  });
});
</script>

<style scoped>
/* Add line clamping for mobile */
.line-clamp-6 {
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
