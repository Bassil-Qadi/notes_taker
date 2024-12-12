import Dialog from '@/components/ui/Dialog'
import NewClinicForm from './NewClinicForm'
import {
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

const NewProjectDialog = () => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useAppSelector(
        (state) => state.projectList.data.newProjectDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewProjectDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة عيادة جديد</h4>
            <div className="max-h-96 overflow-y-auto mt-4 px-4">
                <NewClinicForm />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
