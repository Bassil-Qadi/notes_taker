import Dialog from '@/components/ui/Dialog'
import NewSaloonUserForm from './NewSaloonUserForm'
// import NewCategoryForm from './NewCategoryForm'
import {
    toggleNewSaloonUserDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'


const NewSaloonUserDialog = ({ fetchSaloonUsers }: any) => {
    const dispatch = useAppDispatch()

    const newSaloonUSerDialog = useAppSelector(
        (state) => state.projectSaloonDetails.data.newSaloonUserDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewSaloonUserDialog(false))
    }

    return (
        <Dialog
            isOpen={newSaloonUSerDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة مسؤول جديد</h4>
            <div className="mt-4">
                <NewSaloonUserForm fetchData={fetchSaloonUsers} />
            </div>
        </Dialog>
    )
}

export default NewSaloonUserDialog
