import axios from 'axios'

const instance = axios.create({
  timeout: 5000,
  baseURL: 'http://localhost:3000'
})

instance.interceptors.request.use(config => {
  const token = sessionStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, err => {
  return Promise.reject(err)
})

instance.interceptors.response.use(response => {
  return response
}, err => {
  return Promise.reject(err)
})

export default instance
