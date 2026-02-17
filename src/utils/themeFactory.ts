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
        [ThemeId.HAPPY_NEW_YEAR]: {
            id: ThemeId.HAPPY_NEW_YEAR,
            name: 'Happy New Year',
            components: [
                createThemeComponent('happy-new-year', THEME_COMPONENTS.CONFETTI),
                createThemeComponent('happy-new-year', THEME_COMPONENTS.FIREWORKS),
            ],
        },
        [ThemeId.HOLI]: {
            id: ThemeId.HOLI,
            name: 'Holi',
            components: [
                createThemeComponent('holi', THEME_COMPONENTS.PAINT_SPLASH_TEXT, false),
            ],
            config: {
                colors: ['#5bc8af', '#F05A54', '#54F09B', '#F59616', '#F0E456', '#ACA1F5']
            },
        },
    };

    public static getTheme(id: ThemeId): Theme {
        return this.themes[id] || this.themes[ThemeId.DEFAULT];
    }
}

export default ThemeFactory;
