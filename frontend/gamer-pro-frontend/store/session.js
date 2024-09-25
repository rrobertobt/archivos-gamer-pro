import { SnackbarType, useSnackbarStore } from "./snackbar"

export const useSessionStore = defineStore('session', () => {
  const session = ref(null)
  const loading = ref(false)

  const login = async (username, password) => {
    loading.value = true
    try {
      const response = await $api('/auth', {
        method: 'POST',
        body: { username, password }
      })
      session.value = response
      localStorage.setItem('userData', JSON.stringify(session.value))
      useSnackbarStore().showSnackbar({
        titleToShow: 'Sesión',
        messageToShow: 'Sesión iniciada correctamente',
        typeOf: SnackbarType.SUCCESS
      })
      const role = response.role.name
      console.log(role)
      switch (role) {
        case 'admin':
          navigateTo('/admin')
          break
        case 'cashier':
          navigateTo('/cashier')
          break
        case 'inventory':
          navigateTo('/inventory')
          break
        case 'warehouse':
          navigateTo('/warehouse')
          break
        default:
          navigateTo('/login')
          break
      }
      return response
    } catch (error) {
      useSnackbarStore().showSnackbar({
        titleToShow: 'Sesión',
        messageToShow: 'Credenciales de usuario incorrectas, por favor intente de nuevo',
        typeOf: SnackbarType.ERROR
      })
      return {
        error: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  const recoverSession = () => {
    const userData = localStorage.getItem('userData')
    if (userData) {
      session.value = JSON.parse(userData)
    }
  }

  const role = computed(() => {
    return session.value?.role?.name
  })

  const logout = () => {
    session.value = null
    localStorage.removeItem('userData')
    navigateTo('/login')
    useSnackbarStore().showSnackbar({
      titleToShow: 'Sesión',
      messageToShow: 'Sesión cerrada correctamente',
      typeOf: SnackbarType.SUCCESS
    })
  }

  return {
    session,
    loading,
    login,
    logout,
    recoverSession,
    role
  }
})