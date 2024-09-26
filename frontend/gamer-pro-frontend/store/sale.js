import { useSessionStore } from "./session"
import { SnackbarType, useSnackbarStore } from "./snackbar"

export const useSaleStore = defineStore('sale', () => {
  const loading = ref(false)
  const asCf = ref(false)


  const loadingProducts = ref(false)


  const currentCustomer = ref(null)
  const saleInfo = ref(null)
  const saleProducts = ref([])

  const products = ref([])

  // false = by name, true = by code
  const productSearchType = ref(false);


  const getCustomerByNit = async (nit) => {
    if (!nit) return {
      error: false
    }
    try {
      loading.value = true
      const response = await $api(`/customers?byNit=${nit}`)
      currentCustomer.value = response
      return {
        error: false,
        response
      }
    } catch (error) {
      // currentCustomer.value = null
      return {
        error: true,
        response: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  const getProduct = async ({
    value
  }) => {
    const by = productSearchType.value ? 'code' : 'name'
    try {
      loadingProducts.value = true
      const response = await $api(`/products?${by}=${value}`)
      products.value = response
      return {
        error: false,
        response
      }
    } catch (error) {
      return {
        error: true,
        response: error.data.message
      }
    } finally {
      loadingProducts.value = false
    }
  }

  const getProductById = async (id) => {
    try {
      loadingProducts.value = true
      const response = await $api(`/products/${id}`)
      return {
        error: false,
        response
      }
    } catch (error) {
      return {
        error: true,
        response: error.data.message
      }
    } finally {
      loadingProducts.value = false
    }
  }

  const handleAddProduct = async (productId, amount = 1) => {
    const product = await getProductById(productId)
    if (product.response) {
      const productDataToPush = {
        ...product.response,
        amount,
        total: product.response.price * amount
      }
      // check if product already exists in saleProducts, if so, update amount and total
      const productIndex = saleProducts.value.findIndex(({
        id
      }) => id === productId)
      if (productIndex > -1) {
        saleProducts.value[productIndex].amount = amount
        saleProducts.value[productIndex].total = productDataToPush.total
        return
      }
      saleProducts.value.push(productDataToPush)
      console.log(product.response)
    }
  }

  const handleDeleteProduct = async (productId) => {
    const productIndex = saleProducts.value.findIndex(({
      id
    }) => id === productId)
    if (productIndex > -1) {
      saleProducts.value.splice(productIndex, 1)
    }
  }

  const processSale = async () => {
    console.log('Processing sale')
    const {session} = useSessionStore()
    const saleInfo = {
      branch_id: session.branch.id,
      employee_id: session.id,
      customer_id: asCf.value ? null : currentCustomer.value.id,
    }
    const saleDetails = saleProducts.value.map(({id, amount, price}) => ({
      product_id: id,
      quantity: amount,
      unit_price: price
    }))

    const sale = {
      ...saleInfo,
      sale_details: saleDetails
    }
    try {
      loading.value = true
      const response = await $api('/sales', {
        method: 'POST',
        body: sale
      })
      useSnackbarStore().showSnackbar({
        titleToShow: 'Venta realizada',
        typeOf: SnackbarType.SUCCESS,
        messageToShow: 'La venta se ha realizado con éxito'
      })
      return {
        error: false,
        response
      }
    } catch (error) {
      useSnackbarStore().showSnackbar({
        titleToShow: error.data.error,
        typeOf: SnackbarType.ERROR,
        messageToShow: error.data.message
      })
      return {
        error: true,
        response: error.data.message
      }
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    currentCustomer,
    processSale,
    saleInfo,
    saleProducts,
    handleAddProduct,
    handleDeleteProduct,
    loadingProducts,
    productSearchType,
    products,
    asCf,
    getProduct,
    getCustomerByNit
  }
})