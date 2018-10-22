import Vue from 'vue'
import router from '../router'

export default {
  handle: function (response) {
    let data = {
      grant_type: 'refresh_token',
      client_id: '2',
      client_secret: 'uY0WBc41kKaSxqpaiga5iOgK0afD0DxzhVLxXkxc',
      scope: null,
      refresh_token: localStorage.getItem('auth.refresh_token')
    }

    return Vue.prototype.$axios.post('oauth/token', data).then(function (response) {
      if (!response.data.mensagem) {
        localStorage.setItem('auth.token', response.data.access_token)
        localStorage.setItem('auth.refresh_token', response.data.refresh_token)
        window.location.reload()
        console.log('token atualizado')
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
