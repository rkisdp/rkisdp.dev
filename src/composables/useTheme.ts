import { computed } from 'vue';
import { ThemeId, type Theme, type ThemeComponent, type ThemePhase } from '../types/theme';
import ThemeFactory from '../utils/themeFactory';

export function useTheme() {
    const currentThemeId = useState<ThemeId>('themeId', () => ThemeId.DEFAULT);
    const currentThemePhase = useState<ThemePhase>('themePhase', () => 'initial');
    const currentTheme = computed<Theme>(() => ThemeFactory.getTheme(currentThemeId.value));

    const setTheme = (id: ThemeId) => {
        currentThemeId.value = id;
        if (id === ThemeId.HAPPY_NEW_YEAR) {
            currentThemePhase.value = 'confetti-spawning';
        } else {
            currentThemePhase.value = 'initial';
        }
    };

    const setThemePhase = (phase: ThemePhase) => {
        currentThemePhase.value = phase;
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
        getThemeComponent,
    };
}
