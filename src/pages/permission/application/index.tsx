import { Form, Radio } from 'antd'
import React, { useRef } from 'react'
import MultiVersionApplication, { RefFunc } from './component/MultiVersionApplication'
import { useRequest } from 'ahooks'
import { getSearchParams } from '@/utils/utils'
import { ContainerType, ProduceBrochureDetail } from './type'
import * as API from './api'
import { MultiVersionProvider } from './context'
import { FormInstance } from 'antd/lib'
import { versionTypeOptions } from './const'
import ProcessCommon from './component/ProcessCommon'

function formatDetail(data: ProduceBrochureDetail) {
  if (!data) return
  data.recipeManufactureProcessList.forEach((item) => {
    item.contentList.forEach((it) => {
      it.processContent.forEach((i) => {
        i.imgUrlList = i.imgUrlList.map((fileItem, index) => {
          if (typeof fileItem === 'string') {
            return {
              uid: index,
              status: 'done',
              url: fileItem,
            }
          } else {
            return fileItem
          }
        })
      })
    })
  })
}


// 复杂的动态表单
function Application() {
  const [form] = Form.useForm()
  const ref = useRef<RefFunc | null>(null)

  const { data: containers = [], mutate } = useRequest<ContainerType[], any>(
    async () => {
      try {
        const result = await API.getContainers()
        if (result.code === 0) {
          return result.data.map((item) => {
            return {
              ...item,
              disabled: false,
            }
          })
        } else {
          return []
        }
      } catch (err) {
        return []
      }
    },
    {
      cacheKey: 'containers',
    },
  )

  const { data, loading, refresh } = useRequest<
    ProduceBrochureDetail | undefined,
    any
  >(
    async () => {
      try {
        const res = await API.getProductBrochureDetail({})
        if (res.code === 0) {
          formatDetail(res.data)
          return res.data
        } else {
          return undefined
        }
      } catch (e) {
        console.error(e)
        return undefined
      }
    },
    {
      cacheKey: 'produce-brochure-detail',
    },
  )
  return (
    <div style={{ padding: "48px" }}>
      <Form
        // className={styles['brochure-drawer-form']}
        form={form}
        initialValues={{
          versionType: 'SINGLE',
          recipeManufactureProcessList: [
            {
              contentList: [
                {
                  processName: '',
                  processContent: [{}],
                },
              ],
            },
          ],
        }}
      >
        <Form.Item label="版本类型" name="versionType" required>
          <Radio.Group options={versionTypeOptions} />
        </Form.Item>
        <Form.Item
          shouldUpdate={(pre, cur) => pre.versionType !== cur.versionType}
        >
          {(f: FormInstance) => {
            const versionType = f.getFieldValue('versionType')
            return versionType === 'MULTIPLE' ? (
              <MultiVersionProvider
                // @ts-ignore
                value={{ containers, setContainers: mutate }}
              >
                <MultiVersionApplication
                  form={f}
                  ref={ref}
                  // value={
                  //   drawerState.data?.versionType === 'MULTIPLE'
                  //     ? drawerState.data?.recipeManufactureProcessList
                  //     : undefined
                  // }
                />
              </MultiVersionProvider>
            ) : (
              <ProcessCommon
                name={['recipeManufactureProcessList', 0]}
                form={f}
              />
            )
          }}
        </Form.Item>
      </Form>
    </div>
  )
}


export default Application