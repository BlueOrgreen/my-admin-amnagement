import { PageContainer } from '@ant-design/pro-components'
import { Card, message } from 'antd'
import { DragSortTable } from '@ant-design/pro-components'
import { useState } from 'react'

import type { ProColumns } from '@ant-design/pro-components'

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Joe Black',
    age: 33,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Joe Black',
    age: 35,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Joe Black',
    age: 36,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Joe Black',
    age: 37,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Joe Black',
    age: 38,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Joe Black',
    age: 39,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 40,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'Joe Black',
    age: 40,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '11',
    name: 'Joe Black',
    age: 40,
    address: 'Sidney No. 1 Lake Park',
  },
]

const SystemPermission = () => {
  const [dataSource, setDataSource] = useState(data)

  const columns: ProColumns[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      className: 'drag-visible',
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
  ]

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    console.log('排序后的数据', newDataSource)
    setDataSource(newDataSource)
    message.success('修改列表排序成功')
  }
  

  return (
    <PageContainer title="系统权限">
        <DragSortTable
          columns={columns}
          dataSource={data}
          dragSortKey="sort"
          // headerTitle="拖拽排序(默认把手)"
          rowKey="key"
          search={false}
          toolBarRender={false}
          onDragSortEnd={handleDragSortEnd}
        />
    </PageContainer>
  )
}

export default SystemPermission
