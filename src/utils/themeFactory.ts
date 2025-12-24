import { ThemeId, type Theme, THEME_COMPONENTS, createThemeComponent } from '../types/theme';

class ThemeFactory {
    private static themes: Record<ThemeId, Theme> = {
        [ThemeId.DEFAULT]: {
            id: ThemeId.DEFAULT,
            name: 'Default',
            components: [],
        },
        [ThemeId.CHRISTMAS]: {
            id: ThemeId.CHRISTMAS,
            name: 'Christmas',
            components: [
                createThemeComponent('christmas', THEME_COMPONENTS.SNOWFALL),
                createThemeComponent('christmas', THEME_COMPONENTS.SANTA_SLEIGH),
                createThemeComponent('christmas', THEME_COMPONENTS.WINTER_SCENE, false), // Not global, used in ContactSection
            ],
        },
    };

    public static getTheme(id: ThemeId): Theme {
        return this.themes[id] || this.themes[ThemeId.DEFAULT];
    }
}

export default ThemeFactory;
