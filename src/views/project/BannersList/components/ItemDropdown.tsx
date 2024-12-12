import { useAppDispatch, toggleDeleteBannerDialog, setDeletedBannerId, setSelectedBanner, toggleEditBannerDialog } from '../store'
import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlinePencil,
    HiOutlineFolderRemove 
} from 'react-icons/hi'
import EllipsisButton from '@/components/shared/EllipsisButton'


const ItemDropdown = ({ bannerId, banner }: any) => {
    
    const dispatch = useAppDispatch()

    const handleOpenDeleteBanner = () => {
        dispatch(toggleDeleteBannerDialog(true))
        dispatch(setDeletedBannerId(bannerId))
    }

    const handleOpenEditBanner = () => {
        dispatch(setSelectedBanner(banner))
        dispatch(toggleEditBannerDialog(true))
    }
    
    const dropdownList = [
        { label: 'تعديل', value: 'editProject', icon: <HiOutlinePencil  />, click: handleOpenEditBanner },
        { label: 'حذف', value: 'categoryRemove', icon: <HiOutlineFolderRemove  />, click: handleOpenDeleteBanner },
    ]

    return (
        <Dropdown placement="bottom-end" renderTitle={<EllipsisButton />}>
            {dropdownList.map((item) => (
                <Dropdown.Item key={item.value} eventKey={item.value} onClick={item.click}>
                    <span className="text-lg">{item.icon}</span>
                    <span className="ml-2 rtl:mr-2">{item.label}</span>
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default ItemDropdown
