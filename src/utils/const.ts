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
  

  export const theme = {
    primary: '#CB9964',
    /** 透明度0.5主题色 */
    grayPrimary: '#CB9964d9',
    /** 透明度0.1主题色 */
    lightPrimary: '#CB99641a',
    /** 输入框、选择框背景色 */
    colorBgContainer: '#F7F8FA',
    /** 默认按钮背景色 */
    defaultBg: '#F2F3F5',
    /** 默认边框颜色 */
    defaultBorderColor: 'transparent',
  
    layoutSiderBg: '#F2F3F5',
  
    itemSelectedColor: '#fff',
    /** 危险色 */
    dangerColor: '#F5222D',
  };
  