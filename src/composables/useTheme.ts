import { ref, computed, watch } from 'vue';
import { ThemeId, type Theme, type ThemeComponent, type ThemePhase } from '../types/theme';
import ThemeFactory from '../utils/themeFactory';

const currentThemeId = ref<ThemeId>(ThemeId.HAPPY_NEW_YEAR);
const currentTheme = computed<Theme>(() => ThemeFactory.getTheme(currentThemeId.value));
const currentThemePhase = ref<ThemePhase>('initial');

// Initialize phase when theme changes
watch(currentThemeId, (newId) => {
    if (newId === ThemeId.HAPPY_NEW_YEAR) {
        currentThemePhase.value = 'confetti-spawning';
    } else {
        currentThemePhase.value = 'initial';
    }
}, { immediate: true });

export function useTheme() {
    const setTheme = (id: ThemeId) => {
        currentThemeId.value = id;
    };

    const setThemePhase = (phase: ThemePhase) => {
        currentThemePhase.value = phase;
    };

    const isComponentActive = (componentName: string): boolean => {
        return currentTheme.value.components.some(c => c.name === componentName);
    };

    const getThemeComponent = (componentName: string): ThemeComponent | undefined => {
        return currentTheme.value.components.find(c => c.name === componentName);
    };

    return {
        currentThemeId,
        currentTheme,
        currentThemePhase,
        setTheme,
        setThemePhase,
        isComponentActive,
        getThemeComponent,
    };
}
