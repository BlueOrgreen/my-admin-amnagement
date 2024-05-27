import Auth from '@/components/Auth'
import Exception from '@/components/Exception'

import type { PropsWithChildren } from 'react'

type AuthPageProps = {
  authority: string
}

function AuthPage(props: PropsWithChildren<AuthPageProps>) {
  const { authority, children } = props
  return (
    <Auth authority={authority} notMatch={<Exception status="403" />}>
      {children}
    </Auth>
  )
}

export default AuthPage
