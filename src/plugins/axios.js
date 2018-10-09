import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios.create({
    baseURL: process.env.API_URL,
    'X-Requested-With': 'XMLHttpRequest'
  })
}
