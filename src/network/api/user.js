
import axios from '../axios'
export const getUserList = (num, size, query) => {
  return axios.get(`/api/users/${num}/${size}`, {
    params: query
  })
}
export const addUser = (params) => {
  return axios.post('/api/users/add', params)
}
export const updateUser = (params) => {
  return axios.post('/api/users/update', params)
}
export const deleteUser = (params) => {
  return axios.post('/api/users/delete', params)
}
