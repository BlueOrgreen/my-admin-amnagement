import { formatFileData } from "@/utils/utils"
import { Button, Divider, Progress, Upload, UploadFile } from "antd"
import { UploadProps } from "antd/lib"
import { ForwardRefExoticComponent, createContext, useContext, useState } from "react"
import clsx from "clsx"
import { PlusCircleOutlined } from "@ant-design/icons"

type DraggerUploadProps = ForwardRefExoticComponent<
  UploadProps<any> & {
    height?: number | undefined
  } & React.RefAttributes<any>
>

const UploadContext = createContext<{
    fileList: UploadFile<any>[]
    file?: UploadFile<any>
    disabled?: boolean
    // result: any;
  }>({} as any)

  type CompoundedComponent = DraggerUploadProps & {
    Content: typeof DraggerUploadContent
  }

type DraggerUploadType = {
    action: string
}

const { Dragger } = Upload


const _DraggerUpload: React.FC<any> = (props) => {
    const context = useContext(UploadContext)
    const [fileList, setFileList] = useState<UploadFile<any>[]>([])
  const [file, setFile] = useState<UploadFile<any>>()
  const {
    fileList: fileListProps,
    onChange,
    className = '',
    children,
    ...uploadProps
  } = props

  const fileListValue = fileList?.length
  ? fileList
  : formatFileData(fileListProps as any)

  const handleChange: UploadProps['onChange'] = (info) => {
    // 内部维护数据
    const { file, fileList } = info
    if (file.status) {
      setFile(file)
      setFileList(fileList)
      onChange?.(info)
    }
  }
    return <div className="dragger-upload">
        <Dragger
             fileList={fileListValue as any}
             // onPreview={onPreview}
             listType="text"
             // onDownload={onDownload}
             // beforeUpload={beforeUpload}
             showUploadList={false}
             onChange={handleChange}
             {...uploadProps}
             >

                <UploadContext.Provider
                    value={{ fileList, file, disabled: uploadProps.disabled }}
                    >
                    {children}
                </UploadContext.Provider>
             </Dragger>

    </div>
}

const DraggerUpload: CompoundedComponent = _DraggerUpload as any

/**
 * 拖拽上传内部子组件
 * @param param0
 * @returns
 */
const DraggerUploadContent = ({
    getTemplateLink,
    detail,
    valueKey = 'grayExcelList',
  }: {
    getTemplateLink?: () => Promise<any>
    detail?: any
    valueKey?: string
  }) => {
    const context = useContext(UploadContext)
    const { file, disabled = false } = context
    const { response: result } = file || {}
    console.log(file);
    
    return (
    <div className="flex h-[140px] flex-col">
        {/* 上传中以及上传失败展示原来的 */}
        <div className="flex flex-1 justify-center items-center">
            {file?.status === 'uploading' && <div>
            {file?.status === 'uploading' && <div>
            <Progress
                type="circle"
                percent={file?.percent}
                width={60}
            /></div>}
             <p>{file?.name}</p>
                </div>}

          {file?.status === 'done' && (
            <div>上传成功</div>
          )}

          {(file?.status === 'error' || (file?.status == 'done' && !result?.data)) && (
            <div>上传失败</div>
          )}

           {/* 未进行操作 */}
           {!file?.status && <div>
              <div className="font-[14px] mt-2">
                <div>
                  <div>
                  <PlusCircleOutlined style={{ fontSize: 18 }} />
                </div>
                还可以点击上传或拖入xls、xlsx文件
                </div>
              </div>
            </div>}

          {/* <div className="bg-[#E5E6EB] h-[32px]">
            <div className="flex justify-center items-center h-full">
              <Button type="text">
                下载模板
              </Button>
            </div>
          </div> */}
        </div>
    </div>

    )
  }

DraggerUpload.Content = DraggerUploadContent
export { DraggerUploadContent }

export default DraggerUpload