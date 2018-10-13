import axios from 'axios'
import {Notify} from 'quasar'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: process.env.API_URL,
    'X-Requested-With': 'XMLHttpRequest'
  });

  Vue.prototype.$axios.interceptors.request.use(function (config) {
    const AUTH_TOKEN = localStorage.getItem('auth.token');
    if (AUTH_TOKEN) {
      config.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  });

  Vue.prototype.$axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if(error.message === 'Network Error'){
      Notify.create("Erro ao estabelecer uma conexão com o servidor.");
      return Promise.reject(error);
    }
    //if (error.response.status === 401 && error.config._retry) {
    if(error.response.status === 401) {
      refreshToken();
    }
    return Promise.reject(error);
  });

  function refreshToken () {
    let data = {
      grant_type: 'refresh_token',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: null,
      refresh_token: localStorage.getItem('auth.refresh_token')
    };

    Vue.prototype.$axios.post('oauth/token', data).then(function (response) {
      if (!response.data.mensagem) {
        localStorage.setItem('auth.token', response.data.access_token);
        localStorage.setItem('auth.refresh_token', response.data.refresh_token);
      } else {
        router.push('/login');
      }
    });
  }
}