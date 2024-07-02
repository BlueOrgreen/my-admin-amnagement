import SideLeft from '@/components/SideLeft'
import './index.less'
import { SvgIcon } from '@/components/SvgIcon'

type IDeviceDimesionProps = {}

const DeviceDimesion: React.FC<IDeviceDimesionProps> = () => {
    return (
        <div className="deviceDimesion">
            <SideLeft />
            <div className='contentRight'>
                    <SvgIcon fontSize={25} iconClass='refresh'/> 
            </div>
        </div>
    )
}

export default DeviceDimesion