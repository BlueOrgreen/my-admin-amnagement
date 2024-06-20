import SideLeft from '@/components/SideLeft'
import './index.less'

type IDeviceDimesionProps = {}

const DeviceDimesion: React.FC<IDeviceDimesionProps> = () => {
    return (
        <div className="deviceDimesion">
            <SideLeft />
            <div className='contentRight'>content</div>
        </div>
    )
}

export default DeviceDimesion