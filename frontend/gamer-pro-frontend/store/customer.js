import { SnackbarType, useSnackbarStore } from "./snackbar";

export const useCustomerStore = defineStore('customer',()=>{
  const loading = ref(false)

  const createCustomer = async (payload) => {
    try {
      loading.value = true
      const response = await $api('/customers', {
        method: 'POST',
        body: payload
      })
      useSnackbarStore().showSnackbar({
        titleToShow: 'Cliente',
        messageToShow: 'Cliente creado con éxito',
        typeOf: SnackbarType.SUCCESS
      })
      return {
        error: false,
        response
      }
    } catch (error) {
      useSnackbarStore().showSnackbar({
        titleToShow: error.data.error,
        messageToShow: error.data.message,
        typeOf: SnackbarType.ERROR
      })
      return {
        error: true,
        response: error
      }
    } finally {
      loading.value = false
    }
  }

  const updateCustomer = async (id, payload) => {
    try {
      loading.value = true
      const response = await $api(`/customers/${id}`, {
        method: 'PATCH',
        body: payload
      })
      useSnackbarStore().showSnackbar({
        titleToShow: 'Cliente',
        messageToShow: 'Cliente actualizado con éxito',
        typeOf: SnackbarType.SUCCESS
      })
      return {
        error: false,
        response
      }
    } catch (error) {
      useSnackbarStore().showSnackbar({
        titleToShow: error.data.error,
        messageToShow: error.data.message,
        typeOf: SnackbarType.ERROR
      })
      return {
        error: true,
        response: error
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    createCustomer,
    updateCustomer
  }
})

