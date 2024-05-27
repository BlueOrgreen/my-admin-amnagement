import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App } from 'antd'

import router from './router'

function Application() {
  // useAsyncEffect(async () => {
  //   await browserSupportDetecter()
  //   setIsBrowserSupportDetecterDone(true)

  //   console.log(
  //     `%c 构建时间：${process.env.REACT_APP_BUILD_TIME}`,
  //     'color: #bada55',
  //   )
  //   console.log(
  //     `%c REACT_APP_API_ENV：${process.env.REACT_APP_API_ENV}`,
  //     'color: #bada55',
  //   )
  //   console.log(
  //     `%c REACT_APP_MOCK：${process.env.REACT_APP_MOCK}`,
  //     'color: #bada55',
  //   )
  // }, [])

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 4,
        },
      }}
    >
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  )
}

export default Application
