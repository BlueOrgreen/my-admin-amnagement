import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App } from 'antd'
import { theme } from './utils/const'
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
          colorPrimary: theme.primary,
          borderRadius: 4,
        },
        components: {
          // Input: {
          //   colorBorder: theme.defaultBorderColor,
          //   colorBgContainer: theme.colorBgContainer,
          //   activeBg: theme.itemSelectedColor,
          //   // activeBorderColor: theme.defaultBorderColor,
          //   activeBorderColor: 'red',
          // },
          // Select: {
          //   colorBorder: theme.defaultBorderColor,
          //   colorBgContainer: theme.colorBgContainer,
          // },
          Select: {
            colorBorder: 'transparent',
            hoverBorderColor: theme.defaultBorderColor,
            selectorBg: theme.colorBgContainer,
          },
          Input: {
            /* 这里是你的组件 token */
            colorBgContainer: theme.colorBgContainer,
            colorBorder: 'transparent',
            hoverBorderColor: theme.defaultBorderColor,
            activeBg: theme.defaultBorderColor,           
          },
          DatePicker: {
            colorBorder: theme.defaultBorderColor,
            colorBgContainer: theme.colorBgContainer,
            hoverBorderColor: theme.defaultBorderColor,
            activeBg: theme.defaultBorderColor,
          },
          Table: {
            headerBg: '#F2F3F5'
          },
          Button: {
            // colorInfoBorder: 'red',
            defaultBg: theme.defaultBg,
            defaultBorderColor: theme.defaultBorderColor,
            borderRadius: 3,
            contentFontSize: 14,
            controlHeight: 28,
            colorLink: theme.primary,
            colorLinkHover: theme.grayPrimary
          },
        }
      }}
    >
      <App>
        <RouterProvider router={router} />
      </App>
    </ConfigProvider>
  )
}

export default Application
