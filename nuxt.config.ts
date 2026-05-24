export default defineNuxtConfig({
  srcDir: 'src/',
  dir: {
    public: '../public'
  },
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/style.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  components: [
    { path: '~/components/sections', pathPrefix: false },
    { path: '~/components/themes/christmas', pathPrefix: false },
    { path: '~/components/themes/diwali', pathPrefix: false },
    { path: '~/components/themes/happy-new-year', pathPrefix: false },
    { path: '~/components/themes/holi', pathPrefix: false },
    { path: '~/components', pathPrefix: false }
  ],
  runtimeConfig: {
    public: {
      posthogKey: process.env.VITE_POSTHOG_KEY || '',
      posthogHost: process.env.VITE_POSTHOG_HOST || '',
    }
  },
  app: {
    head: {
      title: "Divya Prakash's Portfolio",
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${process.env.VITE_G_MEASUREMENT_ID || ''}`,
          async: true
        },
        {
          children: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.VITE_G_MEASUREMENT_ID || ''}');
          `
        },
        {
          children: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", '${process.env.VITE_CLARITY_PROJECT_ID || ''}');
          `
        }
      ]
    }
  }
})
