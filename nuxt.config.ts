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
    "/**": {
      cors: true,
      headers: {
        "access-control-allow-methods": "GET,HEAD,PATCH,POST,DELETE",
        "access-control-allow-origin": "*",
        "access-control-allow-credentials": "true",
      },
    },
  },

  nitro: {
    routeRules: {
      "/*": { cors: true },
      "api/**": {
        cors: true,
        headers: {
          "access-control-allow-methods": "GET,HEAD,PATCH,POST,DELETE",
          "access-control-allow-origin": "*",
          "access-control-allow-credentials": "true",
        },
      },
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
// "/": { prerender: true },
// routeRules: {
//   "/api/**": { cors: true },
//   "/*": { cors: true },
// },
