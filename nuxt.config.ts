const baseUrl = '/';

export default defineNuxtConfig({
  app: {
    baseURL: baseUrl,
    head: {
      title: 'Node.JS Riot Games libraries',
      link: [
        {
          id: 'theme-link',
          rel: 'stylesheet',
          href: baseUrl + 'themes/viva-dark/theme.css'
        }
      ]
    }
  },
  css: [
    "primevue/resources/primevue.css",
    "primeicons/primeicons.css",
    "@fontsource/fira-code/400.css"
  ],
  build: {
    transpile: ["primevue"]
  },
  vite: {
    define: {
      'process.env.VSCODE_TEXTMATE_DEBUG': 'false',
    }
  }
})
