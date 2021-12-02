import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`
})

api.interceptors.request.use(
  function (config) {
    
    config.headers = Object.assign({}, config.headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })

    return config;

  }, function (error) {
    return Promise.reject(error)
  }
)


export default api;