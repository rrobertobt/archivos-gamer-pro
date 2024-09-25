import { useSessionStore } from "~/store/session"

export default defineNuxtPlugin((_nuxtApp) => {
  const authStore = useSessionStore()
  authStore.recoverSession()
})
