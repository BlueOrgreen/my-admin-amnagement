import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { fetchUser } from '@/service/user'
// import { storage } from '@mango-kit/utils'

// import { createMenu, createAuthList } from '@/router'
// import * as API from '@/services/user'
// import sso from '@/utils/sso'

// import type { OriginPriv, MenuConfig, AuthList } from '@/router'

type UserStore = {
  token: string
  userInfo: Record<string, any>
  // menuConfig: MenuConfig
  // authList: AuthList
  login: () => void
  getUserInfo: () => Promise<boolean>
  getAuthList: () => Promise<boolean>
  logout: () => void
}

const useUserStore = create<UserStore>()(
  devtools((set, get) => ({
    token: localStorage.getItem('TOKEN'),
    userInfo: {},
    authList: [],
    menuConfig: [],
    login: async () => {
      // return sso.login()
    },
    getUserInfo: async () => {
      const { code, data } = await fetchUser()
      if (code === 0) {
        localStorage.setItem('USER_NAME', data?.name)
        set({ userInfo: data })
        return true
      } else {
        return false
      }
    },
    // getAuthList: async () => {
    //   const { code, data } = await API.getPriv()
    //   if (code === 0) {
    //     const { moduleList = [] } = data
    //     const list: OriginPriv =
    //       moduleList?.find((i: any) => i?.path === '/cdp')?.navList ?? []
    //     set({ menuConfig: createMenu(list), authList: createAuthList(list) })
    //     return true
    //   } else {
    //     return false
    //   }
    // },
    logout: () => {
      set({ token: '' })
      localStorage.removeItem('TOKEN')
      // sso.logout()
    },
  })),
)

export default useUserStore
