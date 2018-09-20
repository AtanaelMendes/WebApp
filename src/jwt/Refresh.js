import Vue from 'vue'
import router from '../router'

export default {
  handle: function (response) {
    console.log('aqui no refresh')
    return Vue.prototype.$axios.post('auth/token/refresh').then(function (response) {
      console.log(response)
      if (!response.data.mensagem) {
        localStorage.setItem('auth.token', response.data)
        window.location.reload()
        // let method = resource.config.method.toLowerCase()
        // return window.axios[method](resource.config.url, resource.config.params)
      } else {
        router.push('/login')
      }
    }).catch(function () {
      return router.push('/login')

    })
  }
}
