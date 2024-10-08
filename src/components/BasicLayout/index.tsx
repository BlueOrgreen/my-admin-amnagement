import { useState } from 'react'
import { useMount } from 'ahooks'
import { ProLayout } from '@ant-design/pro-components'
import { Dropdown, Tag } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { LogoutOutlined } from '@ant-design/icons'

import avatar from '@/assets/images/avatar.png'
import { sleep } from '@/utils/utils'
import logo from '@/assets/images/logo.png'
import { useMenuStore, useUserStore } from '@/store'

import PageContent, { PageContentStatus } from '../PageContent'

import type { ExceptionProps } from '../Exception'

const env = process.env.REACT_APP_API_ENV

const BasicLayout: React.FC<{}> = () => {
  const [status, setStatus] = useState(PageContentStatus.LOADING)
  const { userInfo, token, login, logout, getUserInfo } = useUserStore()
  const { fetchMenuList, menuList } = useMenuStore()
  const location = useLocation()

  const [exceptionProps, setExceptionProps] = useState<ExceptionProps>({})

  const initialize = async () => {
    // if(errorResult) {
    //   if(errorResult.code === 401) {

    //   } else {}
    // }
    // const [userResult] = await Promise.all([appService.fetchUser()])
    await getUserInfo()
    await fetchMenuList()
    await sleep(1500)
    // 401
    // setExceptionProps({
    //   title: '正在跳转登录中',
    //   description: '您还没登录或者登录已过期，正在跳转登录中...',
    // })
    // setStatus(PageContentStatus.LOADING)

    // 500
    // setExceptionProps({
    //   title: '500: 失败',
    //   description: '发生了一些错误',
    // })
    // setStatus(PageContentStatus.ERROR)

    setStatus(PageContentStatus.SUCCESS)
  }

  useMount(() => {
    initialize()
  })
  console.log('menuList', menuList)

  return (
    <PageContent exceptionProps={exceptionProps} status={status}>
      <div
        id="index-pro-layout"
        style={{
          height: '100vh',
          overflow: 'auto',
          background: 'linear-gradient(#ffffff, #f5f5f5 28%)',
        }}
      >
        <ProLayout
          avatarProps={{
            src: userInfo?.images || avatar,
            size: 'small',
            title: userInfo?.name || '阿喜',
            render: (_props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                      },
                    ],
                    onClick: () => {
                      logout()
                    },
                  }}
                  placement="bottomRight"
                >
                  {dom}
                </Dropdown>
              )
            },
          }}
          breadcrumbProps={{
            itemRender: (item) => {
              return item.title;
            }
          }}
          headerTitleRender={(logo, title) => {
            return (
              <>
                {logo}
                {title}
                {env ? (
                  <Tag color="#52c41a" style={{ marginLeft: 8 }}>
                    {env}
                  </Tag>
                ) : null}
              </>
            )
          }}
          layout="mix"
          location={location}
          logo={logo}
          menuItemRender={(item, dom) => {
            return <Link to={item.path}>{dom}</Link>
          }}
          route={{
            path: '/',
            children: menuList,
          }}
          title={'管理系统'}
          token={{
            header: {
              colorBgHeader: '#292f33',
              colorHeaderTitle: '#fff',
              colorTextRightActionsItem: '#dfdfdf',
            },
            pageContainer: {
              paddingBlockPageContainerContent: 0,
              paddingInlinePageContainerContent: 0,
              colorBgPageContainer: '#fff',
            },
            sider: {
              colorMenuBackground: '#fff',
            },
          }}
        >
          <Outlet />
        </ProLayout>
      </div>
    </PageContent>
  )
}

export default BasicLayout
