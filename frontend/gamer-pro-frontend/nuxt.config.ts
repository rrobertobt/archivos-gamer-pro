// https://nuxt.com/docs/api/configuration/nuxt-config
import { md3 } from 'vuetify/blueprints'
// import { es } from 'vuetify/locale'
export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['vuetify-nuxt-module','@pinia/nuxt'],
  vuetify: {
    vuetifyOptions: {
      // locale: {
      //   locale: 'es',
      // },
      // localeMessages: ['es'],
      blueprint: md3,
      defaults: {
        VTextField: {
          variant: 'outlined'
        },
        VTextarea: {
          variant: 'outlined'
        },
        VAutocomplete: {
          variant: 'outlined'
        },
      }
    }
  }
})