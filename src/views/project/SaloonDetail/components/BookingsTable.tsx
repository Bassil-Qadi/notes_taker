import { useEffect, useCallback, useMemo, useState } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import Dialog from '@/components/ui/Dialog'
import {
    // getBookings,
    // getBookingById,
    // deleteBooking,
    // setTableData,
    // setSelectedCustomer,
    // setDeletedUserId,
    useAppDispatch,
    useAppSelector,
} from '../store'
import useThemeClass from '@/utils/hooks/useThemeClass'
// import EditBookingForm from './EditBookingForm'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import { getBookings } from '@/views/bookings/Customers/store'

// const ActionColumn = ({
//     row,
//     onDialogOpen,
//     onEditDialogOpen
// }: {
//     row: any
//     onDialogOpen: (id: string) => void
//     onEditDialogOpen: (id: string) => void
// }) => {
//     const { textTheme } = useThemeClass()
//     const dispatch = useAppDispatch()

//     const onEdit = () => {
//         onEditDialogOpen(row._id || '')
//         dispatch(setSelectedCustomer(row))
//     }

//     return (
//         <>
//         {row.status === 'pending' ? <div className="flex justify-center align-center gap-4">
//             <div
//                 className={`${textTheme} cursor-pointer select-none font-semibold`}
//                 onClick={onEdit}
//             >
//                 تعديل
//             </div>
//             <div
//                 className={`text-red-600 cursor-pointer select-none font-semibold`}
//                 onClick={() => onDialogOpen(row._id || '')}
//             >
//                 حذف
//             </div>
//         </div>
//         : <span>لا يمكن التعديل على حجز ملغي</span>
//         }
//         </>
//     )
// }

const BookingsTable = () => {
    const dispatch = useAppDispatch()
    // const usersData = useAppSelector(
    //     (state) => state.bookings.data.bookingsList,
    // )
    // const deletedUserId = useAppSelector(
    //     (state) => state.bookings.data.deletedUserId,
    // )
    // const selectedBooking = useAppSelector(
    //     (state) => state.bookings.data.selectedBooking,
    // )
    // const loading = useAppSelector((state) => state.bookings.data.loading)
    // const filterData = useAppSelector((state) => state.bookings.data.filterData)

    // const { pageIndex, pageSize, sort, query, total } = useAppSelector(
    //     (state) => state.bookings.data.tableData,
    // )

    const [dialogOpen, setDialogOpen] = useState(false)
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [saloonBookings, setSaloonBookings] = useState([])

    const selectedSaloonId = useAppSelector(
        state => state.projectSaloonDetails.data.profileData?.saloon._id
    )

    const onDialogClose = () => {
        setDialogOpen(false)
    }

    const onEditDialogClose = () => {
        setEditDialogOpen(false)
    }

    const onEditDialogOpen = (id: string) => {
        // dispatch(getBookingById(id))
        setEditDialogOpen(true)
    }

    const onDialogOpen = (id: string) => {
        // dispatch(getBookingById(id))
        // dispatch(setDeletedUserId(id))
        setDialogOpen(true)
    }

    const fetchData = () => {
        dispatch(getBookings({ saloonId: selectedSaloonId }))
    }

    useEffect(() => {
        fetchData()
    }, [])

    // const tableData = useMemo(
    //     () => ({ pageIndex, pageSize, sort, query, total }),
    //     [pageIndex, pageSize, sort, query, total],
    // )



    const columns: ColumnDef<any>[] = useMemo(
        () => [
            {
                header: 'وقت الحجز',
                accessorKey: 'bookingTime',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {/* {dayjs().format('DD/MM/YYYY h:m A')} */}
                            {row?.bookingTime}
                        </div>
                    )
                },
            },
            {
                header: 'السعر',
                accessorKey: 'total',
                cell: (props) => {
                    const row = props.row.original
                    return <div className="flex items-center">{row?.total}</div>
                },
            },
            {
                header: 'طريقة الدفع',
                accessorKey: 'paymentMethod',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.paymentMethod}
                        </div>
                    )
                },
            },
            {
                header: 'الحالة',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag>{row?.status}</Tag>
                        </div>
                    )
                },
            },
            {
                header: 'الخدمات المقدمة',
                accessorKey: 'serviceIds',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {row?.serviceIds?.map((service: any) => (
                                <Tag key={service?.id}>{service?.name}</Tag>
                            ))}
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
            // {
            //     header: 'المزيد',
            //     id: 'action',
            //     cell: (props) => (
            //         <ActionColumn
            //             row={props.row.original}
            //             onDialogOpen={onDialogOpen}
            //             onEditDialogOpen={onEditDialogOpen}
            //         />
            //     ),
            // },
        ],
        [],
    )

    // const onPaginationChange = (page: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageIndex = page
    //     dispatch(setTableData(newTableData))
    // }

    // const onSelectChange = (value: number) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.pageSize = Number(value)
    //     newTableData.pageIndex = 1
    //     dispatch(setTableData(newTableData))
    // }

    // const onSort = (sort: OnSortParam) => {
    //     const newTableData = cloneDeep(tableData)
    //     newTableData.sort = sort
    //     dispatch(setTableData(newTableData))
    // }

    // const onDelete = () => {
    //     setDialogOpen(false)
    //     if (deletedUserId) {
    //         let response = dispatch(
    //             deleteBooking({
    //                 deleteBookingId: deletedUserId,
    //                 userId: selectedBooking.userId,
    //             }),
    //         )

    //         response.then((data) => {
    //             fetchData()
    //             toast.push(
    //                 <Notification title={'Successfully Deleted'} type="success">
    //                     تم الحذف بنجاح
    //                 </Notification>,
    //             )
    //         })
    //     }
    // }

    return (
        <>
            <DataTable
                columns={columns}
                data={saloonBookings}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                // loading={loading}
                // pagingData={{
                //     total: tableData.total as number,
                //     pageIndex: tableData.pageIndex as number,
                //     pageSize: tableData.pageSize as number,
                // }}
                // onPaginationChange={onPaginationChange}
                // onSelectChange={onSelectChange}
                // onSort={onSort}
            />
            <Dialog
            isOpen={editDialogOpen}
            onClose={onEditDialogClose}
            onRequestClose={onEditDialogClose}
        >
            <h4>تعديل تفاصيل الحجز</h4>
            <div className="max-h-96 overflow-y-auto mt-4 px-4">
                {/* <EditBookingForm setEditDialogOpen={setEditDialogOpen} /> */}
            </div>
        </Dialog>
            <ConfirmDialog
                isOpen={dialogOpen}
                type="danger"
                title="إلغاء الحجز"
                confirmButtonColor="red-600"
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                onCancel={onDialogClose}
                // onConfirm={onDelete}
            >
                <p>
                    هل أنت متأكد من أنك تريد إلغاء هذا الحجز؟ سيتم حذف جميع
                    السجلات المتعلقة بهذا الحجز أيضًا. لا يمكن التراجع عن هذا
                    الإجراء.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default BookingsTable
