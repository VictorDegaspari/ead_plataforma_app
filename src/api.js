import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/`
})
let token = localStorage.getItem('token');

window.addEventListener('updateToken', (event) => {
  token = event.detail?.token;
  localStorage.setItem('token', token);
});

api.interceptors.request.use(
  function (config) {
    
    config.headers = Object.assign({}, config.headers, {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return config;

  }, function (error) {
    return Promise.reject(error)
  }
)


export default api;