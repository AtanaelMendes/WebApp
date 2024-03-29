import axios from 'axios'
import RefreshTokenCredential from "../assets/js/model/auth/RefreshTokenCredential";

const axiosInstance = axios.create({
  baseURL: process.env.API_URL,
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
      config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }else{
      router.push('/login');
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

    if(error.response && error.config.url !== error.config.baseURL + 'oauth/token'){
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

        return new Promise(function (resolve, reject) {
          axiosInstance.post('oauth/token', new RefreshTokenCredential(localStorage.getItem('auth.refresh_token')).toString())
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
              router.push('/login');
              reject(err);
            })
            .then(() => { isRefreshing = false })
        })
      }
    }

    return Promise.reject(error);
  }
}

export {
  axiosInstance
}
