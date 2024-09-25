export const SnackbarType = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
}

export const useSnackbarStore = defineStore('snackbar', () => {
  const show = ref(false)
  const message = ref('')
  const type = ref(SnackbarType.INFO)
  const title = ref('')

  const showSnackbar = ({messageToShow, typeOf, titleToShow}) => {
    show.value = true
    message.value = messageToShow
    type.value = typeOf
    title.value = titleToShow
  }

  return {
    show,
    message,
    type,
    title,
    showSnackbar
  }

})