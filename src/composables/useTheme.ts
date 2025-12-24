import { ref, computed } from 'vue';
import { ThemeId, type Theme, type ThemeComponent } from '../types/theme';
import ThemeFactory from '../utils/themeFactory';

const currentThemeId = ref<ThemeId>(ThemeId.CHRISTMAS);
const currentTheme = computed<Theme>(() => ThemeFactory.getTheme(currentThemeId.value));

export function useTheme() {
    const setTheme = (id: ThemeId) => {
        currentThemeId.value = id;
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
        setTheme,
        isComponentActive,
        getThemeComponent,
    };
}
