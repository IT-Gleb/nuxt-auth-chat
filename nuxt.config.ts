// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ["nuxt-icons", "@vee-validate/nuxt", "@pinia/nuxt", "@vueuse/nuxt"],
  css: ["~/assets/css/main.css"],
  app: {
    baseURL: "/nuxt-auth-chat/",
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
  },

  routeRules: {
    "/api/**": { cors: false },
    "/*": { cors: false },
  },
  nitro: {
    routeRules: {
      "/": { prerender: true },
      "/*": { cors: false },
    },
    experimental: {
      websocket: true,
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
