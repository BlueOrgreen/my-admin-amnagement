import type { SetStateAction } from 'react'
import type React from 'react'

/**
 *
 * @param val 输入的值
 * @returns 数字校验 大于0且小等于100
 */
export const numberValidator = (
  val: string,
  statusVisible: boolean,
  callback: React.Dispatch<SetStateAction<boolean>>,
) => {
  if (/^[1-9][0-9]?$|^100$/.test(val)) {
    if (!statusVisible) callback(true)
    return Promise.resolve()
  } else {
    if (statusVisible) {
      callback(false)
    }
    return Promise.reject(new Error('输入大于0且小等于100的整数值'))
  }
}

/**
 * @description 发放额度校验 大等于 0 且小等于 1百万
 */
export const amountValidator = (val: string) => {
  if (!val) {
    return Promise.reject(new Error('请输入发放额度'))
  }
  if (Number(val) <= 0) {
    return Promise.reject(new Error('请输入大于0的数值'))
  }
  if (Number(val) > 1000000) {
    return Promise.reject(new Error('请输入小等于1000000的数值'))
  }
  if (/^[0-9]*\.\d{3,}$/.test(val)) {
    return Promise.reject(new Error('小数点后至多2位数字'))
  }
  return Promise.resolve()
}

// 校验规则：只允许汉字
export const validateChinese = (_, value) => {
  if (!value) return Promise.resolve()
  const regex = /^[\u4e00-\u9fa5]*$/ // 匹配汉字，可为空
  if (regex.test(value)) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('只能输入汉字'))
}
