<template>
  <div class="relative">
    <!-- Chat Window Panel -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-95"
    >
      <div
        v-show="isOpen"
        class="fixed bottom-24 right-3 sm:right-6 z-[60] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl overflow-hidden transition-all duration-500 ease-in-out"
        :class="isExpanded ? 'w-[380px] h-[480px]' : 'w-[320px] h-[350px]'"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-glass">
          <h3 class="font-semibold text-foreground">Chat</h3>
          <button
            type="button"
            aria-label="Close chat"
            class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            @click="closeChat"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="w-4 h-4" />
          </button>
        </div>

        <!-- Messages area - placeholder for API -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div class="flex justify-center py-12">
            <p class="text-xs text-muted-foreground italic">
              {{ isExpanded ? 'API integration pending. Send a message once connected.' : 'Click below to start a conversation' }}
            </p>
          </div>
        </div>

        <!-- Input area - placeholder for API -->
        <div class="p-4 border-t border-white/10">
          <div class="flex gap-2">
            <input
              v-model="message"
              type="text"
              placeholder="Type a message..."
              class="flex-1 min-w-0 px-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors"
              @focus="isFocused = true"
              @blur="isFocused = false"
            >
            <button
              type="button"
              class="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isTyping"
            >
              <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Chat Button -->
    <button
      type="button"
      :aria-label="isOpen ? 'Close chat' : 'Open chat'"
      class="chat-button group flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
      @click="toggleChat"
    >
      <span class="relative inline-flex items-center justify-center w-6 h-6">
        <Transition
          mode="out-in"
          enter-active-class="transition duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
          enter-from-class="opacity-0 scale-50 -rotate-180"
          enter-to-class="opacity-100 scale-100 rotate-0"
          leave-active-class="transition duration-300 ease-in"
          leave-from-class="opacity-100 scale-100 rotate-0"
          leave-to-class="opacity-0 scale-50 rotate-180"
        >
          <font-awesome-icon
            :key="isOpen ? 'close' : 'chat'"
            :icon="['fas', isOpen ? 'times' : 'comment-dots']"
            class="w-6 h-6"
          />
        </Transition>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const isOpen = ref(false);
const message = ref('');
const isFocused = ref(false);

const isTyping = computed(() => message.value.trim().length > 0);
const isExpanded = computed(() => isFocused.value || isTyping.value);

onMounted(() => {
  setTimeout(() => {
    isOpen.value = true;
  }, 1000);
});

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    message.value = ''; // Reset on close
    isFocused.value = false;
  }
};

const closeChat = () => {
  isOpen.value = false;
  message.value = ''; // Reset on close
  isFocused.value = false;
};
</script>
