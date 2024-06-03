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
