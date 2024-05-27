import { useMenuStore } from '@/store'

import type { PropsWithChildren } from 'react'
import type React from 'react'

export type AuthProps = {
  authority: string
  notMatch?: React.ReactNode
}

function Auth(props: PropsWithChildren<AuthProps>) {
  const { authority, notMatch = null, children } = props
  const { authorityList } = useMenuStore()
  console.log('Auth', authorityList, authority)

  if (authorityList.includes(authority)) {
    return children
  }
  return notMatch
}

export default Auth
