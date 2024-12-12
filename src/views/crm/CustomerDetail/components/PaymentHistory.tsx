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
  }

const columnHelper = createColumnHelper<OrderHistory>()

const columns = [
    columnHelper.accessor('_id', {
        header: 'Saloon ID',
        cell: (props) => {
            const row = props.row.original
            return (
                <div>
                    <span className="cursor-pointer">{row._id}</span>
                </div>
            )
        },
    }),
    columnHelper.accessor('logo', {
        header: 'logo',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full" src={row.logo} alt="Rounded avatar" />
                </div>
            )
        },
    }),
    columnHelper.accessor('name', {
        header: 'Saloon',
    }),
    columnHelper.accessor('createdBy', {
        header: 'CreatedBy',
        cell: (props) => {
            const row = props.row.original
            return (
                <div className="flex items-center">
                    {/* <Badge className={statusColor[row.createdBy.name]} /> */}
                    <span className="ml-2 rtl:mr-2 capitalize">
                        {row.createdBy.name}
                    </span>
                </div>
            )
        },
    }),
]

const PaymentHistory = ({ userId }: PaymentHistoryProps) => {
    
    const dispatch = useAppDispatch()

    const data = useProjectListSelector(
        (state) => state.projectList.data.saloonsList?.filter(saloon => saloon?.createdBy?.id === userId)
    )
   
    // const [saloonsList, setSaloonsList] = useState([])
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
            <h6 className="mb-4">Saloons List</h6>
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
