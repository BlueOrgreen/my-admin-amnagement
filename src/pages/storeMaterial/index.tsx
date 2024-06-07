import { PlusOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { useToggle } from 'ahooks'
import { Button, Card } from 'antd'

import FormAddDrawer from './components/FormAddDrawer'

const StoreMaterial = () => {
  const [open, { toggle: toggleOpen }] = useToggle(false)

  const handleAdd = () => {
    toggleOpen()
  }

  const handleCloseDrawer = () => {
    toggleOpen()
  }

  return (
    <PageContainer title="系统权限">
      <Card>
        <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
          新建素材
        </Button>
      </Card>
      <FormAddDrawer open={open} onClose={handleCloseDrawer} />
    </PageContainer>
  )
}

export default StoreMaterial
