export const fetchUser = (): Promise<{
  code: number
  data: any
  message: string
}> => {
  return new Promise((resolve) => {
    resolve({
      code: 0,
      message: 'success',
      data: {
        id: 1,
        wechatUserid: '020137276625343844',
        dingUserid: '020137276625343844',
        jobNumber: '1',
        name: '超级管理员',
        englishName: '',
        email: 'admin@heytea.com',
        mobile: '15818711297',
        resettingPassword: true,
        position: '',
        isAllShop: true,
        sex: '男',
        images: '',
        status: 1,
        sourceType: 0,
        shopCount: 559,
        roleIdList: [1, 14139, 14140, 8013, 5007, 14129],
        tipUpdatePassword: false,
        passwordLastUpdateDay: 20,
      },
    })
  })
}
