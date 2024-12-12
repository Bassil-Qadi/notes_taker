import { useRef, useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import {
    getCustomers,
    setTableData,
    setFilterData,
    setCreateDrawerOpen,
    useAppDispatch,
    useAppSelector,
} from '../store'
import CustomerTableSearch from './CustomerTableSearch'
import CustomerTableFilter from './CustomerTableFilter'
import cloneDeep from 'lodash/cloneDeep'
import { HiOutlinePlusCircle } from "react-icons/hi"
import type { TableQueries } from '@/@types/common'
import { getSaloonsList } from '@/views/project/ProjectList/store'


const CustomersTableTools = () => {
    const dispatch = useAppDispatch()
    // const [saloonsList, setSaloonsList] = useState([])

    const inputRef = useRef<HTMLInputElement>(null)

    const tableData = useAppSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const selectedSaloon = useAppSelector(
        (state) => state.crmCustomers.data.filterData.selectedSaloon
    )


    // useEffect(() => {
    //     fetchSaloons()
    // }, [])

    const handleInputChange = (val: string) => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = val
        newTableData.pageIndex = 1
        if (typeof val === 'string' && val.length > 1) {
            fetchData(newTableData)
        }

        if (typeof val === 'string' && val.length === 0) {
            fetchData(newTableData)
        }
    }

    // const fetchSaloons = () => {
    //     let response = dispatch(getSaloonsList())
    //     response.then(data => {
    //         if(data.payload) {
    //             let newSaloonsList = data?.payload?.filter((saloon: any) => saloon?.createdBy?.id === currentUserId)?.map((saloon: any) => {
    //                 return {
    //                     ...saloon,
    //                     label: saloon.name,
    //                     value: saloon._id
    //                 }
    //             })
    //             setSaloonsList(newSaloonsList)
    //         }
    //     })
    // }

    const fetchData = (data: TableQueries) => {
        dispatch(setTableData(data))
        dispatch(getCustomers(data))
    }

    const onCreateUser = () => {
        dispatch(setCreateDrawerOpen())
    }

    const onClearAll = () => {
        const newTableData = cloneDeep(tableData)
        newTableData.query = ''
        if (inputRef.current) {
            inputRef.current.value = ''
        }
        dispatch(setFilterData({ status: '' }))
        fetchData(newTableData)
    }

    return (
        <div className="md:flex items-center justify-between">
            <div className="md:flex items-center gap-4">
                <CustomerTableFilter />
                <Button
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onCreateUser}
                    className="mb-4"
                    disabled={!selectedSaloon}
                >
                    إضافة موظف جديد
                </Button>
            </div>
            {/* <div className="mb-4">
                <Button size="sm" onClick={onClearAll}>
                    مسح الكل
                </Button>
            </div> */}
        </div>
    )
}

export default CustomersTableTools
