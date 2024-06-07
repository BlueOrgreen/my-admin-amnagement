import DraggerUpload from '@/components/DraggerUpload'
import { EFFECTIVE_RANGE } from '@/dict/store'
import { datePickerDisabledTime } from '@/utils/utils'
import { InfoCircleOutlined } from '@ant-design/icons'
import { useMemoizedFn } from 'ahooks'
import { Button, DatePicker, Drawer, Form, Modal, Radio, Switch, message } from 'antd'
import { UploadFile } from 'antd/lib'
import dayjs from 'dayjs'

type DrawerProps = {
  open: boolean
  onClose: () => void
}

const FormAddDrawer = (props: DrawerProps) => {
  const { open, onClose } = props
  const [form] = Form.useForm()
  const effectRange = Form.useWatch('shopRangeType', form)

  const handleClose = () => {
    if (form.isFieldsTouched()) {
        Modal.confirm({
          icon: <div className="flex justify-center gap-2">
                <InfoCircleOutlined style={{ color: '#faad14' }} />
                提示
          </div>,
          onOk: () => {
            onClose()
          },
          centered: true,
          bodyStyle: {
            textAlign: 'center',
          },
          content: '内容已经修改，是否确认关闭？',
        })
    } else {
        onClose()
    }
  }

  const handleOk = () => {}

  const beforeUpload = (file: UploadFile) => {
    const accept = '.xls,.xlsx'
    // 检测文件类型
    const reg = new RegExp(accept.split(',').join('|'), 'i')
    if (!reg.test('.' + file.name.split('.').pop() || '')) {
      // onError?.(new Error(`请上传${accept}格式的安装包`));
      message.error(`请上传${accept}格式的文件`)
      return false
    }
    return true
  }

  const normalFiles = useMemoizedFn((info) => {
    const { file } = info
    // 设置 grayFileCode、grayExcelList
    if (file.status === 'done' && file?.response?.data) {
      form.setFieldsValue({
        excelFileCode: file.response.data.fileCode,
        shopIdExcelList: file.response.data.shopIds,
      })
    }
    return file?.response?.data?.excelUrl || ''
  })

  return (
    <Drawer
      width={700}
      destroyOnClose={true}
      footer={
        <div>
          <Button className='mr-4' type="default" onClick={handleClose}>
            取消
          </Button>
          <Button type="primary" onClick={handleOk}>
            确定
          </Button>
        </div>
      }
      open={open}
      onClose={onClose}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        // initialValues={formInitialValue}
      >
        <Form.Item
            label="启用状态"
            required
            name="isEnable"
            valuePropName="checked"
            rules={[{ required: true, message: '请选择' }]}
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
          <Form.Item
            label="日期时间"
            required
            name="crowdUpdateTime"
            valuePropName="checked"
            rules={[{ required: true, message: '请选择' }]}
          >
            <DatePicker
                disabledDate={(current) => {
                    // 禁用今天之前的日期
                    return current && current < dayjs().startOf('day')
                  }}
                  disabledTime={(current) => {
                    if (!current) return {}
                    const allowedStartTime = dayjs()
                                .set('hour', 9)
                                .set('minute', 50)
                              const allowedEndTime = dayjs()
                                .set('hour', 23)
                                .set('minute', 0)
                    return datePickerDisabledTime(current, allowedStartTime, allowedEndTime)
                  }}
                  picker="date"
                  showTime={{
                    hideDisabledOptions: true,
                    showNow: false,
                  }}
                  allowClear
            />
          </Form.Item>
          <Form.Item
            label="生效范围"
            name="shopRangeType"
            rules={[{ required: true, message: '请选择' }]}
            >
            <Radio.Group
                options={EFFECTIVE_RANGE}
            />
            </Form.Item>
            {effectRange === 2 && (
                <Form.Item
                name="_shopIdExcelList"
                colon={false}
                label=" "
                // noStyle
                >
                    <DraggerUpload
                        action={"http://wwww.test.com"}
                        maxCount={1}
                        beforeUpload={beforeUpload}
                        onChange={normalFiles}
                        headers={{
                          Authorization: `Bearer ${localStorage.getItem('token')}`,
                        }}
                    >
                         <DraggerUpload.Content
                            detail={form.getFieldsValue(true)}
                            valueKey="shopIdExcelList"
                            />
                    </DraggerUpload>
                </Form.Item>
            )}
      </Form>
    </Drawer>
  )
}

export default FormAddDrawer
