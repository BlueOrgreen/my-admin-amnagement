import React from 'react'

import PageLoading from '@/components/PageLoading'
import Exception from '@/components/Exception'

import type { ExceptionProps } from '@/components/Exception'
import type { PropsWithChildren } from 'react'

export enum PageContentStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type PageContentProps = {
  status: PageContentStatus
  exceptionProps?: ExceptionProps
}

function PageContent(props: PropsWithChildren<PageContentProps>) {
  const { status, exceptionProps, children } = props

  if (status === PageContentStatus.LOADING) {
    return <PageLoading />
  }

  if (status === PageContentStatus.ERROR) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Exception status="500" {...exceptionProps} />
  }

  if (status === PageContentStatus.SUCCESS) {
    return children
  }
}

export default PageContent
