import React, { useEffect, useMemo, useState } from 'react'
import styles from './index.module.less'
import { Form, Input, message, Upload } from 'antd'
import { resolveName } from '@/utils/utils'
import { PlusOutlined } from '@ant-design/icons'
import { FormInstance } from 'antd/es/form'
import WangEditor from '@/components/WangEditor'
// import config from 'config/config'
import { v4 as uuid } from 'uuid';

import { isNil } from 'lodash'
import { formatNumberToChinese } from '../../../utils'

type OperationStepProps = {
  name: number
  index: number
  form: FormInstance
  value?: any
}

const accept = '.jpg,.png'

function OperationStep(props: OperationStepProps) {
  const { name, index, value } = props

  const getHeaders = () => {
    const token = localStorage.getItem('token')
    return {
      Authorization: `Bearer ${token}`,
    }
  }

  const getAction = () => {
    return (
      // config.issURL +
      '/api/service-shop-common/admin/file/operation/uploadByQiniu?serviceType=6'
    )
  }

  const beforeUpload = (file: any) => {
    // 检测文件类型
    if (!accept.includes((file as File).name.split('.').pop() || '')) {
      message.error(`请上传${accept}格式的图片`)
      return false
    }
    // 检测文件大小
    if (file.size / 1024 > 500) {
      message.error('文件大小不能超过500KB')
      return false
    }
    return true
  }

  const fileList = useMemo(() => {
    if (value && value.imgUrlList) {
      value.imgUrlList = value.imgUrlList
        .map((item: any) => {
          if (isNil(item)) {
            return false
          }
          if (typeof item === 'string') {
            return {
              uid: uuid(),
              url: item,
            }
          } else {
            return item
          }
        })
        .filter((it: any) => !!it)
      return value.imgUrlList
    }
    return []
  }, [value])

  return (
    <div className={styles['operation-step-card']}>
      <div className={styles['operation-step-card-step']}>
        <Form.Item
          style={{ marginBottom: '0px' }}
          className={styles['operation-step-card-step-formitem']}
        >
          <div>第{formatNumberToChinese(index + 1)}步</div>
        </Form.Item>
        <Form.Item
          name={resolveName(name, 'detail')}
          style={{ marginBottom: '12px' }}
          rules={[{ required: true, message: '请输入内容' }]}
        >
          <WangEditor
            style={{ height: '85px', margin: '8px 12px' }}
            className={styles['operation-step-card-editor']}
            toolbarConfig={{
              toolbarKeys: [
                'bold', // 加粗
                'color', // 字体颜色
              ],
            }}
            defaultSize={18}
            editorConfig={{
              maxLength: 200,
              MENU_CONF: {
                color: {
                  colors: ['#000000', '#41B878'], // 只允许黑色和绿色
                },
                fontSize: {
                  // 配置支持的字体大小
                  fontSizeList: ['28px', '14px', '16px', '20px'], // 自定义字号列表
                },
              },
            }}
          />
        </Form.Item>
      </div>
      <div className={styles['operation-step-card-images']}>
        <Form.Item
          style={{ marginBottom: '0px' }}
          noStyle
          name={resolveName(name, 'imgUrlList')}
          getValueFromEvent={({ fileList }) => {
            return fileList
              .map((item) => {
                if (item.size / 1024 > 500) {
                  return false
                }
                if (item?.response?.data) {
                  return item?.response?.data.urls
                } else {
                  return item
                }
              })
              .filter((it) => !!it)
          }}
        >
          {/* <ImageUpload
            accept={accept}
            beforeUpload={beforeUpload}
            headers={getHeaders()}
            action={getAction()}
            // customRequest={handleCustomRequest}
            listType="picture-card"
            maxCount={5}
          >
            <PlusOutlined />
          </ImageUpload> */}
          <Upload
            accept={accept}
            headers={getHeaders()}
            action={getAction()}
            beforeUpload={beforeUpload}
            listType="picture-card"
            maxCount={5}
            fileList={fileList}
          >
            {fileList.length < 5 ? (
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <PlusOutlined />
                <span>图片</span>
              </div>
            ) : null}
          </Upload>
        </Form.Item>
        <div className={styles['operation-step-card-images-count']}>
          {fileList.length} / 5
        </div>
      </div>
    </div>
  )
}

export default OperationStep
