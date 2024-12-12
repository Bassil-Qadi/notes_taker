import { forwardRef } from 'react'
import {
    // setCustomerList,
    setUsersList,
    createUser,
    setCreateDrawerClose,
    useAppDispatch,
    useAppSelector,
    User
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm, { FormikRef, FormModel } from '@/views/crm/CustomerForm'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'

const UserCreateContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const customer = useAppSelector(
        (state) => state.crmCustomers.data.selectedCustomer
    )

    const currentUserId = useAppSelector(
        state => state.auth.user.id
    )

    const selectedSaloon = useAppSelector(
        state => state.crmCustomers.data.filterData.selectedSaloon
    )

    const data = useAppSelector((state) => state.crmCustomers.data.usersList)

    const onFormSubmit = (values: FormModel) => {
        const {
            name,
            job,
            image
        } = values

        const formData = new FormData()

        formData.append('name', name)
        formData.append('job', job)
        formData.append('image', new Blob([image], { type: image.type }))
        formData.append('saloonId', selectedSaloon)
        formData.append('createdBy', currentUserId || '')

        const basicInfo = { name, job, image, createdBy: currentUserId, saloonId: selectedSaloon }
        let newData = cloneDeep(data)
        let newUser: User = {...basicInfo}
        newData.push(newUser)

        if (!isEmpty(newUser)) {
            let response = dispatch(createUser(formData as any))

            response.then(data => {
                if(data?.payload?.responseType === 'Success') {
                    dispatch(setCreateDrawerClose())
                    dispatch(setUsersList(newData))
                    toast.push(
                        <Notification title={'Successfully Added'} type="success">
                            تم إضافة الموظف بنجاح
                        </Notification>
                    )
                }
            })
        }
        dispatch(setCreateDrawerClose())
    }

    return (
        <CustomerForm
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

UserCreateContent.displayName = 'UserCreateContent'

export type { FormikRef }

export default UserCreateContent