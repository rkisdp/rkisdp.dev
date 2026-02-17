<template>
  <div class="theme-selector-container">
    <button 
      @click="toggleDropdown"
      class="theme-toggle-btn"
      :class="{ 'open': isOpen }"
    >
      <span class="current-theme">{{ currentTheme.name }}</span>
      <font-awesome-icon :icon="['fas', 'palette']" size="sm" />
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="theme-dropdown">
        <button 
          v-for="theme in availableThemes" 
          :key="theme.id"
          @click="selectTheme(theme.id)"
          class="theme-option"
          :class="{ 'active': currentThemeId === theme.id }"
        >
          <span class="theme-icon">{{ getThemeIcon(theme.id) }}</span>
          <span class="theme-name">{{ theme.name }}</span>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTheme } from '../composables/useTheme';
import { ThemeId } from '../types/theme';

const { currentThemeId, currentTheme, setTheme } = useTheme();
const isOpen = ref(false);

const availableThemes = [
  { id: ThemeId.DEFAULT, name: 'Default' },
  { id: ThemeId.HOLI, name: 'Holi' },
  { id: ThemeId.CHRISTMAS, name: 'Christmas' },
  { id: ThemeId.HAPPY_NEW_YEAR, name: 'Happy New Year' },
];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectTheme = (id: ThemeId) => {
  setTheme(id);
  isOpen.value = false;
};

const getThemeIcon = (id: ThemeId): string => {
  const icons: Record<ThemeId, string> = {
    [ThemeId.DEFAULT]: '🌟',
    [ThemeId.HOLI]: '🎨',
    [ThemeId.CHRISTMAS]: '🎄',
    [ThemeId.HAPPY_NEW_YEAR]: '🎆',
  };
  return icons[id] || '🌟';
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.theme-selector-container')) {
    isOpen.value = false;
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('click', handleClickOutside);
}
</script>

<style scoped>
.theme-selector-container {
  position: relative;
  z-index: 100;
}

.theme-toggle-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: var(--foreground, #E0E6ED);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.theme-toggle-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.theme-toggle-btn.open {
  background: rgba(255, 255, 255, 0.2);
}

.current-theme {
  font-weight: 500;
}

.theme-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 200px;
  background: rgba(15, 17, 27, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(16px);
}

.theme-option {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: none;
  color: var(--foreground, #E0E6ED);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
}

.theme-option:hover {
  background: rgba(255, 255, 255, 0.1);
}

.theme-option.active {
  background: rgba(0, 212, 255, 0.2);
  color: #00D4FF;
}

.theme-icon {
  font-size: 18px;
}

.theme-name {
  font-weight: 500;
}

/* Dropdown transition */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
