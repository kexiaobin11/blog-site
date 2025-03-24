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

// 请求拦截器 todo, 后台采用 x-auth-token，此处需要进行修正
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
  return new Promise<any>((resolve, reject) => {
    axios({
      timeout: arr.timeout === undefined ? 10000 : arr.timeout, // 请求超时
      url: arr.url,
      method: arr.type || 'POST', // 默认为 POST
      headers: {
        'content-type': arr.contentType
          ? arr.contentType
          : arr.json
            ? 'application/json; charset=UTF-8'
            : 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      params: arr.params || {}, // 默认使用空对象
      data: arr.data || null, // 如果没有数据，默认为 null
      responseType: arr.responseType || 'json',
    })
      .then((response: AxiosResponse<any>) => {
        const responseStatus = `${response.status}`;
        if (responseStatus.charAt(0) === '2') {
          if (response.data.code === '1' || response.data.code === 'err_9999') {
            ElMessage({
              type: 'error',
              message: response.data.message,
            });
            reject(response.data);
            return;
          }
          resolve(response.data);
        } else {
          ElMessage({
            type: 'error',
            message: response.data.message,
          });
          reject(response.data);
        }
      })
      .catch((err) => {
        ElMessage({
          type: 'error',
          message: err.message,
        });
        reject(err); // Reject the promise with error
      });
  });
}
