import { ThemeId, type Theme, THEME_COMPONENTS, createThemeComponent } from '../types/theme';

/**
 * A static factory class that manages and provides theme configurations for the application.
 * Each theme defines a set of components and visual configurations associated with a specific event or style.
 */
class ThemeFactory {
    /**
     * A registry of available themes. 
     * Themes can include global background components or section-specific decorative elements.
     */
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
                createThemeComponent('christmas', THEME_COMPONENTS.WINTER_SCENE, false), // Section-specific component
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
        [ThemeId.DIWALI]: {
            id: ThemeId.DIWALI,
            name: 'Diwali',
            components: [
                createThemeComponent('diwali', THEME_COMPONENTS.DIWALI_FOOTER, false),
                createThemeComponent('diwali', THEME_COMPONENTS.DIWALI_LANTERNS, true),
                createThemeComponent('happy-new-year', THEME_COMPONENTS.FIREWORKS, true),
            ],
        },
    };

    /**
     * Retrieves the theme configuration for a given theme ID.
     * 
     * @param id - The identifier of the theme to retrieve.
     * @returns The theme configuration object, defaulting to the base theme if the ID is unrecognized.
     */
    public static getTheme(id: ThemeId): Theme {
        return this.themes[id] || this.themes[ThemeId.DEFAULT];
    }
}

export default ThemeFactory;
