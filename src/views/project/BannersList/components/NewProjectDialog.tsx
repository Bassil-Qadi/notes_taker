import Dialog from '@/components/ui/Dialog'
import NewCategoryForm from './NewCategoryForm'
import {
    toggleNewBannerDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewProjectDialog = () => {
    const dispatch = useAppDispatch()

    const newBannerDialog = useAppSelector(
        (state) => state.bannersList.data.newBannerDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewBannerDialog(false))
    }

    return (
        <Dialog
            isOpen={newBannerDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة عرض جديد</h4>
            <div className="max-h-96 overflow-y-auto mt-4 px-4">
                <NewCategoryForm />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
