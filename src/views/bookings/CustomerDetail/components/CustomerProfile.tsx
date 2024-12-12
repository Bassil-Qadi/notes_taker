import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaPinterestP,
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import {
    // deleteCustomer,
    openEditCustomerDetailDialog,
    useAppDispatch,
    User,
} from '../store'
import EditCustomerProfile from './EditCustomerProfile'

type CustomerInfoFieldProps = {
    title?: string
    value?: string
    color?: string
}

type CustomerProfileProps = {
    data?: Partial<User>
}

const CustomerInfoField = ({ title, value, color }: CustomerInfoFieldProps) => {
    return (
        <div>
            <span>{title}</span>
            <p
                className={`${
                    color
                        ? `text-${color}-500 dark:text-${color}-200`
                        : 'text-gray-700 dark:text-gray-200'
                } font-semibold`}
            >
                {value}
            </p>
        </div>
    )
}

const CustomerProfileAction = ({ id }: { id?: string }) => {
    const dispatch = useAppDispatch()
    const [dialogOpen, setDialogOpen] = useState(false)

    const navigate = useNavigate()

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = () => {
        setDialogOpen(true)
    }

    const onDelete = () => {
        setDialogOpen(false)
        if (id) {
            // dispatch(deleteCustomer({ id }))
        }
        navigate('/app/crm/customers')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                تم حذف المستخدم بنجاح
            </Notification>,
        )
    }

    const onEdit = () => {
        dispatch(openEditCustomerDetailDialog())
    }

    return (
        <>
            <Button block icon={<HiOutlineTrash />} onClick={onDialogOpen}>
                حذف
            </Button>
            <Button
                block
                icon={<HiPencilAlt />}
                variant="solid"
                onClick={onEdit}
            >
                تعديل
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="حذف المستخدم"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDelete}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذا المستخدم كل سجل المتعلقة بهذا
                    المستخدم سيتم حذفها أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
            <EditCustomerProfile />
        </>
    )
}

const CustomerProfile = ({ data = {} }: CustomerProfileProps) => {
    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    <Avatar size={90} shape="circle">
                        {data?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                    <h4 className="font-bold">{data.name?.toUpperCase()}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <CustomerInfoField title="البريد الإلكتروني" value={data.email} />
                    <CustomerInfoField title="رقم الجوال" value={data?.phone} />
                    <CustomerInfoField
                        title="حالة الحساب"
                        value={data?.isVerified ? 'موثق' : 'غير موثق'}
                        color={data?.isVerified ? 'green' : 'red'}
                    />
                    <CustomerInfoField
                        title="تاريخ الإنشاء"
                        value={dayjs(data?.createdAt).format('DD/MM/YYYY')}
                    />
                    <CustomerInfoField
                        title="الدور"
                        value={data?.role === 'user' ? 'مستخدم' : 'مسؤول'}
                    />
                    {/* <div className="mb-7">
                        <span>Social</span>
                        <div className="flex mt-4">
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#1773ea]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={<FaTwitter className="text-[#1da1f3]" />}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaLinkedinIn className="text-[#0077b5]" />
                                }
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaPinterestP className="text-[#df0018]" />
                                }
                            />
                        </div>
                    </div> */}
                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <CustomerProfileAction id={data.id} />
                </div>
            </div>
        </Card>
    )
}

export default CustomerProfile
