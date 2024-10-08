import DraggerUpload from '@/components/DraggerUpload'
import { EFFECTIVE_RANGE } from '@/dict/store'
import { datePickerDisabledTime, matchLabel } from '@/utils/utils'
import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons'
import { useMemoizedFn, useRequest } from 'ahooks'
import { Button, DatePicker, Drawer, Form, FormInstance, Input, Modal, Radio, Switch, Upload, message } from 'antd'
import { UploadFile } from 'antd/lib'
import dayjs from 'dayjs'
import axios from 'axios';
import { useState } from 'react'
import TextArea from 'antd/es/input/TextArea'
import * as API from '../../api'

type DrawerProps = {
  open: boolean
  handleRefresh: () => void
  onClose: () => void
}

const FormAddDrawer = (props: DrawerProps) => {
  const { open, handleRefresh, onClose } = props
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<any>([]);

  const { loading: createPostLoading, run: createPost } = useRequest(
    (query) =>
      API.createPost({
        ...query,
      }),
    {
      manual: true,
      onSuccess: ({ code }) => {
        if (code === 0) {
          message.success('新增文章成功')
          handleRefresh()
          form.resetFields()
          onClose()
        }
      },
    },
  )
  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach((file: any) => {
      formData.append('file', file);
    });

    try {
      const response = await axios.post('/api/file/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
      });
      console.log('upload response===>', response);
      
      message.success('File uploaded successfully');
    } catch (error) {
      message.error('File upload failed');
    }
  };

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

  const handleOk = () => {
    form.validateFields().then(values => {
      createPost(values)
    }).catch(error => {
      const fields = error['errorFields'][0]['name']
      form.scrollToField(fields, { behavior: 'smooth', block: 'center' })
    })
  }

  const beforeUpload = (file: UploadFile) => {
    // const accept = '.xls,.xlsx'
    // 检测文件类型
    // const reg = new RegExp(accept.split(',').join('|'), 'i')
    // if (!reg.test('.' + file.name.split('.').pop() || '')) {
    //   // onError?.(new Error(`请上传${accept}格式的安装包`));
    //   message.error(`请上传${accept}格式的文件`)
    //   return false
    // }
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

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    const chunkSize = 5 * 1024 * 1024; // 每片大小为5MB
    const totalChunks = Math.ceil(file.size / chunkSize);
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
  
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('chunkIndex', chunkIndex as any);
      formData.append('totalChunks', totalChunks as any);
      
      try {
        await axios.post('/api/file/upload', formData, { headers: {
          "Content-Type": "multipart/form-data"
        }});
      } catch (err) {
        onError(err);
        return;
      }
    }
  
    onSuccess('Upload completed');
  };

  return (
    <Drawer
      width={700}
      destroyOnClose={true}
      footer={
        <div>
          <Button className='mr-4' type="default" onClick={handleClose}>
            取消
          </Button>
          <Button type="primary" onClick={handleOk} loading={createPostLoading}>
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
            name="isEnable"
            valuePropName="checked"
            // rules={[{ required: true, message: '请选择' }]}
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>
          <Form.Item
            label="日期时间"
            name="crowdUpdateTime"
            valuePropName="checked"
            // rules={[{ required: true, message: '请选择' }]}
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
            label="文章标题"
            name="title"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="文章内容"
            name="body"
            rules={[{ required: true, message: '请输入' }]}
          >
            <TextArea
              showCount
              autoSize={{ minRows: 4, maxRows: 20 }}
              maxLength={300}
            />
          </Form.Item>
          <Form.Item
            label="文章描述"
            name="summary"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="生效范围"
            name="shopRangeType"
            // rules={[{ required: true, message: '请选择' }]}
          >
            <Radio.Group
              options={EFFECTIVE_RANGE}
            />
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(pre, cur) => pre.shopRangeType !== cur.shopRangeType}
          >
            {(f:FormInstance) => {
              const { shopRangeType } = f.getFieldsValue()
              return (
                matchLabel(shopRangeType, EFFECTIVE_RANGE, ['部分门店']) ? (
                  <Form.Item
                  name="_shopIdExcelList"
                  colon={false}
                  label=" "
                  >
                      <DraggerUpload
                        action={"/api/files/upload"}
                        maxCount={1}
                        // beforeUpload={beforeUpload}
                        onChange={(info) => {
                          const status = info.file.status;
                          if (status !== "uploading") {
                            console.log(info.file, info.fileList);
                          }
                          if (status === "done") {
                            message.success(`${info.file.name} file uploaded successfully.`);
                          } else if (status === "error") {
                            message.error(`${info.file.name} file upload failed.`);
                          }
                        }}
                        // onChange={normalFiles}
                        // customRequest={customRequest}
                        customRequest={async (options: any) => {
                          const data= new FormData()
                          data.append('file', options.file)
                          const config= {
                            "headers": {
                              "content-type": 'multipart/form-data;'
                            }
                          }
                          const res = await axios.post('/api/files/upload', {
                            data,
                          });
                          console.log('res====>', res);
                        }}
                        headers={{
                          "Content-Type": "multipart/form-data"
                        }}
                      >
                        <DraggerUpload.Content
                          detail={form.getFieldsValue(true)}
                          valueKey="shopIdExcelList"
                        />
                      </DraggerUpload>
                  </Form.Item>
                ) : null
              )
            }}
          </Form.Item>
      </Form>
    </Drawer>
  )
}

export default FormAddDrawer
