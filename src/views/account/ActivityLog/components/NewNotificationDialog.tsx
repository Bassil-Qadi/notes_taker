import Dialog from '@/components/ui/Dialog'
import NewNotificationForm from './NewNotificationForm'
import {
    toggleNewNotificationDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewProjectDialog = () => {
    const dispatch = useAppDispatch()

    const newNotificationDialog = useAppSelector(
        (state) => state.accountActivityLog.data.newNotificationDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewNotificationDialog(false))
    }

    return (
        <Dialog
            isOpen={newNotificationDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة إشعار جديد</h4>
            <div className="max-h-96 overflow-y-auto mt-4 px-4">
                <NewNotificationForm />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
