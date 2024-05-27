/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Spin } from 'antd'

import './index.less'

import type { SpinProps } from 'antd'

type PageLoadingProps = SpinProps

function PageLoading(props: PageLoadingProps) {
  return (
    <div className="ht-page-loading">
      <Spin size="large" {...props}>
        <div className="ht-page-loading-content" />
      </Spin>
    </div>
  )
}

export default PageLoading
