import { defineAsyncComponent, type Component } from 'vue';

export enum ThemeId {
    DEFAULT = 'default',
    CHRISTMAS = 'christmas',
    HAPPY_NEW_YEAR = 'happy-new-year',
    HOLI = 'holi',
}

export const THEME_COMPONENTS = {
    // Christmas
    SNOWFALL: 'Snowfall',
    SANTA_SLEIGH: 'SantaSleigh',
    WINTER_SCENE: 'WinterScene',
    // New Year
    CONFETTI: 'Confetti',
    FIREWORKS: 'Fireworks',
    // Holi
    PAINT_SPLASH_TEXT: 'PaintSplashText',
} as const;

export type ThemePhase = 'initial' | 'confetti-spawning' | 'confetti-clearing' | 'fireworks-active' | 'completed';

export interface ThemeComponent {
    name: string;
    component: Component;
    isGlobal?: boolean; // If true, rendered automatically by ThemeGlobalComponents
}

export interface Theme {
    id: ThemeId;
    name: string;
    components: ThemeComponent[];
    config?: Record<string, any>;
}

// Helper to define async components for themes
export const createThemeComponent = (theme: string, name: string, isGlobal = true): ThemeComponent => ({
    name,
    isGlobal,
    component: defineAsyncComponent(() => import(`../components/themes/${theme}/${name}.vue`))
});
