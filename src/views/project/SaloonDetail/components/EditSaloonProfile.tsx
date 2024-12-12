import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import {
    closeEditSaloonDetailDialog,
    useAppDispatch,
    useAppSelector,
    putSaloon,
} from '../store'
// import CustomerForm, { FormikRef, FormModel } from '@/views/crm/CustomerForm'
import SaloonForm, { FormikRef, FormModel } from '../SaloonForm/SaloonForm'
import cloneDeep from 'lodash/cloneDeep'

type DrawerFooterProps = {
    onSaveClick?: () => void
    onCancel?: () => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="ml-2" onClick={onCancel}>
                إلغاء
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                حفظ
            </Button>
        </div>
    )
}

const EditCustomerProfile = ({ fetchData }: any) => {
    const dispatch = useAppDispatch()

    const formikRef = useRef<FormikRef>(null)

    const dialogOpen = useAppSelector(
        (state) => state.projectSaloonDetails.data.editSaloonDetailDialog
    )
    const saloon = useAppSelector(
        (state) => state.projectSaloonDetails.data.profileData.saloon
    )

    const onDrawerClose = () => {
        dispatch(closeEditSaloonDetailDialog())
    }

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    const onFormSubmit = (values: FormModel) => {
        const clonedData = cloneDeep(saloon)
        const {
            name,
            facebook, 
            instagram,
            tiktok,
            snapchat,
            address,
            categories,
            phone,
            logo
        } = values

        const newCategories = categories.map((category) => category.id)

        const formData = new FormData()

        formData.append("name", name)
        formData.append("_id", saloon._id)
        formData.append("categories", JSON.stringify(newCategories))
        formData.append("address", address)
        formData.append("phone", phone)
        formData.append("facebook", facebook)
        formData.append("instagram", instagram)
        formData.append("tiktok", tiktok)
        formData.append("snapchat", snapchat)
        formData.append('location[type]', 'Point')
        formData.append("location[coordinates][]", "39.19057020516831");
        formData.append("location[coordinates][]", "21.53677989904675");
        formData.append('type', saloon.type)
        formData.append('logo', logo)

        for(let i = 0; i < clonedData.images.length; i++) {
            formData.append("images", clonedData.images[i])
        }

        const response = dispatch(putSaloon(formData))
        response.then(data => {
            if(data.payload.responseType === 'Success') {
                toast.push(
                    <Notification title={'Successfully Modified'} type="success">
                        تم التعديل بنجاح
                    </Notification>
                )

                fetchData()
            }
        })
        onDrawerClose()
    }

    return (
        <Drawer
            isOpen={dialogOpen}
            closable={false}
            bodyClass="p-0"
            footer={
                <DrawerFooter
                    onCancel={onDrawerClose}
                    onSaveClick={formSubmit}
                />
            }
            onClose={onDrawerClose}
            onRequestClose={onDrawerClose}
        >
            <SaloonForm
                ref={formikRef}
                saloon={saloon}
                onFormSubmit={onFormSubmit}
            />
        </Drawer>
    )
}

export default EditCustomerProfile
