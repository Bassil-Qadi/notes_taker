import { useEffect } from 'react'
import Timeline from '@/components/ui/Timeline'
import Button from '@/components/ui/Button'
import Loading from '@/components/shared/Loading'
import Event from './Event'
import TimeLineAvatar from './TimeLineAvatar'
import Card from '@/components/ui/Card'
import { HiCheckCircle } from 'react-icons/hi'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import MarkChatReadOutlinedIcon from '@mui/icons-material/MarkChatReadOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import {
    getLogs,
    getNotifications,
    toggleDeleteNotificationDialog,
    setSelectedNotification,
    filterLogs,
    setActivityIndex,
    useAppDispatch,
    useAppSelector,
} from '../store'
import isEmpty from 'lodash/isEmpty'
import dayjs from 'dayjs'

const Log = () => {
    const dispatch = useAppDispatch()

    const notifications = useAppSelector(
        (state) => state.accountActivityLog.data.notificationsList
    )
    const loading = useAppSelector(
        (state) => state.accountActivityLog.data.loading,
    )
    const loadMoreLoading = useAppSelector(
        (state) => state.accountActivityLog.data.loadMoreLoading,
    )
    const loadable = useAppSelector(
        (state) => state.accountActivityLog.data.loadable,
    )
    const selectedType = useAppSelector(
        (state) => state.accountActivityLog.data.selectedType,
    )
    const activityIndex = useAppSelector(
        (state) => state.accountActivityLog.data.activityIndex,
    )

    useEffect(() => {
        dispatch(getNotifications())
        dispatch(filterLogs({ filter: selectedType, activityIndex }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onLoadMore = () => {
        const nextIndex = activityIndex + 1
        dispatch(setActivityIndex(nextIndex))
        dispatch(getLogs({ filter: selectedType, activityIndex: nextIndex }))
    }

    const onDeleteNotification = (notificationId: string) => {
        dispatch(setSelectedNotification(notificationId))
        dispatch(toggleDeleteNotificationDialog(true))
    }

    const headerExtraContent = (status: string) => (
        <span className="flex items-center">
            <span className="mr-1 ml-2 font-semibold">{status === 'pending' ? 'قيد الانتظار' : 'تم التوصيل'}</span>
            <span className={`text-${status === 'delivered' ? 'emerald' : 'Gray'}-500 text-xl`}>
                {/* <HiCheckCircle /> */}
                {status === 'pending' ? <PendingActionsOutlinedIcon /> : <MarkChatReadOutlinedIcon />}
            </span>
        </span>
    )

    const cardFooter = (notificationId: string) => (
        <div className="flex justify-end">
            <Button size="md" variant="solid" icon={<NotificationsOffOutlinedIcon />} onClick={() => onDeleteNotification(notificationId)}>
                حذف الإشعار
            </Button>
        </div>
    )

    return (
        <Loading loading={loading}>
            <div className="max-w-[900px]">
                {notifications.map((notification) => (
                    <div key={notification._id} className="mb-8">
                        <div>
                            <Card
                                header={notification.title}
                                headerExtra={headerExtraContent(notification.status)}
                                footer={cardFooter(notification._id)}
                            >
                                <p>
                                    {notification.message}
                                </p>
                            </Card>
                        </div>
                    </div>
                ))}
                <div className="text-center">
                    {loadable ? (
                        <Button loading={loadMoreLoading} onClick={onLoadMore}>
                            Load More
                        </Button>
                    ) : (
                        'No more activity to load'
                    )}
                </div>
            </div>
        </Loading>
    )
}

export default Log
