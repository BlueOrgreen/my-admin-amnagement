import React, { useMemo } from 'react'
import { Row, Col } from 'antd'

import './index.less'

import { SvgIcon } from '../SvgIcon'

export type ExceptionProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  status?: string
  icon?: string
}

function Exception(props: ExceptionProps) {
  const { title, description, status = '500', icon } = props
  const {
    title: errorTitle,
    description: errorSubTitle,
    icon: errorIcon,
  } = useMemo(() => {
    let newIcon: string | JSX.Element = ''
    let newTitle: React.ReactNode = ''
    let newDescription: React.ReactNode = ''

    switch (status) {
      case '403':
        newIcon = icon || <SvgIcon iconClass="403" />
        newTitle = title || '403'
        newDescription = description || '抱歉，您没有权限访问该页面'
        break
      case '404':
        newIcon = icon || <SvgIcon iconClass="404" />
        newTitle = title || '404'
        newDescription = description || '抱歉，您所访问的页面不存在'
        break
      case '500':
        newIcon = icon || <SvgIcon iconClass="500" />
        newTitle = title || '500'
        newDescription = description || '页面出现了一些错误'
        break
      default:
    }

    return {
      title: newTitle,
      description: newDescription,
      icon: newIcon,
    }
  }, [title, description, status, icon])

  return (
    <Row className="ht-exception">
      <Col className="ht-exception-cover" span={12}>
        {typeof errorIcon === 'string' ? (
          <img alt="" src={errorIcon} />
        ) : (
          errorIcon
        )}
      </Col>
      <Col className="ht-exception-content-wrap" span={12}>
        <div className="ht-exception-content">
          <div className="ht-exception-title">{errorTitle}</div>
          <div className="ht-exception-description">{errorSubTitle}</div>
        </div>
      </Col>
    </Row>
  )
}

export default Exception
