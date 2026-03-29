import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react'

interface IProps {
    data: any[],
    columns: any[]
}

const Table: React.FC<IProps> = ({ data, columns }) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="p-4 m-3 rounded-lg border border-gray-300 shadow-sm overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="bg-gray-100 sticky top-0 z-10">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    className="px-4 py-3 font-semibold uppercase text-gray-700 border-b border-gray-300 select-none"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr
                            key={row.id}
                            className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                        >
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    className=" border-gray-200 px-4 py-3 align-top text-gray-800"
                                    style={cell.column.id === 'description' ? {
                                        overflow: 'hidden',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: 'vertical',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal',
                                    } : {}}
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
