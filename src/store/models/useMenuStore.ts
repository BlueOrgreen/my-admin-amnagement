import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { fetchMenuList } from '@/service/menu'
import { getAuthority } from '@/utils/utils'

type MenuStore = {
  fetchMenuList: () => Promise<boolean>
  menuList: any[]
  authorityList: any[]
}

const useMenuStore = create<MenuStore>()(
  devtools((set, get) => ({
    menuList: [],
    authorityList: [],
    fetchMenuList: async () => {
      const { data, code } = await fetchMenuList()
      const currentAuthority = getAuthority(data)
      set({ authorityList: currentAuthority })
      if (code === 0) {
        set({ menuList: data })
        return true
      } else {
        return false
      }
    },
  })),
)

export default useMenuStore
