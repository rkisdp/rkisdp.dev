<template>
  <div
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    @click="$emit('close')"
  >
    <div
      class="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
      @click.stop
    >
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl md:text-2xl text-blue-100 font-bold">
              {{ job.position }}
            </h3>
            <h4 class="text-lg text-gray-200 mt-1">{{ job.company }}</h4>
            <p class="text-sm text-gray-400 mt-1">{{ job.period }}</p>
          </div>
          <button
            @click="$emit('close')"
            class="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none"
          >
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
        </div>

        <div class="mt-4">
          <h5 class="text-md text-gray-300 mb-2 font-semibold">
            Responsibilities:
          </h5>
          <ul class="list-disc pl-5 text-gray-400 space-y-2">
            <li
              v-for="(responsibility, idx) in job.responsibilities"
              :key="idx"
            >
              {{ responsibility }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  job: {
    type: Object,
    required: true,
  },
});

defineEmits(["close"]);
</script>
