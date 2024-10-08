import axios from 'axios'
import qs from 'qs'
// import { storage } from '@mango-kit/utils'

// import NormalNotification from '@/components/NormalNotification'
import { notification } from 'antd'

import { baseURL } from '@/config/config'

// import sso from './sso'

import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

export type IResult = {
  code: number
  message: string
  msg?: string
  data: any
  headers?: Record<string, any>
}

export type AxiosTipOptions = {
  success?: boolean
  error?: boolean
  successText?: string
  errorText?: string
}

const getBlobText = (blob: Blob) =>
  new Promise<IResult>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => {
      let result: IResult = {
        code: 600,
        message: '请求失败',
        data: {},
      }
      try {
        result = JSON.parse(reader.result as any)
      } catch {
        result = {
          code: 600,
          message: '请求失败',
          data: {},
        }
      }
      resolve(result)
    }
    reader.readAsText(blob)
  })

// 状态码错误信息
const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  600: '网络未连接或请求配置发生错误。',
}

const whiteList: string[] = [
  '/api/service-upms/admin/user/login',
  '/api/service-upms/admin/user/forgetPassword',
]

async function request(
  options: AxiosRequestConfig,
  tipOptions?: AxiosTipOptions,
) {
  const token = localStorage.getItem('TOKEN')
  const user_name = localStorage.getItem('USER_NAME')

  // TODO 暂时没有 Token
  // if (!whiteList.includes(options?.url ?? '') && !token) {
  //   // sso.login()
  //   return {
  //     code: 401,
  //     message: codeMessage[401],
  //     data: {},
  //   }
  // }
  const defaultOptions: AxiosRequestConfig = {
    method: 'GET',
    // baseURL,
    paramsSerializer: function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    },
  }
  const newOptions: AxiosRequestConfig = {
    ...defaultOptions,
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'X-corp-token_name': `${encodeURIComponent(user_name)}`,
      ...(options.headers ?? {}),
    },
  }
  let result: IResult = {
    code: 201,
    message: 'loading...',
    data: {},
  }
  const upperCaseMethod = newOptions?.method?.toUpperCase?.() ?? 'GET'
  let defaultTipOptions: AxiosTipOptions = {}
  if (upperCaseMethod === 'GET') {
    defaultTipOptions = {
      success: false,
      error: true,
    }
  } else {
    defaultTipOptions = {
      success: true,
      error: true,
    }
  }
  const newTipOptions: AxiosTipOptions = {
    ...defaultTipOptions,
    ...tipOptions,
  }
  try {
    const response: AxiosResponse = await axios(newOptions)
    if (newOptions.responseType === 'blob') {
      if (response.data.type === 'application/json') {
        result = await getBlobText(response.data)
      } else {
        result = {
          code: 0,
          message: '',
          data: response.data,
          headers: response.headers,
        }
      }
    } else {
      result = { headers: response.headers, ...response?.data } ?? {}
    }
  } catch (error) {
    console.error(error)
    const { response: { status = 600, statusText = '', data } = {} } =
      error as AxiosError<IResult>
    result = {
      code: data?.code || status,
      message: data?.message || codeMessage[status] || statusText,
      data: {},
    }
  }
  switch (result.code) {
    case 0:
      if (newTipOptions.success) {
        notification.success({
          message: '请求成功',
          description:
            newTipOptions.successText || result.message || '网络请求成功！',
        })
      }
      break
    case 401:
      notification.warning({
        message: `请求失败：${result.code || 600}`,
        description:
          newTipOptions.errorText ||
          result?.msg ||
          result?.message ||
          '网络请求遇到了点问题～',
      })
      // sso.login()
      break
    default:
      if (newTipOptions.error) {
        notification.warning({
          message: `请求失败：${result.code || 600}`,
          description:
            newTipOptions.errorText ||
            result?.msg ||
            result?.message ||
            '网络请求遇到了点问题～',
        })
      }
  }
  return result
}

export default request
