import { Select } from 'antd'
import React from 'react'
import Icon from '@ant-design/icons';
// import DownIcon from '@/assets/icon/icon-down.svg'
import CheckIcon from '@/assets/icon/check.svg'
import { SvgIcon } from '../SvgIcon';

const ReSelect = (props: any) => {
  return (
    <>
      <Select
        // showArrow={true}
        // suffixIcon={<Icon className='ant-select-suffix' style={{ color: '#555555' }} component={DownIcon} />}
        // menuItemSelectedIcon={<SvgIcon iconClass='check' />}
        {...props}
      />
    </>
  )
}

export default ReSelect