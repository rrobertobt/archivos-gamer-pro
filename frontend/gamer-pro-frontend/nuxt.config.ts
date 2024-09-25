// https://nuxt.com/docs/api/configuration/nuxt-config
import { md3 } from 'vuetify/blueprints'
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  modules: ['vuetify-nuxt-module','@pinia/nuxt'],
  vuetify: {
    vuetifyOptions: {
      locale: {
        locale: 'es'
      },
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