import AdaptableCard from '@/components/shared/AdaptableCard'
import Container from '@/components/shared/Container'
import Log from './components/Log'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import NewNotificationDialog from './components/NewNotificationDialog'
import NotificationAddOutlinedIcon from '@mui/icons-material/NotificationAddOutlined'
import reducer, {
    useAppDispatch,
    useAppSelector,
    toggleDeleteNotificationDialog,
    toggleNewNotificationDialog,
    setSelectedNotification,
    deleteNotification,
    getNotifications,
} from './store'
import { injectReducer } from '@/store'

injectReducer('accountActivityLog', reducer)

const ActivityLog = () => {
    const dispatch = useAppDispatch()

    const selectedNotification = useAppSelector(
        (state) => state.accountActivityLog.data.deletedNotification,
    )
    const dialogOpen = useAppSelector(
        (state) => state.accountActivityLog.data.deleteDialog,
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteNotificationDialog(false))
        dispatch(setSelectedNotification(''))
    }

    const onAddNewNotification = () => dispatch(toggleNewNotificationDialog(true))

    const onDeleteNotification = () => {
        dispatch(toggleDeleteNotificationDialog(false))
        let response = dispatch(deleteNotification(selectedNotification))

        response.then((data) => {
            if (data.payload.statusCode === 201) {
                dispatch(getNotifications())
                toast.push(
                    <Notification title={'Successfully Deleted'} type="success">
                        تم حذف الإشعار بنجاح
                    </Notification>,
                )
            }
        })
    }

    return (
        <Container>
            <AdaptableCard>
                <div className="grid lg:grid-cols-5 gap-8 ">
                    <div className="col-span-4 order-last md:order-first">
                        <div className="flex items-center justify-between">
                            <h3 className="mb-6">قائمة الإشعارات</h3>
                            <Button
                                variant="solid"
                                icon={<NotificationAddOutlinedIcon />}
                                onClick={onAddNewNotification}
                            >
                                إرسال إشعار جديد
                            </Button>
                        </div>
                        <Log />
                    </div>
                    {/* <LogFilter /> */}
                </div>
            </AdaptableCard>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="حذف الإشعار"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDeleteNotification}
            >
                <p>
                    هل أنت متأكد من أنك تريد حذف هذا الإشعار سيتم حذف جميع
                    السجلات المتعلقة بهذا الإشعار أيضًا. لا يمكن التراجع عن هذا
                    الإجراء.
                </p>
            </ConfirmDialog>
            <NewNotificationDialog />
        </Container>
    )
}

export default ActivityLog
