import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Upload from '@/components/ui/Upload'
import {
    setPages,
    toggleAddPage,
    toggleEditPage,
    toggleArticleDeleteConfirmation,
    deletePage,
    addPage,
    updatePage,
    useAppDispatch,
    useAppSelector,
    Page,
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { FcImageFile } from 'react-icons/fc'

const Confirmations = ({ data, selectedSaloonId }: { data: Page[], selectedSaloonId: string }) => {
    const dispatch = useAppDispatch()

    const [workImage, setWorkImage] = useState()

    const articleDeleteConfirmation = useAppSelector(
        (state) =>
            state.knowledgeBaseManagePages.data.articleDeleteConfirmation,
    )
    const pageAddDialog = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pageAddDialog,
    )
    const pageEditDialog = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.pageEditDialog,
    )
    const selected = useAppSelector(
        (state) => state.knowledgeBaseManagePages.data.selected,
    )
    const currentUserId = useAppSelector((state) => state.auth.user.id)

    const onArticleDeleteConfirmationClose = () => {
        dispatch(toggleArticleDeleteConfirmation(false))
    }

    const onArticleDeleteConfirm = () => {
        const allFAQs = cloneDeep(data)
        const removedData = allFAQs.filter((faq) => faq._id !== selected.id)
        dispatch(toggleArticleDeleteConfirmation(false))
        dispatch(deletePage(selected.id))
        dispatch(setPages(removedData))
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                تم حذف العمل بنجاح
            </Notification>,
        )
    }

    const onFagEditConfirm = () => {
        let formData = new FormData()
        const allPages = cloneDeep(data)
        const editedPages = allPages.map((page) => {
            if (page._id === selected._id) {
                return {
                    ...page,
                    image: URL.createObjectURL(workImage)
                }
            }
            return page
        })

        formData.append('image', workImage)
        formData.append('saloonId', selectedSaloonId)
        formData.append('updatedBy', currentUserId)
        formData.append('id', selected._id)

        dispatch(setPages(editedPages))
        dispatch(
            updatePage(formData),
        )
        dispatch(toggleEditPage(false))
    }

    const onFaqAddDialogClose = () => {
        dispatch(toggleAddPage(false))
    }

    const onFaqEditDialogClose = () => {
        dispatch(toggleEditPage(false))
    }

    const onCategoryAddDialogConfirm = () => {
        let formData = new FormData()
        const allPages = cloneDeep(data)
        if (workImage) {
            formData.append('image', workImage)
            formData.append('saloonId', selectedSaloonId)
            formData.append('createdBy', currentUserId)
           
            let returndedData = dispatch(
                addPage(formData)
            )

            returndedData.then((data) => {
                if (data.payload.statusCode === 201) {
                    console.log(data.payload.data)
                    const newData = [...allPages, data.payload.data]
                    dispatch(setPages(newData))
                }
            })
        }
        dispatch(toggleAddPage(false))
        toast.push(
            <Notification title={'Successfully Added'} type="success">
                تم إضافة العمل بنجاح
            </Notification>,
        )
    }

    return (
        <>
            <ConfirmDialog
                isOpen={articleDeleteConfirmation}
                type="danger"
                title="حذف العمل"
                confirmButtonColor="red-600"
                onClose={onArticleDeleteConfirmationClose}
                onRequestClose={onArticleDeleteConfirmationClose}
                onCancel={onArticleDeleteConfirmationClose}
                onConfirm={onArticleDeleteConfirm}
            >
                <p>
                    هل أنت متأكد من أنك تريد حذف هذا العمل لا يمكن التراجع عن
                    هذا الإجراء.
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={pageAddDialog}
                onClose={onFaqAddDialogClose}
                onRequestClose={onFaqAddDialogClose}
            >
                <h5 className="mb-4">إضافة عمل</h5>
                {/* <div className="mb-4">  
                    <label className="mb-2">العنوان</label>
                    <Input ref={categoryAddTitleInputRef} />
                </div>
                <div>
                    <label className="mb-2">الموضوع</label>
                    <Input ref={categoryAddDescInputRef} />
                </div> */}
                <Upload
                    draggable
                    uploadLimit={1}
                    onChange={(files) => {
                        setWorkImage(files[0])
                    }}
                >
                    <div className="my-10 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcImageFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your image here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: jpeg, png, gif
                        </p>
                    </div>
                </Upload>
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onFaqAddDialogClose}
                    >
                        إلغاء
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={onCategoryAddDialogConfirm}
                    >
                        إضافة
                    </Button>
                </div>
            </Dialog>
            <Dialog
                isOpen={pageEditDialog}
                onClose={onFaqEditDialogClose}
                onRequestClose={onFaqEditDialogClose}
            >
                <h5 className="mb-4">تعديل العمل</h5>
                {/* <div className="mb-4">
                    <label className="mb-2">العنوان</label>
                    <Input
                        ref={categoryAddTitleInputRef}
                        placeholder={selected?.title}
                    />
                </div>
                <div>
                    <label className="mb-2">الموضوع</label>
                    <Input
                        ref={categoryAddDescInputRef}
                        placeholder={selected?.description}
                    />
                </div> */}
                <Upload
                    draggable
                    uploadLimit={1}
                    onChange={(files) => {
                        setWorkImage(files[0])
                    }}
                >
                    <div className="my-10 text-center">
                        <div className="text-6xl mb-4 flex justify-center">
                            <FcImageFile />
                        </div>
                        <p className="font-semibold">
                            <span className="text-gray-800 dark:text-white">
                                Drop your image here, or{' '}
                            </span>
                            <span className="text-blue-500">browse</span>
                        </p>
                        <p className="mt-1 opacity-60 dark:text-white">
                            Support: jpeg, png, gif
                        </p>
                    </div>
                </Upload>
                <div className="text-right mt-6">
                    <Button
                        size="sm"
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={onFaqEditDialogClose}
                    >
                        إلغاء
                    </Button>
                    <Button
                        size="sm"
                        variant="solid"
                        onClick={onFagEditConfirm}
                    >
                        حفظ
                    </Button>
                </div>
            </Dialog>
        </>
    )
}

export default Confirmations
