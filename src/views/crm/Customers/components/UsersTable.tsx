import { useEffect, useCallback, useMemo, useState } from 'react'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import {
    getUsers,
    deleteUser,
    setTableData,
    setSelectedCustomer,
    setDeletedUserId,
    setDrawerOpen,
    useAppDispatch,
    useAppSelector,
    User
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
import CustomerEditDialog from './CustomerEditDialog'
import UserCreateDialog from './UserCreateDialog'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import { Link, useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'

const statusColor: Record<string, string> = {
    isVerified: 'bg-emerald-500',
    notVerified: 'bg-red-500',
}

const ActionColumn = ({ row, onDialogOpen }: { row: any, onDialogOpen: (id: string) => void }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onEdit = () => {
        dispatch(setDrawerOpen())
        dispatch(setSelectedCustomer(row))
    }

    return (
        <div className='flex justify-center align-center gap-4'>
            <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            تعديل
        </div>
        <div
            className={`text-red-600 cursor-pointer select-none font-semibold`}
            onClick={() => onDialogOpen(row._id || '')}
        >
            حذف
        </div>
        </div>
    )
}

const NameColumn = ({ row }: { row: User }) => {
    const { textTheme } = useThemeClass()

    return (
        <div className="flex items-center">
            <Avatar size={28} shape="circle">
                {row.name.charAt(0).toUpperCase()}
            </Avatar>
            <Link
                className={`hover:${textTheme} ml-2 rtl:mr-2 font-semibold`}
                to={`/app/crm/customer-details?id=${row.id}`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const Customers = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const usersData = useAppSelector((state) => state.crmCustomers.data.usersList)
    const deletedUserId = useAppSelector((state) => state.crmCustomers.data.deletedUserId)
    const loading = useAppSelector((state) => state.crmCustomers.data.loading)
    const filterData = useAppSelector(
        (state) => state.crmCustomers.data.filterData
    )

    const { pageIndex, pageSize, sort, query, total } = useAppSelector(
        (state) => state.crmCustomers.data.tableData
    )

    const [dialogOpen, setDialogOpen] = useState(false)

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onDialogOpen = (id: string) => {
        dispatch(setDeletedUserId(id))
        setDialogOpen(true)
    }

    const fetchData = useCallback(() => {
        if(filterData.selectedSaloon) dispatch(getUsers({ saloonId: filterData.selectedSaloon }))
    }, [pageIndex, pageSize, sort, query, filterData, dispatch])

    useEffect(() => {
        fetchData()
    }, [fetchData, pageIndex, pageSize, sort, filterData])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                header: 'الاسم',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'الوظيفة',
                accessorKey: 'job',
                cell: (props) => {
                    const row = props.row.original
                    return <div className="flex items-center">
                    {row?.job}
                  </div>
                },
            },
            {
                header: 'الصالون',
                accessorKey: 'saloonId',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                          {row?.saloonId?.name}
                        </div>
                    )
                },
            },
            {
                header: 'تاريخ الإنشاء',
                accessorKey: 'createdAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.createdAt).format('MM/DD/YYYY')}
                        </div>
                    )
                },
            },
            {
                header: 'آخر تحديث',
                accessorKey: 'updatedAt',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.createdAt).format('MM/DD/YYYY')}
                        </div>
                    )
                },
            },
            {
                header: 'المزيد',
                id: 'action',
                cell: (props) => <ActionColumn row={props.row.original} onDialogOpen={onDialogOpen} />,
            },
        ],
        []
    )

    const onPaginationChange = (page: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value: number) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort: OnSortParam) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onDelete = () => {
        setDialogOpen(false)
        if (deletedUserId) {
           let response =  dispatch(deleteUser({ deletedUserId }))

           response.then(data => {
            fetchData()
                toast.push(
                    <Notification title={'Successfully Deleted'} type="success">
                        تم الحذف بنجاح
                    </Notification>
                )
           })
        }
    }

    // const filterItems = (items: User[], filter: boolean | string) => {
    //     if (filter === 'all') {
    //         return items;
    //     }
    
    //     return items.filter(item => item.isVerified === filterData.isVerified)
    // }

    return (
        <>
            <DataTable
                columns={columns}
                data={usersData}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={loading}
                pagingData={{
                    total: tableData.total as number,
                    pageIndex: tableData.pageIndex as number,
                    pageSize: tableData.pageSize as number,
                }}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <CustomerEditDialog />
            <UserCreateDialog />
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
                هل أنت متأكد من أنك تريد حذف هذا المستخدم؟ سيتم حذف جميع السجلات المتعلقة بهذا المستخدم أيضًا. لا يمكن التراجع عن هذا الإجراء.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default Customers
