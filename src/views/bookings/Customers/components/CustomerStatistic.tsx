import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import MediaSkeleton from '@/components/shared/loaders/MediaSkeleton'
import Loading from '@/components/shared/Loading'
import { useAppDispatch, useAppSelector } from '../store'
import {
    HiOutlineCalendar 
} from 'react-icons/hi'
import { NumericFormat } from 'react-number-format'
import type { ReactNode } from 'react'

type StatisticCardProps = {
    icon: ReactNode
    avatarClass: string
    label: string
    value?: number
    loading: boolean
}

const StatisticCard = (props: StatisticCardProps) => {
    const { icon, avatarClass, label, value, loading } = props

    const avatarSize = 55

    return (
        <Card bordered>
            <Loading
                loading={loading}
                customLoader={
                    <MediaSkeleton
                        avatarProps={{
                            className: 'rounded',
                            width: avatarSize,
                            height: avatarSize,
                        }}
                    />
                }
            >
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <Avatar
                            className={avatarClass}
                            size={avatarSize}
                            icon={icon}
                        />
                        <div>
                            <span>{label}</span>
                            <h3>
                                <NumericFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value}
                                />
                            </h3>
                        </div>
                    </div>
                </div>
            </Loading>
        </Card>
    )
}

const CustomerStatistic = () => {
    const dispatch = useAppDispatch()

    const statisticData = useAppSelector(
        (state) => state.bookings.data.bookingsList
    )
    const loading = useAppSelector(
        (state) => state.bookings.data.loading
    )
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            <StatisticCard
                icon={<HiOutlineCalendar  />}
                avatarClass="!bg-grey-600"
                label="مجموع الحجوزات"
                value={statisticData?.length}
                loading={loading}
            />
            {/* <StatisticCard
                icon={<HiOutlineUsers />}
                avatarClass="!bg-emerald-500"
                label="المستخدمين الموثقين"
                value={statisticData?.filter(el => el.isVerified === true).length}
                loading={loading}
            />
            <StatisticCard
                icon={<HiOutlineUserAdd />}
                avatarClass="!bg-red-500"
                label="المستخدمين الغير موثقين"
                value={statisticData?.filter(el => el.isVerified === false).length}
                loading={loading}
            /> */}
        </div>
    )
}

export default CustomerStatistic
