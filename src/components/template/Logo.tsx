import classNames from 'classnames'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'

interface LogoProps extends CommonProps {
    type?: 'full' | 'streamline'
    mode?: 'light' | 'dark'
    imgClass?: string
    logoWidth?: number | string
    page: string
}

const LOGO_SRC_PATH = '/img/logo/'

const Logo = (props: LogoProps) => {
    const {
        type = 'full',
        mode = 'light',
        className,
        imgClass,
        style,
        logoWidth = 'auto',
        page = 'authPage'
    } = props

    return (
        <div
            className={classNames('logo', className)}
            style={{
                ...style,
                ...{ width: logoWidth },
            }}
        >
            <img
                width={'40px'}
                className={imgClass}
                src={`${page === 'sidebar' ? `${LOGO_SRC_PATH}icon.png` : `${LOGO_SRC_PATH}eva icon.png`}`}
                alt={`${APP_NAME} logo`}
            />
        </div>
    )
}

export default Logo
