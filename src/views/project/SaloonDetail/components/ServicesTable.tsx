import { useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import useThemeClass from '@/utils/hooks/useThemeClass'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { useAppDispatch } from '../store'
import { getSaloonsList, useAppSelector as useProjectListSelector } from '@/views/project/ProjectList/store'
import { toggleNewServiceDialog, toggleDeleteCategoryDialog, setDeletedCategory, toggleDeleteServiceDialog, setDeletedService } from '../store'
import { Button } from '@/components/ui'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import dayjs from 'dayjs'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

const columnHelper = createColumnHelper<any>()

const ActionColumn = ({ row, onDialogOpen }: { row: any, onDialogOpen: (id: string) => void }) => {
    const { textTheme } = useThemeClass()
    const dispatch = useAppDispatch()

    const onEdit = () => {
        // dispatch(setDrawerOpen())
        // dispatch(setSelectedCustomer(row))
    }

    return (
        <div className='flex justify-center align-center gap-4'>
            {/* <div
            className={`${textTheme} cursor-pointer select-none font-semibold`}
            onClick={onEdit}
        >
            تعديل
        </div> */}
        <div
            className={`text-red-600 cursor-pointer select-none font-semibold`}
            onClick={() => onDialogOpen(row._id || '')}
        >
            حذف
        </div>
        </div>
    )
}

const ServicesTable = ({ data }: any) => {

    const dispatch = useAppDispatch()

    const onDialogOpen = (id: string) => {
        dispatch(setDeletedService(id))
        dispatch(toggleDeleteServiceDialog(true))
    }

    const columns = [
        columnHelper.accessor('name', {
            header: 'الاسم',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        <span>{row.name}</span>
                    </div>
                )
            },
        }),
        columnHelper.accessor('price', {
            header: 'السعر',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        <span>{row.price}</span>
                    </div>
                )
            },
        }),
        columnHelper.accessor('duration', {
            header: 'المدة',
            cell: (props) => {
                const row = props.row.original
                return (
                    <div className="flex items-center">
                        <span>{row.duration}</span>
                    </div>
                )
            },
        }),
        {
            header: 'المزيد',
            id: 'action',
            cell: (props: any) => <ActionColumn row={props.row.original} onDialogOpen={onDialogOpen} />,
        }
    ]
  
    const [sorting, setSorting] = useState<
        {
            id: string
            desc: boolean
        }[]
    >([])

    useEffect(() => {
        dispatch(getSaloonsList())
    }, [])

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const onAddNewService = () => {
        dispatch(toggleNewServiceDialog(true))
    }

    return (
        <div className="mb-8">
            <div className='flex w-full justify-between items-center'>
            <h6 className="mb-4">قائمة الخدمات</h6>
            <Button
                    className='mb-4'
                    size="sm"
                    variant="twoTone"
                    icon={<HiOutlinePlusCircle />}
                    onClick={onAddNewService}
                >
                    إضافة خدمة جديدة
                </Button>
            </div>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? 'cursor-pointer select-none'
                                                            : '',
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {
                                                    <Sorter
                                                        sort={header.column.getIsSorted()}
                                                    />
                                                }
                                            </div>
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <Td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </Td>
                                        )
                                    })}
                                </Tr>
                            )
                        })}
                </TBody>
            </Table>
        </div>
    )
}

export default ServicesTable
