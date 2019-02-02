import axios from 'axios'
import {Notify} from 'quasar'


const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
  'X-Requested-With': 'XMLHttpRequest'
});

export default ({app, router, Vue}) => {
  Vue.prototype.$axios = axiosInstance;

  axiosInstance.interceptors.response.use(customSuccessResponse, customErrorResponse);


  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };


  axiosInstance.interceptors.request.use(function (config) {
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
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        }).catch(err => {
          return err
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      let data = {
        grant_type: 'refresh_token',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        scope: null,
        refresh_token: localStorage.getItem('auth.refresh_token')
      };

      return new Promise(function (resolve, reject) {
        axiosInstance.post('oauth/token', data)
          .then(response => {
            localStorage.setItem('auth.token', response.data.access_token);
            localStorage.setItem('auth.refresh_token', response.data.refresh_token);

            axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
            originalRequest.headers['Authorization'] = 'Bearer ' + response.data.access_token;
            processQueue(null, response.data.access_token);
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            //TODO: Limpar o token aqui e redirecionar para a tela de login
            processQueue(err, null);
            reject(err);
          })
          .then(() => { isRefreshing = false })
      })
    }

    return Promise.reject(error);
  }
}

export {
  axiosInstance
}
