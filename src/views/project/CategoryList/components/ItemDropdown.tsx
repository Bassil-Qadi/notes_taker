import { useAppDispatch, toggleDeleteCategoryDialog, setDeletedCategoryId, setSelectedCategory, toggleEditCategoryDialog } from '../store'
import Dropdown from '@/components/ui/Dropdown'
import {
    HiOutlineFolderRemove,
    HiOutlinePencil  
} from 'react-icons/hi'
import EllipsisButton from '@/components/shared/EllipsisButton'


const ItemDropdown = ({ categoryId, category }: any) => {

    const dispatch = useAppDispatch()

    const handleOpenDeleteCategory = () => {
        dispatch(toggleDeleteCategoryDialog(true))
        dispatch(setDeletedCategoryId(categoryId))
    }

    const handleOpenEditCategory = () => {
        dispatch(toggleEditCategoryDialog(true))
        dispatch(setSelectedCategory(category))
    }
    
    const dropdownList = [
        { label: 'تعديل', value: 'editProject', icon: <HiOutlinePencil  />, click: handleOpenEditCategory },
        { label: 'حذف', value: 'categoryRemove', icon: <HiOutlineFolderRemove  />, click: handleOpenDeleteCategory },
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
