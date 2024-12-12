import { useRef } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    setFAQs,
    setSelected,
    toggleAddFaq,
    toggleEditFaq,
    toggleArticleDeleteConfirmation,
    deleteFAQ,
    addFAQ,
    updateFAQ,
    useAppDispatch,
    useAppSelector,
    Article
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const Confirmations = ({ data }: { data: Article[] }) => {
    const dispatch = useAppDispatch()

    const categoryAddTitleInputRef = useRef<HTMLInputElement>(null)
    const categoryAddDescInputRef = useRef<HTMLInputElement>(null)

    const articleDeleteConfirmation = useAppSelector(
        (state) =>
            state.knowledgeBaseManageArticles.data.articleDeleteConfirmation
    )

    const faqAddDialog = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.faqAddDialog
    )
    const faqEditDialog = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.faqEditDialog
    )
    const selected = useAppSelector(
        (state) => state.knowledgeBaseManageArticles.data.selected
    )

    const currentUserId = useAppSelector(
        (state) => state.auth.user.id
    )

    const onArticleDeleteConfirmationClose = () => {
        dispatch(toggleArticleDeleteConfirmation(false))
    }

    const onArticleDeleteConfirm = () => {
        const allFAQs = cloneDeep(data)
        const removedData = allFAQs.filter((faq) => faq._id !== selected.id)
        dispatch(toggleArticleDeleteConfirmation(false))
        dispatch(deleteFAQ(selected.id))
        dispatch(setFAQs(removedData))
        dispatch(setSelected({}))
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                تم حذف السؤال بنجاح
            </Notification>
        )
    }

    const onFagEditConfirm = () => {
        const allFAQs = cloneDeep(data)
        const editedFAQs = allFAQs.map(faq => {
            if(faq._id === selected._id) {
                return {
                    ...faq,
                    title: categoryAddTitleInputRef.current.value || faq.title,
                    description: categoryAddDescInputRef.current.value || faq.description
                }
            }
            return faq
        })

        dispatch(setFAQs(editedFAQs))
        dispatch(updateFAQ({
            id: selected._id,
            title: categoryAddTitleInputRef.current.value || selected.title,
            description: categoryAddDescInputRef.current.value || selected.description,
            updatedBy: currentUserId
        }))
        dispatch(toggleEditFaq(false))
    }

    const onFaqAddDialogClose = () => {
        dispatch(toggleAddFaq(false))
    }

    const onFaqEditDialogClose = () => {
        dispatch(toggleEditFaq(false))
    }

    const onCategoryAddDialogConfirm = () => {
        const allFAQs = cloneDeep(data)
        if (categoryAddTitleInputRef.current && categoryAddDescInputRef.current) {
            let returndedData = dispatch(addFAQ({
                title: categoryAddTitleInputRef.current.value,
                description: categoryAddDescInputRef.current.value,
                createdBy: currentUserId,
            }))

            returndedData.then(data => {
                if(data.payload.statusCode === 201) {
                    const newData = [
                        ...allFAQs,
                        data.payload.data
                    ]
                    dispatch(setFAQs(newData))
                }
            })
        }
        dispatch(toggleAddFaq(false))
        toast.push(
            <Notification title={'Successfully Added'} type="success">
                تم إضافة السؤال بنجاح
            </Notification>
        )
    }

    return (
        <>
            <ConfirmDialog
                isOpen={articleDeleteConfirmation}
                type="danger"
                title="حذف السؤال"
                confirmButtonColor="red-600"
                onClose={onArticleDeleteConfirmationClose}
                onRequestClose={onArticleDeleteConfirmationClose}
                onCancel={onArticleDeleteConfirmationClose}
                onConfirm={onArticleDeleteConfirm}
            >
                <p>
                هل أنت متأكد من أنك تريد حذف هذا السؤال لا يمكن التراجع عن هذا الإجراء.
                </p>
            </ConfirmDialog>
            <Dialog
                isOpen={faqAddDialog}
                onClose={onFaqAddDialogClose}
                onRequestClose={onFaqAddDialogClose}
            >
                <h5 className="mb-4">إضافة سؤال</h5>
                <div className="mb-4">  
                    <label className="mb-2">السؤال</label>
                    <Input ref={categoryAddTitleInputRef} />
                </div>
                <div>
                    <label className="mb-2">الإجابة</label>
                    <Input ref={categoryAddDescInputRef} />
                </div>
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
                isOpen={faqEditDialog}
                onClose={onFaqEditDialogClose}
                onRequestClose={onFaqEditDialogClose}
            >
                <h5 className="mb-4">تعديل السؤال</h5>
                <div className="mb-4">  
                    <label className="mb-2">السؤال</label>
                    <Input ref={categoryAddTitleInputRef} placeholder={selected?.title} />
                </div>
                <div>
                    <label className="mb-2">الإجابة</label>
                    <Input ref={categoryAddDescInputRef} placeholder={selected?.description} />
                </div>
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
