import axios from '../axios'

export const checkLogin = (params) => {
  return axios.get('/api/admin/login', { params })
}

export const checkToken = () => {
  return axios.get('api/check/token')
}

export const getAdminInfo = () => {
  return axios.get('/api/admin/info')
}
