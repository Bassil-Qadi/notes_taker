import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import {
    FaFacebookF,
    FaSnapchat,
    FaTiktok,
    FaInstagram
} from 'react-icons/fa'
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'
import {
    openEditSaloonDetailDialog,
    useAppDispatch,
    Saloon
} from '../store'
import { deleteSaloon, changeSaloonStatus } from '../../ProjectList/store'
import EditSaloonProfile from './EditSaloonProfile'

type SaloonInfoFieldProps = {
    title?: string
    value?: string
    color?: string
}

type CustomerProfileProps = {
    data?: Partial<Saloon>
    fetchData: () => void
}

const SaloonInfoField = ({ title, value, color }: SaloonInfoFieldProps) => {
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

const SaloonProfileAction = ({ id, status = '', onchangeStatus, fetchData }: { id?: string, status: string, onchangeStatus: any, fetchData: () => void }) => {
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
            dispatch(deleteSaloon(id))
        }
        navigate('/app/project/project-list')
        toast.push(
            <Notification title={'Successfully Deleted'} type="success">
                تم حذف الصالون بنجاح
            </Notification>,
        )
    }

    const onEdit = () => {
        dispatch(openEditSaloonDetailDialog())
    }

    const onChangeSaloonStatus = () => {
        let response = dispatch(changeSaloonStatus({
            saloonId: id,
            isActive: !status
        }))

        response.then(data => {
            if(data.payload?.statusCode === 200) {
                onchangeStatus(!status)
                toast.push(
                    <Notification title={'Successfully Modified'} type="success">
                        تم تغيير الحالة بنجاح
                    </Notification>,
                )
            }
        })
    }

    return (
        <>
            {/* <Button block onClick={onChangeSaloonStatus}>
                <span className={`${ status ? 'text-red-600' : 'text-green-600' }`}>{ status ? 'إلغاء التفعيل' : 'تفعيل' }</span>
            </Button> */}
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
                title="حذف الحساب"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                onConfirm={onDelete}
            >
                <p>
                    هل أنت متأكد أنك تريد حذف هذا الحساب كل سجل المتعلقة بهذا
                    الحساب سيتم حذفها أيضًا. هذا لا يمكن التراجع عن الإجراء.
                </p>
            </ConfirmDialog>
            <EditSaloonProfile fetchData={fetchData} />
        </>
    )
}

const SaloonProfile = ({ data = {}, fetchData }: CustomerProfileProps) => {

    const [profileStatus, setProfileStatus] = useState(data?.isActive)

    const onSocialLinkClick = (link: string) => window.open(link, '_newtab')

    return (
        <Card>
            <div className="flex flex-col xl:justify-between h-full 2xl:min-w-[360px] mx-auto">
                <div className="flex xl:flex-col items-center gap-4">
                    {/* <Avatar src={data?.logo} size={90} shape="circle" /> */}
                    <img src={data?.logo} alt={data?.name} width={190} height={190} />
                    <h4 className="font-bold">{data.name?.toUpperCase()}</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-y-7 gap-x-4 mt-8">
                    <SaloonInfoField title="الاسم" value={data.name} />
                    {data?.createdBy?.name && <SaloonInfoField title="المالك" value={data?.createdBy?.name} />}
                    <SaloonInfoField
                        title="التصنيف"
                        value={data?. type === 'saloon' ? 'صالون' : 'عيادة'}
                    />
                    <SaloonInfoField
                        title="تاريخ الإنشاء"
                        value={dayjs(data?.createdAt).format('DD/MM/YYYY')}
                    />
                    <SaloonInfoField
                        title="رقم الجوال"
                        value={data?.phone}
                    />
                    <SaloonInfoField
                        title="العنوان"
                        value={data?.address}
                    />
                    <div className="mb-7">
                        <span>وسائل التواصل الاجتماعي</span>
                        <div className="flex mt-4">
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaFacebookF className="text-[#1773ea]" />
                                }
                                onClick={() => onSocialLinkClick(data.facebook)}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={<FaSnapchat className="text-[#fde047]" />}
                                onClick={() => onSocialLinkClick(data.snapchat)}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaTiktok className="text-[#c026d3]" />
                                }
                                onClick={() => onSocialLinkClick(data.tiktok)}
                            />
                            <Button
                                className="mr-2"
                                shape="circle"
                                size="sm"
                                icon={
                                    <FaInstagram className="text-[#ec4899]" />
                                }
                                onClick={() => onSocialLinkClick(data.instagram)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex flex-col xl:flex-row gap-2">
                    <SaloonProfileAction id={data._id} status={profileStatus} onchangeStatus={setProfileStatus} fetchData={fetchData} />
                </div>
            </div>
        </Card>
    )
}

export default SaloonProfile
