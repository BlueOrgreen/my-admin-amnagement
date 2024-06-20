import { useEffect, useState } from 'react'
import './index.less'
import leftIcon from '@/assets/images/icon-left.png'
import rightIcon from '@/assets/images/icon-right.png'
import clsx from 'clsx'
import { SvgIcon } from '../SvgIcon'
import ReSelect from '../ReSelect'
import { sortFieldOptions } from '@/dict/store'

const arr = new Array(100).fill(0)

const SideLeft = () => {
    const [isExpand, setIsExpand] = useState<boolean>(true)
    const [height, setHeight] = useState(window?.innerHeight ||
        document?.body?.clientHeight ||
        document?.documentElement?.clientHeight,
    )

    const toggleExpand = () => {
        setIsExpand(pre => !pre)
    }

    // const getWinHeight = () => {
    //     const h =
    //       window?.innerHeight ||
    //       document?.body?.clientHeight ||
    //       document?.documentElement?.clientHeight
    //       setHeight(h)
    //   }

      
    // useEffect(() => {
    //     window.addEventListener('resize', getWinHeight)
    // }, [])
    
    return (
        <div style={{ height: `${height - 56}px` }} className={clsx({
                    sideLeft: true,
                    ['side-list-expand']: isExpand,
                    ['side-list-shrink']: !isExpand
                }
            )}>
            <div className='side-content'>
                <div className='title'>
                    这是Title
                </div>
                {arr.map((item, index) => {
                    return (
                        <div>{index+1}</div>
                    )
                })}
            </div>
            <div
                className='side-ui-toggle'
                onClick={toggleExpand}
            >
                <img src={isExpand ? leftIcon : rightIcon} />
            </div>
        </div>
    )
}

export default SideLeft