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
        class="fixed bottom-24 right-3 sm:right-6 z-[60] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl border border-white/10 bg-background/95 backdrop-blur-xl shadow-2xl transition-all duration-500 ease-in-out"
        :class="isExpanded ? 'w-[380px] h-[480px]' : 'w-[320px] h-[350px]'"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-glass">
          <h3 class="font-semibold text-foreground">Chat with my AI Persona</h3>
          <button
            type="button"
            aria-label="Close chat"
            class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
            @click="closeChat"
          >
            <font-awesome-icon :icon="['fas', 'times']" class="w-4 h-4" />
          </button>
        </div>

        <!-- Messages area -->
        <div ref="messagesContainer" class="flex-1 overflow-y-auto overscroll-contain p-4 space-y-3">
          <!-- Loading history spinner -->
          <div v-if="isLoadingHistory" class="flex justify-center items-center h-full">
            <div class="flex flex-col items-center gap-2">
              <div class="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p class="text-xs text-muted-foreground">Loading history…</p>
            </div>
          </div>

          <!-- Welcome message for new visitors (no prior messages) -->
          <div
            v-else-if="messages.length === 0"
            class="flex flex-col items-center justify-center h-full gap-2 py-6"
          >
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <font-awesome-icon :icon="['fas', 'comment-dots']" class="text-primary w-5 h-5" />
            </div>
            <p class="text-sm font-medium text-foreground">Hey there! 👋</p>
            <p class="text-xs text-muted-foreground text-center px-4">
              Ask me anything about my experience, skills, or projects.
            </p>
          </div>

          <!-- Chat messages -->
          <template v-else>
            <div
              v-for="(msg, i) in messages"
              :key="i"
              class="flex"
              :class="msg.role === 'human' ? 'justify-end' : 'justify-start'"
            >
              <div
                class="max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed"
                :class="msg.role === 'human'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted/60 text-foreground rounded-bl-sm border border-white/10'"
                v-html="msg.content"
              />
            </div>
          </template>

          <!-- AI "thinking" indicator -->
          <div v-if="isSending" class="flex justify-start">
            <div class="px-3 py-2 rounded-2xl rounded-bl-sm bg-muted/60 border border-white/10 flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span class="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>

        <!-- Input area -->
        <div class="p-4 border-t border-white/10">
          <div class="flex gap-2">
            <input
              v-model="message"
              type="text"
              placeholder="Type a message..."
              :disabled="isSending"
              class="flex-1 min-w-0 px-4 py-3 rounded-xl bg-muted/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              @focus="isFocused = true"
              @blur="isFocused = false"
              @keydown.enter.prevent="sendMessage"
            >
            <button
              type="button"
              class="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              :disabled="!isTyping || isSending"
              @click="sendMessage"
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
      :class="[
        'chat-button group flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-glow focus:outline-none',
        isOpen && 'focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background'
      ]"
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
import { ref, computed, watch, nextTick, onMounted } from 'vue';

interface ChatMessage {
  role: 'human' | 'ai';
  content: string;
  timestamp: string;
}

const isOpen = ref(false);
const message = ref('');
const isFocused = ref(false);
const isLoadingHistory = ref(false);
const isSending = ref(false);
const historyFetched = ref(false);
const messages = ref<ChatMessage[]>([]);
const messagesContainer = ref<HTMLElement | null>(null);

const isTyping = computed(() => message.value.trim().length > 0);
const isExpanded = computed(() => isFocused.value || isTyping.value || messages.value.length > 0);

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
};

// ── Visitor History API ─────────────────────────────────────────────────────
const fetchHistory = async () => {
  if (historyFetched.value) return;
  historyFetched.value = true;
  isLoadingHistory.value = true;

  try {
    // credentials: 'include' sends the session_id cookie.
    // Browser automatically adds the correct Origin header for cross-origin requests.
    const res = await fetch('https://api.rkisdp.dev/api/visitor-history/', {
      method: 'GET',
      credentials: 'include',
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (!data.is_new && data.history?.length) {
      const allMessages: ChatMessage[] = [];
      for (const session of data.history) {
        allMessages.push(...(session.messages ?? []));
      }
      messages.value = allMessages;
      await scrollToBottom();
    }
    // is_new === true → messages stays empty → welcome screen shows
  } catch (err) {
    console.error('[ChatButton] Failed to fetch visitor history:', err);
    // Graceful fallback — welcome screen
  } finally {
    isLoadingHistory.value = false;
  }
};

// ── Chat API ────────────────────────────────────────────────────────────────
const sendMessage = async () => {
  const query = message.value.trim();
  if (!query || isSending.value) return;

  // Optimistically append the human message
  messages.value.push({ role: 'human', content: query, timestamp: new Date().toISOString() });
  message.value = '';
  isSending.value = true;
  await scrollToBottom();

  try {
    // Browser automatically adds Origin header for cross-origin requests.
    const res = await fetch('https://api.rkisdp.dev/api/chat/', {
      method: 'POST',
      credentials: 'include', // sends session_id cookie & receives updated cookie
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const aiText = data.response ?? 'Sorry, I could not process that.';

    messages.value.push({ role: 'ai', content: aiText, timestamp: new Date().toISOString() });
    await scrollToBottom();
  } catch (err) {
    console.error('[ChatButton] Failed to send message:', err);
    messages.value.push({
      role: 'ai',
      content: 'Oops — something went wrong. Please try again.',
      timestamp: new Date().toISOString(),
    });
    await scrollToBottom();
  } finally {
    isSending.value = false;
  }
};

// ── Lifecycle ───────────────────────────────────────────────────────────────
watch(isOpen, (opened) => {
  if (opened) fetchHistory();
});

onMounted(() => {
  setTimeout(() => {
    isOpen.value = true;
  }, 1000);
});

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (!isOpen.value) {
    message.value = '';
    isFocused.value = false;
  }
};

const closeChat = () => {
  isOpen.value = false;
  message.value = '';
  isFocused.value = false;
};
</script>
