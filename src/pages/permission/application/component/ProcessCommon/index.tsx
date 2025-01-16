import React, { useEffect, useRef, useState } from 'react'
import {
  CloseOutlined,
  EllipsisOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'
import { Button, Form, Input, message, Modal, Popover } from 'antd'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './index.module.less'
import { validateChinese } from '@/utils/validator'
import { deepClone, resolveName } from '@/utils/utils'
import OperationStep from './ProcessContentStep'
import { exchangeData, formatNumberToChinese } from '../../utils'
import { FormInstance } from 'antd/es/form'
import { useClickAway } from 'ahooks'

type IProps = {
  name: string | (string | number)[]
  form: FormInstance
  value?: any
}

const ProcessCommon: React.FC<IProps> = (props) => {
  const { name, form, value } = props
  const [open, setOpen] = useState<any>({})
  const ref = useRef<HTMLSpanElement | null>(null)

  useClickAway(() => {
    if (ref && Object.values(open).includes(true)) {
      setOpen({})
    }
  }, ref)

  // initialValue={value}
  return (
    <Form.List name={resolveName(name, 'contentList')}>
      {(fields, { add, remove }, { errors }) => {
        return (
          <div className={styles['process-item']}>
            <TransitionGroup>
              {fields.map((field, index) => {
                return (
                  <CSSTransition
                    classNames="process-common"
                    key={field?.name}
                    timeout={{
                      enter: 300,
                      exit: 30,
                    }}
                  >
                    <div>
                      <div className={styles['process-title']}>
                        <span className={styles['process-title-text']}>
                          工序{formatNumberToChinese(index + 1)}
                        </span>
                        <span className={styles['process-title-setting']}>
                          <Popover
                            align={{
                              offset: [-14],
                            }}
                            content={
                              <div
                                className={
                                  styles['process-title-setting-content']
                                }
                              >
                                <Button
                                  type="text"
                                  disabled={fields?.length === 1}
                                  onClick={() => {
                                    Modal.error({
                                      title: '确认删除该工序吗?',
                                      content:
                                        '删除该工序的同时也将删除相关步骤，请谨慎操作',
                                      okText: '确定删除',
                                      cancelText: '我再想想',
                                      onOk: () => remove(field.name),
                                    })
                                  }}
                                >
                                  删除
                                </Button>
                                <Button
                                  type="text"
                                  onClick={() => {
                                    const vals = form.getFieldValue(
                                      resolveName(name, 'contentList'),
                                    )
                                    const copyVals = deepClone(vals[index])
                                    vals.splice(index, 0, copyVals)

                                    form.setFieldValue(
                                      resolveName(name, 'contentList'),
                                      vals,
                                    )
                                    message.success('复制成功')
                                  }}
                                >
                                  快速复制
                                </Button>
                                <Button
                                  type="text"
                                  disabled={index === 0}
                                  onClick={() => {
                                    const currentIndex = field.name
                                    const targetIndex = currentIndex - 1
                                    const vals = form.getFieldValue(
                                      resolveName(name, 'contentList'),
                                    )
                                    exchangeData(
                                      vals,
                                      currentIndex,
                                      targetIndex,
                                    )
                                    form.setFieldValue(
                                      resolveName(name, 'contentList'),
                                      vals,
                                    )
                                  }}
                                >
                                  向前一位
                                </Button>
                                <Button
                                  type="text"
                                  disabled={index + 1 === fields?.length}
                                  onClick={() => {
                                    console.log(field.name, typeof field.name)
                                    const currentIndex = field.name
                                    const targetIndex = currentIndex + 1
                                    const vals = form.getFieldValue(
                                      resolveName(name, 'contentList'),
                                    )
                                    exchangeData(
                                      vals,
                                      currentIndex,
                                      targetIndex,
                                    )
                                    form.setFieldValue(
                                      resolveName(name, 'contentList'),
                                      vals,
                                    )
                                  }}
                                >
                                  向后一位
                                </Button>
                              </div>
                            }
                            open={!!open[`${index}`]}
                            placement="bottomLeft"
                            trigger="click"
                          >
                            <EllipsisOutlined
                              onClick={(e) => {
                                const openObj = {
                                  [index]: true,
                                }
                                ref.current = e.currentTarget
                                setOpen(openObj)
                              }}
                            />
                          </Popover>
                        </span>
                      </div>
                      <div className={styles['process-content']}>
                        <Form.Item
                          name={resolveName(field.name, 'processName')}
                          label="工序名称"
                          rules={[
                            { required: true, message: '请输入工序名称' },
                          ]}
                        >
                          <Input maxLength={14} showCount />
                        </Form.Item>
                        <Form.Item
                          label="步骤配置"
                          required
                          extra={
                            <Form.List
                              name={resolveName(field.name, 'processContent')}
                            >
                              {(
                                subFields,
                                { add: subAdd, remove: subRemove },
                                { errors },
                              ) => {
                                return (
                                  <div
                                    className={
                                      styles['process-content-step-card']
                                    }
                                  >
                                    <TransitionGroup>
                                      {subFields.map((subField, index) => {
                                        return (
                                          <CSSTransition
                                            classNames="process-common"
                                            key={subField?.name}
                                            timeout={{
                                              enter: 300,
                                              exit: 30,
                                            }}
                                          >
                                            <div
                                              key={subField.name}
                                              style={{ position: 'relative' }}
                                            >
                                              <Form.Item
                                                noStyle
                                                name={subField.name}
                                              >
                                                <OperationStep
                                                  index={index}
                                                  name={subField.name}
                                                  form={form}
                                                />
                                              </Form.Item>
                                              {subFields.length > 1 && (
                                                <span
                                                  className={
                                                    styles['step-close-btn']
                                                  }
                                                >
                                                  <Button
                                                    icon={
                                                      <CloseOutlined
                                                        style={{
                                                          color: '#fff',
                                                          fontSize: '8px',
                                                        }}
                                                      />
                                                    }
                                                    onClick={() =>
                                                      Modal.error({
                                                        title:
                                                          '确认删除该步骤配置吗?',
                                                        cancelText: '我再想想',
                                                        onOk: () =>
                                                          subRemove(
                                                            subField.name,
                                                          ),
                                                      })
                                                    }
                                                    shape="circle"
                                                    size="small"
                                                  />
                                                </span>
                                              )}
                                            </div>
                                          </CSSTransition>
                                        )
                                      })}
                                    </TransitionGroup>
                                    <Form.ErrorList
                                      className={styles['text-danger']}
                                      errors={errors}
                                    />
                                    <div className={styles['add-subField-btn']}>
                                      {subFields.length < 10 && (
                                        <Button
                                          icon={<PlusCircleOutlined />}
                                          type="text"
                                          onClick={() => {
                                            if (subFields.length >= 10) {
                                              message.warning(
                                                '最多添加10道工序',
                                              )
                                              return
                                            }
                                            subAdd({})
                                          }}
                                        >
                                          操作步骤
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                )
                              }}
                            </Form.List>
                          }
                        >
                          <div className={styles['process-content-step-title']}>
                            <div>
                              每个工序都至少配置一个操作步骤，配图可选填；
                            </div>
                            <div>
                              请上传正方形图片，支持jpg、png格式，单个文件不大于500k
                            </div>
                          </div>
                        </Form.Item>
                      </div>
                    </div>
                  </CSSTransition>
                )
              })}
            </TransitionGroup>
            <Form.ErrorList className={styles['text-danger']} errors={errors} />
            {fields?.length < 10 && (
              <div className={styles['add-field-btn']}>
                <Button
                  icon={<PlusCircleOutlined />}
                  type="text"
                  onClick={() => {
                    if (fields.length >= 10) {
                      message.warning('最多添加10道工序')
                      return
                    }
                    add({
                      processName: '',
                      processContent: [
                        {
                          stepName: 1,
                        },
                      ],
                    })
                  }}
                >
                  工序
                </Button>
              </div>
            )}
          </div>
        )
      }}
    </Form.List>
  )
}

export default ProcessCommon
