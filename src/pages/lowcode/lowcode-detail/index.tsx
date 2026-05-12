import React from 'react'
import { loadRemote } from '@module-federation/runtime'
import { createRemoteAppComponent } from "@module-federation/bridge-react"

// 使用原始 Bridge API 创建远程 App 组件
const RemoteApp = createRemoteAppComponent<Record<string, unknown>, 'default'>({
  loader: () => loadRemote('fe_runtime_remote/export-app') as Promise<Record<string, unknown>>,
  export: 'default',
  loading: <div className="loading">加载远程组件中...</div>,
  fallback: ({ error }: { error: Error }) => (
    <div className="error">加载失败: {error.message}</div>
  ),
})

function LowcodeDetail() {
  return (
    <div>
        <RemoteApp />
    </div>
  )
}

export default LowcodeDetail