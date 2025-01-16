import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Button, Form, Input, message, Modal, Popover, Tabs, TabsProps } from 'antd'
import {
  CheckOutlined,
  CopyOutlined,
  DeleteOutlined,
  HolderOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import styles from './index.module.less'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import clsx from 'classnames'
import ProcessCommon from '../ProcessCommon'
import { useClickAway, useToggle } from 'ahooks'
import { ContainerType } from '../../type'
import { useMultiVersionContext } from '../../context'
import { FormInstance } from 'antd/es/form'
import { exchangeData } from '../../utils'
import { deepClone } from '@/utils/utils'
// import NormalModal from '@/components/NormalModal'

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  index: React.Key
  moveNode: (dragIndex: React.Key, hoverIndex: React.Key) => void
}

const type = 'DraggableTabNode'

// 可拖拽Tab节点栏
const DraggableTabNode = ({
  index,
  children,
  moveNode,
}: DraggableTabPaneProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      // @ts-ignore
      const { index: dragIndex } = monitor.getItem() || {}

      if (dragIndex === index) {
        return {}
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: 'dropping',
      }
    },
    drop: (item: { index: React.Key }) => {
      moveNode(item.index, index)
    },
  })

  const [{ isDragging: dragging }, drag] = useDrag({
    type,
    item: { index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      }
    },
  })

  drop(drag(ref))
  return (
    <div
      ref={ref}
      style={{
        marginRight: 24,
      }}
      className={isOver ? dropClassName : ''}
    >
      {children}
    </div>
  )
}

// 操作按钮
const OperationComp = ({
  tabs,
  setTabs,
  form,
}: {
  tabs: { label: string; key: string }[]
  setTabs: React.Dispatch<
    React.SetStateAction<
      {
        label: string
        key: string
      }[]
    >
  >
  form: FormInstance
}) => {
  const { containers, setContainers } = useMultiVersionContext()
  const deleteRef = useRef<HTMLDivElement>(null)
  const ref = useRef<any>(null)
  const [open, { toggle }] = useToggle()
  // 删除区域 Drop 逻辑
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type, // 接受的拖拽类型
    drop: (item: { index: string }) => {
        // 删除Tab Item
        const targetKey = item.index
        const idx = tabs.findIndex((item) => item.key === targetKey)
        const res = [...tabs]
        res.splice(idx, 1)

        // 删除表单绑定数据
        const muliData = form.getFieldValue(
          'muliRecipeManufactureProcessReqList',
        )
        const formValsIndex = muliData.findIndex(
          (item: any) => item.containerNo === targetKey,
        )
        muliData.splice(formValsIndex, 1)

        form.setFieldsValue({
          muliRecipeManufactureProcessReqList: muliData,
        })
        setContainers((d: ContainerType[] | undefined) => {
          if (!d) return []
          const targetKey = item.index
          const idx = d.findIndex((item) => item.containerNo === targetKey)
          d[idx].disabled = false
          return d
        })
        setTabs(res)
    },
    // hover: (index, ...rest) => {
    //   debugger
    // },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }
    },
  })

  const addApplication = (item: ContainerType) => {
    if (item.disabled) return
    setTabs((pre) => [
      ...pre,
      {
        label: item.containerName,
        key: item.containerNo,
      },
    ])
    const muliData =
      form.getFieldValue('muliRecipeManufactureProcessReqList') || []

    muliData.push({
      containerNo: item.containerNo,
      contentList: [
        {
          processName: '',
          processContent: [{}],
        },
      ],
    })

    setContainers((d: ContainerType[] | undefined) => {
      if (!d) return []
      const targetKey = item.containerNo
      const idx = d.findIndex((item) => item.containerNo === targetKey)
      d[idx].disabled = true
      return d
    })
    form.setFieldsValue({
      muliRecipeManufactureProcessReqList: muliData,
    })
  }

  useClickAway(() => {
    if (open) {
      toggle()
    }
  }, ref)

  drop(deleteRef)

  return  (
    <>
    <div
      id="drop-delete-origin"
      className={clsx(
        styles['delete-tabs-origin'],
        canDrop ? styles['dragging'] : null,
      )}
      ref={deleteRef}
    >
      <div>
        <DeleteOutlined />
        <span style={{ marginLeft: '8px' }}>拖到此处删除</span>
      </div>
    </div>
    {canDrop ? null : <div className={styles['add-application-btn']}>
      <Popover
        content={
          <div className={styles['add-application-popover-content']}>
            {containers.map((item) => {
              return (
                <div
                  key={item.containerNo}
                  onClick={() => addApplication(item)}
                >
                  {item.containerName}
                  <span className={styles['disabled']}>
                    {item.disabled ? <CheckOutlined /> : ''}
                  </span>
                </div>
              )
            })}
          </div>
        }
        align={{
          offset: [-5, -10],
        }}
        placement="bottom"
        trigger="click"
        open={open}
      >
        <Button
          ref={ref}
          type="text"
          icon={<PlusOutlined />}
          onClick={() => toggle()}
        >
          器具版本
        </Button>
      </Popover>
      </div>}
    </>

  ) 
}

type MultiVersionApplicationType = {
  value?: any
  form: FormInstance
}

export type RefFunc = {
  tabs: { label: string; key: string }[]
  handleSetActiveTab: React.Dispatch<React.SetStateAction<string>>
  handleSetTabs: React.Dispatch<
    React.SetStateAction<
      {
        label: string
        key: string
      }[]
    >
  >
}

const MultiVersionApplication = forwardRef<
  RefFunc,
  MultiVersionApplicationType
>((props, ref) => {
  const { setContainers } = useMultiVersionContext()
  const { value, form } = props
  // 初始标签列表
  const [tabs, setTabs] = useState<{ label: string; key: string }[]>([])

  // 当前选中的标签
  const [activeKey, setActiveKey] = useState(tabs?.[0]?.key)

  useEffect(() => {
    const keys = tabs.map((item) => item.key)
    if (!keys.includes(activeKey)) {
      setActiveKey(tabs?.[0]?.key)
    }
  }, [tabs, activeKey])

  useEffect(() => {
    if (value?.length) {
      const tabs = value.map((item: any) => ({
        label: item.containerName,
        key: item.containerNo,
      }))
      setTabs(tabs)
      form.setFieldsValue({
        muliRecipeManufactureProcessReqList: value,
      })
    }
  }, [])

  // useEffect(() => {
  //   if (value?.length) {
  //     setContainers((d: ContainerType[] | undefined) => {
  //       if (!d) return []
  //       value.forEach((item) => {
  //         const idx = d.findIndex((it) => it.containerNo === item.containerNo)
  //         if (idx >= 0) {
  //           d[idx].disabled = true
  //         }
  //       })
  //       return d
  //     })
  //   }
  // }, [value])

  useImperativeHandle(
    ref,
    () => ({
      tabs,
      handleSetActiveTab: setActiveKey,
      handleSetTabs: setTabs,
    }),
    [],
  )

  const handleCopy = (index: number) => {
    message.success('复制成功')
    const targetKey = tabs[index - 1]?.key
    const muliData = form.getFieldValue('muliRecipeManufactureProcessReqList')
    const data = form
      .getFieldValue('muliRecipeManufactureProcessReqList')
      .find((item: any) => {
        return item.containerNo === targetKey
      })
    muliData[index] = deepClone({ ...data, containerNo: tabs[index]?.key })
    form.setFieldsValue({
      muliRecipeManufactureProcessReqList: muliData,
    })
  }

  const moveTabNode = (dragKey: React.Key, hoverKey: React.Key) => {
    const dragIndex = tabs.findIndex((item) => item.key === dragKey)
    const hoverIndex = tabs.findIndex((item) => item.key === hoverKey)
    const mutiData = form.getFieldValue('muliRecipeManufactureProcessReqList')
    exchangeData(mutiData, dragIndex, hoverIndex)

    const newTabs = deepClone(tabs)
    exchangeData(newTabs, dragIndex, hoverIndex)
    setTabs(newTabs)
  }

  const renderTabBar: TabsProps['renderTabBar'] = (
    tabBarProps,
    DefaultTabBar,
  ) => (
    <DefaultTabBar {...tabBarProps}>
      {(node) => (
        <DraggableTabNode
          key={node.key}
          index={node.key!}
          moveNode={moveTabNode}
        >
          {node}
        </DraggableTabNode>
      )}
    </DefaultTabBar>
  )

  const orderItems = useMemo(() => {
    const res = tabs.map((item, index) => {
      return {
        key: item.key,
        label: (
          <>
            <HolderOutlined />
            <span>{item.label}</span>
          </>
        ),
        children: (
          <>
            <Form form={form}>
              <Form.Item
                style={{ display: 'none' }}
                name={[
                  'muliRecipeManufactureProcessReqList',
                  index,
                  'containerNo',
                ]}
                initialValue={`${item.key}`}
              >
                <Input />
              </Form.Item>
            </Form>
            {index > 0 && (
              <div className={styles['copy-process']}>
                <span>是否需要复制「{tabs[index - 1].label}」完整工序?</span>
                <span
                  className={styles['copy-process-text']}
                  onClick={() => handleCopy(index)}
                >
                  <CopyOutlined />
                  <span>立即复制</span>
                </span>
              </div>
            )}
            <ProcessCommon
              form={form}
              name={['muliRecipeManufactureProcessReqList', index]}
              value={value?.[index]}
            />
          </>
        ),
      }
    })
    return res
  }, [tabs])

  return (
    <div className={styles['multi-version-application']}>
      <Form.Item name={'muliRecipeManufactureProcessReqList'} noStyle />
      <DndProvider backend={HTML5Backend}>
        <div style={{ position: 'relative' }}>
          <Tabs
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            renderTabBar={renderTabBar}
            items={orderItems}
          />
          {tabs.length === 0 ? (
            <div className={styles['empty-text']}>
              请点击右侧按钮添加器具版本
            </div>
          ) : null}

          <OperationComp tabs={tabs} setTabs={setTabs} form={form} />
        </div>
      </DndProvider>
    </div>
  )
})

export default MultiVersionApplication
