import { useEffect, useRef } from 'react'
import classNames from 'classnames'
import GridItem from './GridItem'
import ListItem from './ListItem'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Dialog from '@/components/ui/Dialog'
import EditCategoryForm, { FormikRef, FormModel } from './EditCategoryForm'
import Spinner from '@/components/ui/Spinner'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {
    getCategoryList,
    deleteCategory,
    putCategory,
    useAppDispatch,
    useAppSelector,
    toggleDeleteCategoryDialog,
    toggleEditCategoryDialog,
} from '../store'
import { Button } from '@/components/ui'

const ProjectListContent = () => {
    const dispatch = useAppDispatch()

    const formikRef = useRef<FormikRef>(null)

    const loading = useAppSelector((state) => state.categoryList.data.loading)
    const currentUserId = useAppSelector((state) => state.auth.user.id)
    const categoryList = useAppSelector(
        (state) => state.categoryList.data.categoriesList.filter(category => category.createdBy === currentUserId)
    )
    const view = useAppSelector((state) => state.categoryList.data.view)
    const { sort, search } = useAppSelector(
        (state) => state.categoryList.data.query,
    )
    const dialogOpen = useAppSelector(
        (state) => state.categoryList.data.deleteCategoryDialog,
    )
    const editDialogOpen = useAppSelector(
        (state) => state.categoryList.data.editCategoryDialog,
    )
    const selectedCategory = useAppSelector(
        (state) => state.categoryList.data.selectedCategory,
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const onEditDialogClose = () => {
        dispatch(toggleEditCategoryDialog(false))
    }

    const onDeleteCategory = () => {
        dispatch(deleteCategory(selectedCategory))
        dispatch(toggleDeleteCategoryDialog(false))
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const onFormSubmit = (values: FormModel) => {
        const formData = new FormData();
        const { name, description, image } = values

        formData.append('name', name)
        formData.append('description', description)
        formData.append('createdBy', currentUserId || '')
        formData.append('file', image)
        formData.append('categoryId', selectedCategory._id)

        let returndedData = dispatch(putCategory(formData))

        returndedData.then(data => {
            if(data?.payload?.statusCode === 201) {
                dispatch(getCategoryList())
            }
        })

        dispatch(toggleEditCategoryDialog(false))
        toast.push(
            <Notification title={'Successfully Modified'} type="success">
                تم تعديل الصنف بنجاح
            </Notification>
        )
    }

    useEffect(() => {
        dispatch(getCategoryList())
    }, [dispatch, sort, search])

    return (
        <>
            <div
                className={classNames(
                    'mt-6 h-full flex flex-col',
                    loading && 'justify-center',
                )}
            >
                {loading && (
                    <div className="flex justify-center">
                        <Spinner size={40} />
                    </div>
                )}
                {view === 'grid' && categoryList.length > 0 && !loading && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {categoryList
                            ?.filter(
                                (category) =>
                                    category.name
                                        .toLocaleLowerCase()
                                        ?.startsWith(search),
                            )
                            ?.map((categoty) => (
                                <GridItem key={categoty._id} data={categoty} />
                            ))}
                    </div>
                )}
                {view === 'list' &&
                    categoryList.length > 0 &&
                    !loading &&
                    categoryList
                        ?.filter(
                            (category) =>
                                category.name
                                    .toLocaleLowerCase()
                                    ?.startsWith(search),
                        )
                        ?.map((categoty) => (
                            <ListItem key={categoty._id} data={categoty} />
                        ))}
            </div>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="حذف الصنف"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDeleteCategory}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذه الفئة؟ كل سجل سيتم حذف
                    المتعلقة بهذه الفئة أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={editDialogOpen}
                // confirmButtonColor="indigo-600"
                onClose={onEditDialogClose}
                onRequestClose={onEditDialogClose}
            >
                <h4>إضافة صنف جديد</h4>
                <EditCategoryForm
                    ref={formikRef}
                    category={selectedCategory}
                    onFormSubmit={onFormSubmit}
                />
                <Button block variant="solid" onClick={formSubmit}>
                    حفظ
                </Button>
            </Dialog>
        </>
    )
}

export default ProjectListContent
