import { useState, useEffect } from 'react'
import Table from '@/components/ui/Table'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    createColumnHelper,
} from '@tanstack/react-table'
import { useAppSelector, useAppDispatch, OrderHistory } from '../store'
import { getSaloonsList, useAppSelector as useProjectListSelector } from '@/views/project/ProjectList/store'

const { Tr, Th, Td, THead, TBody, Sorter } = Table

interface PaymentHistoryProps {
    userId: string | null;
    data: [] | undefined
  }

const columnHelper = createColumnHelper<OrderHistory>()

const DAYS_TO_ARABIC: any = {
    'Sunday': 'الأحد',
    'Monday': 'الإثنين',
    'Tuesday': 'الثلاثاء',
    'Saturday': 'السبت',
    'Wednesday': 'الأربعاء',
    'Thursday': 'الخميس',
    'Friday': 'الجمعة',
}

const columns = [
    // columnHelper.accessor('_id', {
    //     header: 'ID',
    //     cell: (props) => {
    //         const row = props.row.original
    //         return (
    //             <div>
    //                 <span className="cursor-pointer">{row._id}</span>
    //             </div>
    //         )
    //     },
    // }),
    columnHelper.accessor('day', {
        header: 'اليوم',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span>{row.day}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('open', {
        header: 'يفتح',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span>{row.open}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('close', {
        header: 'يغلق',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <span>{row.close}</span>
                </div>
            )
        },
    }),
]

const PaymentHistory = ({ data }: any) => {
    
    const dispatch = useAppDispatch()
  
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

    return (
        <div className="mb-8">
            <h6 className="mb-4">أيام العمل</h6>
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

export default PaymentHistory
