import { ref, computed, watch } from 'vue';
import { ThemeId, type Theme, type ThemeComponent, type ThemePhase } from '../types/theme';
import ThemeFactory from '../utils/themeFactory';

/**
 * Global reactive state for the application's current theme.
 */
const currentThemeId = ref<ThemeId>(ThemeId.DEFAULT);
const currentTheme = computed<Theme>(() => ThemeFactory.getTheme(currentThemeId.value));
const currentThemePhase = ref<ThemePhase>('initial');

// Initialize or reset the theme phase whenever the theme ID changes.
watch(currentThemeId, (newId) => {
    if (newId === ThemeId.HAPPY_NEW_YEAR) {
        currentThemePhase.value = 'confetti-spawning';
    } else {
        currentThemePhase.value = 'initial';
    }
}, { immediate: true });

/**
 * A composable that provides access to the theme state and management functions.
 * 
 * @returns An object containing reactive theme state and helper methods.
 */
export function useTheme() {
    /**
     * Updates the application's current theme.
     * @param id - The ID of the theme to switch to.
     */
    const setTheme = (id: ThemeId) => {
        currentThemeId.value = id;
    };

    /**
     * Updates the phase of the current theme (e.g., for multi-step animations).
     * @param phase - The new phase for the theme.
     */
    const setThemePhase = (phase: ThemePhase) => {
        currentThemePhase.value = phase;
    };

    /**
     * Finds and returns a specific theme component definition by its name.
     * @param componentName - The name of the component to find.
     * @returns The theme component definition, or undefined if not found.
     */
    const getThemeComponent = (componentName: string): ThemeComponent | undefined => {
        return currentTheme.value.components.find(c => c.name === componentName);
    };

    return {
        currentThemeId,
        currentTheme,
        currentThemePhase,
        setTheme,
        setThemePhase,
        getThemeComponent,
    };
}
