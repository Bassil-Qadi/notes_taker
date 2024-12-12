import { useRef } from 'react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import CustomerTableFilter from '@/views/crm/Customers/components/CustomerTableFilter'
import {
    HiOutlinePlusCircle,
    HiOutlineSearch,
} from 'react-icons/hi'
import {
    setSearch,
    toggleNewBannerDialog,
    useAppDispatch,
} from '../store'

import { useAppSelector } from '@/views/crm/Customers/store'

import debounce from 'lodash/debounce'
import type { ChangeEvent } from 'react'

const ActionBar = () => {
    const dispatch = useAppDispatch()

    const inputRef = useRef(null)

    const selectedSaloon = useAppSelector(
        state => state.crmCustomers.data.filterData.selectedSaloon
    )

    const onAddNewProject = () => {
        dispatch(toggleNewBannerDialog(true))
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
            <h3 className="mb-4 lg:mb-0">قائمة العروض</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-1">
                <CustomerTableFilter />
                <Input
                    ref={inputRef}
                    size="sm"
                    placeholder="بحث"
                    prefix={<HiOutlineSearch className="text-lg" />}
                    onChange={handleInputChange}
                    className='mb-4'
                />
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewProject}
                    className='mb-4'
                    disabled={!selectedSaloon}
                >
                    عرض جديد
                </Button>
            </div>
        </div>
    )
}

export default ActionBar
