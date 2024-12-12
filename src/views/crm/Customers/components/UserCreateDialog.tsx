import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import UserCreateContent, { FormikRef } from './UserCreateContent'
import {
    setCreateDrawerClose,
    setSelectedCustomer,
    useAppDispatch,
    useAppSelector,
} from '../store'
import type { MouseEvent } from 'react'

type DrawerFooterProps = {
    onSaveClick: (event: MouseEvent<HTMLButtonElement>) => void
    onCancel: (event: MouseEvent<HTMLButtonElement>) => void
}

const DrawerFooter = ({ onSaveClick, onCancel }: DrawerFooterProps) => {
    return (
        <div className="text-right w-full">
            <Button size="sm" className="mx-2" onClick={onCancel}>
                إلغاء
            </Button>
            <Button size="sm" variant="solid" onClick={onSaveClick}>
                إضافة
            </Button>
        </div>
    )
}

const UserCreateDialog = () => {
    const dispatch = useAppDispatch()
    const drawerOpen = useAppSelector(
        (state) => state.crmCustomers.data.createDrawerOpen
    )

    const onDrawerClose = () => {
        dispatch(setCreateDrawerClose())
        dispatch(setSelectedCustomer({}))
    }

    const formikRef = useRef<FormikRef>(null)

    const formSubmit = () => {
        formikRef.current?.submitForm()
    }

    return (
        <Drawer
            isOpen={drawerOpen}
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
            <UserCreateContent ref={formikRef} />
        </Drawer>
    )
}

export default UserCreateDialog
