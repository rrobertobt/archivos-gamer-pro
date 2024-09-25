export const $api = $fetch.create({
  baseURL: 'http://localhost:8000',
  onRequest({options}) {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData') ?? '{}') 
      console.log(userData.id)
      options.headers.set('Authorization', `${userData.id}`)
    }
  }
})