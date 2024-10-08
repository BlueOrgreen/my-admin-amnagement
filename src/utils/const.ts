import { TableProps } from "antd";

export const commonTableProps: TableProps<any> = {
    rowKey: 'id',
    scroll: { x: '100%', scrollToFirstRowOnChange: true },
    style: { width: '100%' },
    pagination: {
      showQuickJumper: true,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30'],
    },
  }
  