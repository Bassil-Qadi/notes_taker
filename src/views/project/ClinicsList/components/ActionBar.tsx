import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import {
    HiOutlinePlusCircle,
    HiOutlineSearch,
} from 'react-icons/hi'
import {
    setSearch,
    toggleNewProjectDialog,
    useAppDispatch,
    useAppSelector
} from '../store'
import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'

const ActionBar = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)

    const currentUserId = useAppSelector(
        state => state.auth.user.id
    )

    const saloonsList = useAppSelector(
        state => state.projectList.data.saloonsList?.filter((saloon: any) => saloon.userId === currentUserId && saloon.type === 'clinic')
    )

    const currentUserRole = useAppSelector(
        state => state.auth.user.role
    )

    const onAddNewProject = () => {
        dispatch(toggleNewProjectDialog(true))
    }

    const debounceFn = debounce(handleDebounceFn, 500)

    function handleDebounceFn(val: string) {
        dispatch(setSearch(val))
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        debounceFn(e.target.value)
    }

    return (
        <div className="lg:flex items-center justify-between mb-4">
            <h3 className="mb-4 lg:mb-0">قائمة العيادات</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <Input
                    ref={inputRef}
                    size="sm"
                    placeholder="بحث"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                />
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewProject}
                >
                    إضافة عيادة جديدة
                </Button>
                {/* {saloonsList?.length > 0 && currentUserRole === 'owner' && <Tooltip title={'لا يمكنك إضافة أكثر من صالون'}>
                    <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    disabled={saloonsList?.length > 0}
                    onClick={onAddNewProject}
                >
                    إضافة عيادة جديدة
                </Button>
                    </Tooltip> }
                
                {saloonsList?.length === 0 && currentUserRole === 'owner' && <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewProject}
                >
                    إضافة عيادة جديدة
                </Button>} */}
            </div>
        </div>
    )
}

export default ActionBar
