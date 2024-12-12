import { forwardRef } from 'react'
import {
    // setCustomerList,
    setUsersList,
    putCustomer,
    putUser,
    setDrawerClose,
    useAppDispatch,
    useAppSelector,
    Customer,
    User
} from '../store'
import cloneDeep from 'lodash/cloneDeep'
import isEmpty from 'lodash/isEmpty'
import CustomerForm, { FormikRef, FormModel } from '@/views/crm/CustomerForm'
import dayjs from 'dayjs'

const CustomerEditContent = forwardRef<FormikRef>((_, ref) => {
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector(
        (state) => state.auth.user.id
    )

    const customer = useAppSelector(
        (state) => state.crmCustomers.data.selectedCustomer
    )

    const data = useAppSelector((state) => state.crmCustomers.data.usersList)
    const { id } = customer

    const onFormSubmit = (values: FormModel) => {
        const {
            name,
            email,
            phone,
            role,
            // password
        } = values

        const basicInfo = { name, email, phone, role, updatedBy: currentUserId?.toString() }
        let newData = cloneDeep(data)
        let editedCustomer: Partial<User> = {}
        newData = newData.map((elm) => {
            if (elm.id === id) {
                elm = { ...elm, ...basicInfo }
                editedCustomer = elm
            }
            return elm
        })

        let putData: Partial<User> = {
            ...basicInfo
        }

        if (!isEmpty(editedCustomer)) {
            dispatch(putUser(putData))
        }
        dispatch(setDrawerClose())
        // dispatch(setCustomerList(newData))
        dispatch(setUsersList(newData))
    }

    return (
        <CustomerForm
            action='edit'
            ref={ref}
            customer={customer}
            onFormSubmit={onFormSubmit}
        />
    )
})

CustomerEditContent.displayName = 'CustomerEditContent'

export type { FormikRef }

export default CustomerEditContent
