import dayjs, { Dayjs } from "dayjs"

export const sleep = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null)
    }, time)
  })

export const getAuthority = (data: any, currentAuthority: string[] = []) => {
  data?.forEach?.((item: any) => {
    if (item.privType === 0 && item.path) {
      currentAuthority.push(item.path)
    }
    getAuthority(item.children, currentAuthority)
  })
  return currentAuthority
}

/**
 * @param arr 原始数组
 * @param elementToInsert 插入元素
 * @param n 每隔步数
 * @description 每隔 n 往数组arr中插入 elementToInsert
 */
export const insertEveryNth = (arr: any[], elementToInsert: any, n: number) => {
  for (let i = 1; i < arr.length; i += n + 1) {
    arr.splice(i, 0, elementToInsert)
  }
  return arr
}

/**
 * @param arr 原数组
 * @param parent 父元素
 * @returns 将树形结构拍平 并且显示其父元素
 */
export function dig<T>(arr: T[], parent: T[] = []): (T & { parent: T[] })[] {
  return arr
    .map((item: any) => [
      { ...item, parent },
      ...(item?.children?.length ? dig(item?.children, [item, ...parent]) : []),
    ])
    .flat(Infinity)
}

export const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

/**
 *  @param {Dayjs} current 选择的时间
 * @param {Dayjs} allowedStartTime 允许的开始时间
 * @param {Dayjs} allowedEndTime 允许的结束时间
 * @returns  返回：时间选择器可以选择的时分秒区间(如果是今天泽返回 现在之后的时间; 如果是未来则返回传入的范围时间)
 */
export const datePickerDisabledTime = (current: Dayjs, allowedStartTime: Dayjs, allowedEndTime: Dayjs) => {
  const now = dayjs()
  const isToday = current.isSame(now, 'day')
  return {
    disabledHours: () => {
      const startHour = allowedStartTime.hour()
      const endHour = allowedEndTime.hour()
      const currentHour = now.hour()

      return [...Array(24).keys()].filter(
        (hour) =>
          hour < startHour ||
          hour > endHour ||
          (isToday && hour < currentHour),
      )
    },
    disabledMinutes: (selectedHour: number) => {
      const currentMinute = now.minute()

      if (
        selectedHour === allowedStartTime.hour()
      ) {
        return [...Array(60).keys()].filter(
          (minute) =>
            minute < allowedStartTime.minute(),
        )
      }
      if (selectedHour === allowedEndTime.hour()) {
        return [...Array(60).keys()].filter(
          (minute) =>
            minute > allowedEndTime.minute(),
        )
      }
      if (isToday && selectedHour === now.hour()) {
        return [...Array(60).keys()].filter(
          (minute) => minute < currentMinute,
        )
      }
      return []
    },
    disabledSeconds: (
      selectedHour: number,
      selectedMinute: number,
    ) => {
      const currentSecond = now.second()

      if (
        selectedHour === allowedEndTime.hour() &&
        selectedMinute === allowedEndTime.minute()
      ) {
        return [...Array(60).keys()].filter(
          (second) => second > 0,
        )
      }
      if (
        isToday &&
        selectedHour === now.hour() &&
        selectedMinute === now.minute()
      ) {
        return [...Array(60).keys()].filter(
          (second) => second < currentSecond,
        )
      }
      return []
    },
  }
}

interface FileData {
  url: string
  name: string
}

export function formatFileData(
  data?: string | FileData[],
  fileName?: string,
): FileData[] {
  if (typeof data === 'string') {
    try {
      const parsedData = JSON.parse(data)
      if (Array.isArray(parsedData)) {
        // 输入的是对象数组，直接返回
        return parsedData
      } else {
        // 输入的是单个对象，封装成数组后返回
        return [{ url: parsedData.url || '', name: parsedData.name || '' }]
      }
    } catch (error) {
      // 解析失败，返回空数组
      return data ? [{ url: data, name: fileName || data }] : []
    }
  } else if (Array.isArray(data)) {
    // 输入的是对象数组，直接返回
    return data
  } else {
    // 输入类型不符合预期，返回空数组
    console.log('Input data must be a string or an array of objects')
    return []
  }
}