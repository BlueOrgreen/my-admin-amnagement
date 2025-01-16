import React, { useState, useEffect, CSSProperties } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import './index.less'
import { useMemoizedFn } from 'ahooks'
// import { useCos } from '@/utils/cos'
import { DomEditor } from '@wangeditor/editor'

type InsertFnType = (url: string, alt: string, href?: string) => void
type EditorProps = {
  className?: string
  style?: CSSProperties
  value?: string
  disable?: boolean
  toolbarConfig?: Partial<IToolbarConfig>
  editorConfig?: Partial<IEditorConfig>
  onChange?: (value: string) => void
  defaultSize?: number
}
function WangEditor(props: EditorProps) {
  const {
    value,
    disable,
    onChange,
    style,
    toolbarConfig = {},
    editorConfig = {},
    className,
    defaultSize,
  } = props
  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null) // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState<string>('')

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {
    setHtml(value || '')
  }, [value])

  // 工具栏配置
  const _toolbarConfig: Partial<IToolbarConfig> = {
    // excludeKeys: ['group-indent', 'codeBlock'],
    // modalAppendToBody: false,
    ...toolbarConfig,
  } // TS 语法
  // const toolbarConfig = { }                        // JS 语法
  // const { upload, cancel } = useCos(2)
  // 编辑器配置
  const _editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    MENU_CONF: {
      insertLink: customCheckLinkFn,
      // uploadImage: {
      //   allowedFileTypes: ['image/*'],
      //   // 自定义上传
      //   async customUpload(file: File, insertFn: InsertFnType) {
      //     // 校验文件格式 (暂时不需要，插件本身做了处理)
      //     // if(!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
      //     //   return false
      //     // }
      //     // file 即选中的文件
      //     const data = await upload(file as File, (progressInfo) => {})
      //     // 自己实现上传，并得到图片 url alt href
      //     // 最后插入图片
      //     const url = data.fileUrl
      //     insertFn(url, file.name)
      //   },
      //   // maxFileSize: 10 * 1024,
      //   base64LimitSize: 0,
      // },
    },
    ...editorConfig,
  }

  // 及时销毁 editor ，重要！
  useEffect(() => {
    if (editor && disable) {
      editor.disable()
    }

    return () => {
      // 取消上传图片
      // cancel()
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor, disable])

  const handleChange = useMemoizedFn((editor: IDomEditor) => {
    let nextValue: any = editor.getHtml()
    if (defaultSize) {
      nextValue = nextValue.replace(
        /<p([^>]*)>/g,
        `<p style="font-size: ${defaultSize}px;"$1>`,
      )
    }
    // 给每个 <p> 标签添加默认的样式
    nextValue = editor.isEmpty() ? undefined : nextValue
    if (value != nextValue) {
      setHtml(nextValue)
      onChange?.(nextValue)
    }
  })

  return (
    <>
      <div
        className={className}
        style={{ border: '1px solid #ccc', zIndex: 1000 }}
      >
        <Toolbar
          editor={editor}
          defaultConfig={_toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={_editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={handleChange}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden', ...style }}
        />
      </div>
    </>
  )
}

export default WangEditor

// 自定义校验链接
function customCheckLinkFn(
  text: string,
  url: string,
): string | boolean | undefined {
  // TS 语法
  // function customCheckLinkFn(text, url) {                                              // JS 语法

  if (!url) {
    return
  }
  if (url.indexOf('http') !== 0) {
    return '链接必须以 http/https 开头'
  }
  return true

  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入链接
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
