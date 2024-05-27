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
