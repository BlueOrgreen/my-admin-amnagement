import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { PageContainer } from '@ant-design/pro-components'
import { useAntdTable, useToggle } from 'ahooks'
import { Button, Card, Divider, Table } from 'antd'
import * as API from './api'
import FormAddDrawer from './components/FormAddDrawer'
import { insertEveryNth } from '@/utils/utils'
import { commonTableProps } from '@/utils/const'
import { log } from 'console'



const StoreMaterial = () => {
  const [open, { toggle: toggleOpen }] = useToggle(false)
  const {
    tableProps: inTableProps,
    refresh,
    run,
  } = useAntdTable(
    async ({ current, pageSize }) => {
      try {
        const {
          data: { items, meta },
        } = await API.getPostList({
          page: current,
          limit: pageSize,
        })
        return {
          list: items ?? [],
          total: meta?.itemsPerPage ?? 0,
        }
      } catch (error) {
        return {
          list: [],
          total: 0,
        }
      }
    }
  )
  const handleAdd = () => {
    toggleOpen()
  }

  const handleCloseDrawer = () => {
    toggleOpen()
  }

  const handleSearch = () => {
    refresh()
  }

  const renderOperationGroup = (record: any) => {
    const _columnActions = [
    <Button
      size="small"
      type="link"
    >
      复制
    </Button>,
    <Button
      size="small"
      type="link"
    >
      编辑
    </Button>,
    <Button
      size="small"
      type="link"
      >
      删除
    </Button>,
    <Button
      size="small"
      type="link"
    >
      下载
    </Button>
    ]

    return _columnActions?.length ? (
      <>
        {insertEveryNth(
          _columnActions,
          <Divider className="mx-1 me-1" type="vertical" />,
          1,
        )}
      </>
    ) : null
  }

  return (
    <PageContainer title="文章管理">
      <Card>
        <div className='flex justify-between'>
          <Button onClick={handleSearch} icon={<SearchOutlined />} type='primary'>
            查询
          </Button>
          <Button icon={<PlusOutlined />} type="primary" onClick={handleAdd}>
            新建文章
          </Button>
        </div>
      </Card>
      <Table
        {...commonTableProps}
        {...inTableProps}
        columns={[
          {
            width: 200,
            title: '文章标题',
            dataIndex: 'title'
          },
          {
            title: '创建人',
            width: 200,
            dataIndex: 'createBy'
          },
          {
            title: '创建时间',
            width: 200,
            dataIndex: 'createdAt'
          },
          {
            title: '更新时间',
            width: 200,
            dataIndex: 'updatedAt'
          },
          {
            title: '发布时间',
            width: 200,
            dataIndex: 'publishedAt'
          },
          {
            title: '关键字',
            width: 200,
            dataIndex: 'keywords'
          },
          {
            title: '种类',
            width: 200,
            dataIndex: 'categories'
          },
          {
            title: '文章类型',
            width: 200,
            dataIndex: 'type'
          },
          {
            title: <span className="ml-[10px]">操作</span>,
            key: 'operation',
            width: 230,
            fixed: 'right',
            align: 'left',
            render: (text: any, record: any) => {
              return (
                <div className="flex items-center">
                  {renderOperationGroup(record)}
                </div>
              )
            },
          }
        ]}
        pagination={{
          ...inTableProps?.pagination,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['10', '20', '30'],
        }}
      />
      <FormAddDrawer handleRefresh={() => refresh()} open={open} onClose={handleCloseDrawer} />
    </PageContainer>
  )
}

export default StoreMaterial
