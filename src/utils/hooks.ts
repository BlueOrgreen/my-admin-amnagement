import { useSearchParams } from 'react-router-dom'
import { useMount } from 'ahooks'
import { App } from 'antd'

/**
 * @param queryList
 * @returns 获取 url 的 query参数 Eg: const { id } = useQuery()
 */
export const useQuery = (queryList?: string[]) => {
  const { message } = App.useApp()
  const [params] = useSearchParams()

  const p: Record<string, string> = {}
  params.forEach((value, key) => {
    p[key] = value
  })

  useMount(() => {
    if (queryList?.find((query: string) => !p[query])) {
      message.error('参数错误')
    }
  })

  return p
}

export const getPlatform = () => {
  const ua = navigator.userAgent
  const isWindowsPhone = /(?:Windows Phone)/.test(ua)
  const isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
  const isAndroid = /(?:Android)/.test(ua)
  const isFireFox = /(?:Firefox)/.test(ua)
  const isTablet =
    /(?:iPad|PlayBook)/.test(ua) ||
    (isAndroid && !/(?:Mobile)/.test(ua)) ||
    (isFireFox && /(?:Tablet)/.test(ua))
  const isIPhone = /(?:iPhone)/.test(ua) && !isTablet
  const isPc = !isIPhone && !isAndroid && !isSymbian
  const isWechat = ua.toLowerCase().indexOf('micromessenger') !== -1
  const isDingTalk = ua.toLowerCase().indexOf('dingtalk') !== -1

  return {
    isTablet,
    isIPhone,
    isAndroid,
    isPc,
    isWechat,
    isDingTalk,
  }
}
