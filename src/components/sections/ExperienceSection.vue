<template>
  <section
    ref="sectionRef"
    id="experience"
    class="section relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-100px] right-[10%] w-[90%] h-[600px] rounded-full opacity-5 bg-[rgba(100,200,255,0.1)] blur-3xl z-0"
      ></div>
    </div>

    <div class="container-custom relative z-10">
      <div
        class="text-center mb-12 md:mb-20"
        :class="{'opacity-0 translate-y-8': !isVisible, 'opacity-100 translate-y-0': isVisible}"
        style="transition: all 0.8s ease-out;"
      >
        <h2 class="section-title mb-4">
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
                class="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] cursor-pointer relative overflow-hidden"
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
                class="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300 hover:translate-y-1 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)] cursor-pointer relative overflow-hidden"
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
              class="w-full bg-gray-900/80 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 active:scale-[0.98] transition-all duration-200 cursor-pointer relative overflow-hidden"
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
import { ref, computed } from "vue";
import JobModal from "../JobModal.vue";
import { jobs, type Job } from "../../data/jobs";
import { useIntersectionObserver } from "../../composables/useIntersectionObserver";
import { useScrollLock } from "../../composables/useScrollLock";
import { useDragScroll } from "../../composables/useDragScroll";

// Computed properties for layout
const upperJobs = computed(() => jobs.slice(0, 3));
const lowerJobs = computed(() => jobs.slice(3));

// State
const sectionRef = ref<HTMLElement | null>(null);
const selectedJob = ref<Job | null>(null);
const scrollContainer = ref<HTMLElement | null>(null);

// Composables
const { isVisible } = useIntersectionObserver(sectionRef);
const { lock, unlock } = useScrollLock();
const { startDrag, stopDrag, drag } = useDragScroll(scrollContainer);

/**
 * Opens the job detail modal and locks body scrolling.
 * @param job - The job object to display in the modal.
 */
const openModal = (job: Job) => {
  selectedJob.value = job;
  lock();
};

/**
 * Closes the job detail modal and restores body scrolling.
 */
const closeModal = () => {
  selectedJob.value = null;
  unlock();
};

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