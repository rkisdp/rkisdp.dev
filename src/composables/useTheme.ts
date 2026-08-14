import { computed, watch } from 'vue';
import { ThemeId, type Theme, type ThemeComponent, type ThemePhase } from '../types/theme';
import ThemeFactory from '../utils/themeFactory';

/**
 * A composable that provides access to the theme state and management functions.
 * Uses Nuxt's useState for SSR hydration to avoid client-side API requests or layout flashes.
 * 
 * @returns An object containing reactive theme state and helper methods.
 */
export function useTheme() {
    const config = useRuntimeConfig();
    const initialTheme = (config.public.activeTheme as ThemeId) || ThemeId.DEFAULT;

    // Use useState so theme is SSR-rendered into HTML and hydrated seamlessly on the client
    const currentThemeId = useState<ThemeId>('currentThemeId', () => {
        const validThemes = Object.values(ThemeId);
        return validThemes.includes(initialTheme) ? initialTheme : ThemeId.DEFAULT;
    });

    const currentTheme = computed<Theme>(() => ThemeFactory.getTheme(currentThemeId.value));
    
    const currentThemePhase = useState<ThemePhase>('currentThemePhase', () => {
        return currentThemeId.value === ThemeId.HAPPY_NEW_YEAR ? 'confetti-spawning' : 'initial';
    });

    // Sync theme phase whenever currentThemeId changes
    watch(currentThemeId, (newId) => {
        if (newId === ThemeId.HAPPY_NEW_YEAR) {
            currentThemePhase.value = 'confetti-spawning';
        } else {
            currentThemePhase.value = 'initial';
        }
    });

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

