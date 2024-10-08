import {
  FooterToolbar,
  PageContainer,
  ProForm,
  EditableProTable,
  ProFormText,
} from '@ant-design/pro-components'
import { Card, message } from 'antd'
import { useState } from 'react'

import { waitTime } from '@/utils/utils'

import type { ProColumns } from '@ant-design/pro-components'

type DataSourceType = {
  id: React.Key
  title?: string
  decs?: string
  state?: string
  created_at?: number
  children?: DataSourceType[]
}

const defaultData: DataSourceType[] = [
  {
    id: 624748504,
    title: '活动名称一',
    decs: '这个活动真好玩',
    state: 'open',
    created_at: 1590486176000,
  },
  {
    id: 624691229,
    title: '活动名称二',
    decs: '这个活动真好玩',
    state: 'closed',
    created_at: 1590481162000,
  },
]

const Application = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map((item) => item.id),
  )

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '活动名称',
      dataIndex: 'title',
      width: '30%',
    },
    {
      title: '状态',
      key: 'state',
      dataIndex: 'state',
      valueType: 'select',
      valueEnum: {
        all: { text: '全部', status: 'Default' },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
        },
      },
    },
    {
      title: '描述',
      dataIndex: 'decs',
      // renderFormItem: (_, { record }) => {
      //   return <Input addonBefore={(record as any)?.addonBefore} />
      // },
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ]

  return (
    <PageContainer title="输入表单">
        <ProForm
          submitter={{
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (values) => {
            await waitTime(2000)
            console.log(values)
            message.success('提交成功')
          }}
        >
          <ProForm.Group>
            <ProFormText
              label="签约客户名称"
              name="name"
              placeholder="请输入名称"
              tooltip="最长为 24 位"
            />
            <ProFormText
              label="我方公司名称"
              name="company"
              placeholder="请输入名称"
              width="md"
            />
          </ProForm.Group>
          <ProForm.Item
            initialValue={defaultData}
            label="数组数据"
            name="field"
            trigger="onValuesChange"
          >
            <EditableProTable<DataSourceType>
              columns={columns}
              editable={{
                type: 'multiple',
                editableKeys,
                onChange: setEditableRowKeys,
                actionRender: (row, _, dom) => {
                  return [dom.delete]
                },
              }}
              recordCreatorProps={{
                newRecordType: 'field1222',
                position: 'bottom',
                record: () => ({
                  id: Date.now(),
                  // addonBefore: 'ccccccc',
                  decs: '初始化描述',
                }),
              }}
              rowKey="id"
              toolBarRender={false}
            />
          </ProForm.Item>
        </ProForm>
    </PageContainer>
  )
}

export default Application
