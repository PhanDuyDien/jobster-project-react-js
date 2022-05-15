import axios from 'axios'
import { clearStore } from '../features/userSlice'
import { getUserFromLocalStorage } from './localStorage'

const customeFetch = axios.create({
  baseURL: 'https://jobify-prod.herokuapp.com/api/v1/toolkit',
})

customeFetch.interceptors.request.use(
  (config) => {
    const user = getUserFromLocalStorage()
    if (user) {
      config.headers.common['Authorization'] = `Bearer ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(clearStore())
    return thunkAPI.rejectWithValue('Lỗi xác thực!Đăng xuất...')
  }
  return thunkAPI.rejectWithValue(error.response.data.msg)
}

export default customeFetch
