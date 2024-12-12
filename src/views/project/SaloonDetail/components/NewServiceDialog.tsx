import Dialog from '@/components/ui/Dialog'
import NewServiceForm from './NewServiceForm'
// import NewCategoryForm from './NewCategoryForm'
import {
    toggleNewServiceDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'


const NewServiceDialog = ({ saloonCategories, saloonStaff, fetchData }: any) => {
    const dispatch = useAppDispatch()

    const newServiceDialog = useAppSelector(
        (state) => state.projectSaloonDetails.data.newServiceDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewServiceDialog(false))
    }

    return (
        <Dialog
            isOpen={newServiceDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة خدمة جديدة</h4>
            <div className="max-h-96 overflow-y-auto mt-4 px-4">
                <NewServiceForm saloonCategories={saloonCategories} saloonStaff={saloonStaff} fetchData={fetchData} />
            </div>
        </Dialog>
    )
}

export default NewServiceDialog
