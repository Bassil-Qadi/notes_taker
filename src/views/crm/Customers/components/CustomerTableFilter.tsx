import { useState, useEffect } from 'react'
import Select from '@/components/ui/Select'
import Badge from '@/components/ui/Badge'
import { setFilterData, useAppDispatch, useAppSelector } from '../store'
import { getSaloonsList } from '@/views/project/ProjectList/store'
import {
    components,
    ControlProps,
    OptionProps,
    SingleValue,
} from 'react-select'
import { HiCheck } from 'react-icons/hi'

type Option = {
    _id: string
    value: boolean | string
    label: string
    color: string
}

const { Control } = components

const CustomSelectOption = ({
    innerProps,
    label,
    data,
    isSelected,
}: OptionProps<Option>) => {
    return (
        <div
            className={`flex items-center justify-between p-2 cursor-pointer ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center gap-2">
                <Badge innerClass={data.color} />
                <span>{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }: ControlProps<Option>) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Badge
                    className="ltr:ml-4 rtl:mr-4"
                    innerClass={selected.color}
                />
            )}
            {children}
        </Control>
    )
}

const CustomerTableFilter = () => {
    const dispatch = useAppDispatch()

    const currentUserId = useAppSelector(
        state => state.auth.user.id
    )
    const currentUserRole = useAppSelector(state => state?.auth?.user?.role)
    const currentUserSaloonId = useAppSelector(state => state?.auth?.user?.saloonId)

    const [saloonsList, setSaloonsList] = useState([])

    const { selectedSaloon } = useAppSelector(
        (state) => state?.crmCustomers?.data?.filterData
    )

    useEffect(() => {
        let response = dispatch(getSaloonsList())
        response.then((data: any) => {
            if(data.payload) {
                let newSaloonsList = data?.payload?.filter((saloon: any) => currentUserRole === 'owner' ? saloon?.userId === currentUserId : saloon?._id === currentUserSaloonId)?.map((saloon: any) => {
                    return {
                        ...saloon,
                        label: saloon.name,
                        value: saloon._id
                    }
                })
                setSaloonsList(newSaloonsList)
            }
        })
    }, [])

    const onStatusFilterChange = (selected: SingleValue<Option>) => {
        dispatch(setFilterData({ selectedSaloon: selected?._id }))
    }

    return (
        <Select<Option>
            placeholder="اختر الصالون"
            options={saloonsList}
            size="sm"
            className="mb-4 min-w-[130px]"
            components={{
                Option: CustomSelectOption,
                Control: CustomControl,
            }}
            value={saloonsList?.filter((saloon: any) => saloon.value === selectedSaloon)}
            onChange={onStatusFilterChange}
        />
    )
}

export default CustomerTableFilter
