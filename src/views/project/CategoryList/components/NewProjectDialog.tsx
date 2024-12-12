import Dialog from '@/components/ui/Dialog'
import NewCategoryForm from './NewCategoryForm'
import {
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector,
} from '../store'

import { useAppSelector as useSaloonDetailsSelector, toggleNewCategoryDialog } from '../../SaloonDetail/store'

const NewProjectDialog = ({ saloonId, fetchData }: any) => {
    const dispatch = useAppDispatch()

    const newProjectDialog = useSaloonDetailsSelector(
        (state) => state.projectSaloonDetails.data.newCategoryDialog
    )

    const onDialogClose = () => {
        dispatch(toggleNewCategoryDialog(false))
    }

    return (
        <Dialog
            isOpen={newProjectDialog}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h4>إضافة صنف جديد</h4>
            <div className="mt-4">
                <NewCategoryForm saloonId={saloonId} fetchData={fetchData} />
            </div>
        </Dialog>
    )
}

export default NewProjectDialog
