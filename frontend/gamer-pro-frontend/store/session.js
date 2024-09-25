export const useSessionStore = defineStore('session', () => {
  const session = ref(null)
  const loading = ref(false)

  const login = async (email, password) => {
    loading.value = true
    try {
      const response = await axios.post('/api/login', { email, password })
      session.value = response.data
      localStorage.setItem('session', JSON.stringify(session.value))
    } catch (error) {
      console.error(error)
    }
    loading.value = false
  }

  const logout = () => {
    session.value = null
    localStorage.removeItem('session')
  }

  return {
    session,
    loading,
    login,
    logout
  }
})