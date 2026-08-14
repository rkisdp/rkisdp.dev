import ThemeFactory from '~/utils/themeFactory';

/**
 * Server API route to expose available themes for external backend integration.
 * Requires secret authentication if THEME_API_SECRET is configured.
 */
export default defineEventHandler((event) => {
    const config = useRuntimeConfig(event);
    const expectedSecret = config.themeApiSecret;

    // Validate secret key if configured
    if (expectedSecret) {
        const authHeader = getHeader(event, 'authorization');
        const customHeader = getHeader(event, 'x-theme-api-secret');
        const querySecret = getQuery(event).secret;

        const providedSecret =
            (authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : authHeader) ||
            customHeader ||
            querySecret;

        if (!providedSecret || providedSecret !== expectedSecret) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Unauthorized: Invalid or missing theme API secret key.',
            });
        }
    }

    const availableThemes = ThemeFactory.getAllThemes();

    return {
        activeTheme: config.public.activeTheme || 'default',
        themes: availableThemes,
    };
});
