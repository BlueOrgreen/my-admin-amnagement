import { PageContainer } from '@ant-design/pro-components'
import { Button, Card, DatePicker, Form, Input, message, Select } from 'antd'
import { DragSortTable } from '@ant-design/pro-components'
import { useState } from 'react'
import './index.less'
import type { ProColumns } from '@ant-design/pro-components'
import clsx from "classnames"
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'


const Organization = () => {

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


  

  return (
    <PageContainer title="系统权限">
      <div className='page-search'>
        <div className='page-flex'>
            <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                <div className='page-flex'>
                <Form.Item label="国家/地区" name="region">
                    <Select placeholder="请选择国家地区" />
                </Form.Item>
                <Form.Item label="用户昵称/ID" name="region">
                    <Input placeholder="请输入用户昵称/ID" />
                </Form.Item>
                <Form.Item label="用户手机号" name="region">
                    <Input placeholder="请输入用户手机号" />
                </Form.Item>
                <Form.Item label="用户邮箱" name="region">
                <Input placeholder="请输入用户邮箱" />
                </Form.Item>
                <Form.Item label="变动类型" name="region">
                    <Select placeholder="请选择变动类型" />
                </Form.Item>
                <Form.Item label="变动时间" name="time"  labelCol={{ span: 4 }} wrapperCol={{ span: 12 }}>
                    <DatePicker.RangePicker />
                </Form.Item>
                </div>
            </Form>
        </div>
        <div className={clsx('search-btns', 'border-left')}>
            <Button
                type="primary"
                icon={<SearchOutlined />}
            >   
                查询
            </Button>
            <Button
                icon={<SyncOutlined />}
            >   
                重置
            </Button>
        </div>
      </div>
    </PageContainer>
  )
}

export default Organization
