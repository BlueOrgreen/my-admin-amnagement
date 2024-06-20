import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Exception from '@/components/Exception'
import BasicLayout from '@/components/BasicLayout'
import AuthPage from '@/components/AuthPage'
import Application from '@/pages/application'
import SystemPermission from '@/pages/permission'
import StoreMaterial from '@/pages/storeMaterial'
import DeviceDimesion from '@/pages/deviceDimesion'

const router = createBrowserRouter([
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <Exception status="404" />,
    children: [
      {
        path: '/application',
        element: (
          <AuthPage authority="APPLICATION_VIEW">
            <Application />
          </AuthPage>
        ),
      },
      {
        path: '/permission/config/system',
        element: (
          <AuthPage authority="PERMISSION_CONFIG_SYSTEM_LIST">
            <SystemPermission />
          </AuthPage>
        ),
      },
      {
        path: '/content/store-materia',
        element: <StoreMaterial />,
      },
      {
        path: '/device/device-dimension',
        element: <DeviceDimesion />,
      },
    ],
  },
  {
    path: '/login',
    element: <div>login</div>,
  },
])

export default router
