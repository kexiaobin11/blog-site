import Axios, {Method, ResponseType, AxiosResponse, AxiosRequestConfig} from 'axios'
import {ElMessage} from 'element-plus'

interface IAxiosData {
  url: string
  method: Method
  headers?: any
  json: boolean
  contentType?: string
  data?: any
  params?: any
  timeout?: number
  responseType?: ResponseType
}

const axios = Axios.create({
  timeout: 20000
})

// 允许携带cookie
axios.defaults.withCredentials = true
// 请求头信息
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
// 默认使用 application/json 形式
axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
// axios.interceptors.request.use((config: AxiosRequestConfig) => {
//   if (sessionStorage.getItem('accessToken')) {
//     config.headers.Authorization = `Bearer ${sessionStorage.getItem('accessToken')}`
//   }
//   return config
// }, error => Promise.reject(error))

// 响应拦截器
axios.interceptors.response.use((res: AxiosResponse) => res, (error: any) => {
  if (err.response && err.response.data) {
    const code = err.response.status
    const msg = err.response.data.message
    ElMessage.error(`Code: ${code}, Message: ${msg}`)
  } else {
    ElMessage.error(`${err}`)
  }
  return Promise.reject(err)
})


/** *
 * axios({url,method,content,params,datas})
 *
 * @param {string}  url，(必填)
 * @param {string}  method,默认post
 * @param {boolean} json, content-type类型，(必填)
 * @param {object}  params
 * @param {object}  datas  //token在datas中
 *
 */

export default function request(arr: IAxiosData) {
  console.log(arr.params)
  return new Promise<any>((resolve, reject) => {
    axios({
      timeout: arr.timeout ?? 10000,
      url: arr.url,
      method: arr.method || 'POST',
      headers: {
        'Content-Type': arr.contentType ?? (arr.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8')
      },
      params: arr.method === 'GET' ? arr.params : undefined,  // ✅ GET 请求时使用 params
      data: arr.method !== 'GET' ? arr.data : undefined,  // ✅ POST/PUT 请求时使用 data
      responseType: arr.responseType || 'json'
    })
      .then((response: AxiosResponse<any>) => {
        const responseStatus = `${response.status}`;
        if (responseStatus.startsWith('2')) {  // ✅ 兼容 200~299 的成功状态
          resolve(response.data);
        } else {
          ElMessage.error(response.data.message || '请求失败');
          reject(response.data);
        }
      })
      .catch((err) => {
        ElMessage.error(err.message || '请求异常');
        reject(err);  // ✅ 确保外层 `await` 能收到错误
      });
  });
}
