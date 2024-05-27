import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import Exception from '@/components/Exception'
import BasicLayout from '@/components/BasicLayout'
import AuthPage from '@/components/AuthPage'
import Application from '@/pages/application'

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
    ],
  },
  {
    path: '/login',
    element: <div>login</div>,
  },
])

export default router
