import router from '@/router'
import { useUserStore } from '@/stores'
import axios, { AxiosError, type Method } from 'axios'
import { showToast } from 'vant'
export const BASE_URL = 'api'
//axios实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    const store = useUserStore()
    if (store.user?.token && config.headers) {
      config.headers.Authorization = `Bearer ${store.user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code !== 10000) {
      //错误提示，返回错误的promise
      showToast(res.data.message || '未知错误')
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err: AxiosError) => {
    //处理401错误
    if (err.response?.status === 401) {
      //清除用户信息
      const store = useUserStore()
      store.deleteUser()

      //跳转到登录页，携带当前访问页面的地址（包含参数）
      router.replace({
        path: '/login',
        query: { returnUrl: router.currentRoute.value.fullPath }
      })
    }
    return Promise.reject<AxiosError>(err)
  }
)

export default instance

type ReturnData<T> = {
  code: number
  message: string
  data: T
}

//封装请求函数
export const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData: object
) => {
  return instance.request<any, ReturnData<T>, any>({
    url,
    method,
    [method.toUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}
