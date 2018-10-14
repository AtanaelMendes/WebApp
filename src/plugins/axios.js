import axios from 'axios'
import {Notify} from 'quasar'

export default ({app, router, Vue}) => {

  Vue.prototype.$axios = axios.create({
    baseURL: process.env.API_URL,
    'X-Requested-With': 'XMLHttpRequest'
  });

  const instance = Vue.prototype.$axios;

  let interceptorResponse = instance.interceptors.response.use(customSuccessResponse, customErrorResponse);

  instance.interceptors.request.use(function (config) {
    const AUTH_TOKEN = localStorage.getItem('auth.token');
    if (AUTH_TOKEN) {
      config.headers.common['Authorization'] = 'Bearer ' + AUTH_TOKEN;
    }
    return config
  }, function (error) {
    return Promise.reject(error)
  });


  function customSuccessResponse(response) {
    return response;
  }

  function customErrorResponse(error) {
    if(error.message === 'Network Error'){
      Notify.create("Erro ao estabelecer uma conexão com o servidor.");
      return Promise.reject(error);
    }

    if(error.response.status === 401) {
      //Se não for response da tela de login
      if(error.response.data.error && error.response.data.error === 'invalid_credentials'){
        return Promise.reject(error);
      }
      refreshToken();
    }
    return Promise.reject(error);
  }

  function refreshToken () {
    let data = {
      grant_type: 'refresh_token',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      scope: null,
      refresh_token: localStorage.getItem('auth.refresh_token')
    };

    instance.interceptors.response.eject(interceptorResponse);

    instance.post('oauth/token', data)
      .then(function (response) {
        localStorage.setItem('auth.token', response.data.access_token);
        localStorage.setItem('auth.refresh_token', response.data.refresh_token);
      })
      .catch(function (error) {
        localStorage.removeItem('auth.token');
        localStorage.removeItem('auth.refresh_token');
        router.push('/login');
      });

    interceptorResponse = instance.interceptors.response.use(customSuccessResponse, customErrorResponse);
  }

}
