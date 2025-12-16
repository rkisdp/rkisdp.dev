declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}

interface ImportMetaEnv {
  readonly VITE_POSTHOG_KEY: string
  readonly VITE_POSTHOG_HOST?: string
  readonly VITE_G_MEASUREMENT_ID?: string
  readonly VITE_CLARITY_PROJECT_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}