"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable,
} from "@tanstack/react-table";


import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { MultiSelect } from "@/components/table/reservations/Multiselect";
import { Input } from "@/components/ui/input";
import { useTagsContext } from "@/context/tagsContext";
import { DateSelect } from "@/components/DateSelect";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [filterText, setFilterText] = useState("");
    const { tags } = useTagsContext();

    const selectedTags = tags.map((tag) => tag.value);

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
            globalFilter: filterText
        },
        globalFilterFn: (row, columnId, filterValue) => {
            const columnsToSearch = selectedTags.length === 0 ? ["name", "email", "phone", "address"] : selectedTags;
            return columnsToSearch.some((col) => {
                const value = row.getValue(col);
                return String(value).toLowerCase().includes(filterValue.toLowerCase())
            }
            );
        },
    });


    return (
        <div>
            <div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 py-4 justify-between">
                    <h2 className="text-xl font-bold text-black dark:text-white">Lista de usuarios</h2>


                    <div className="flex flex-col md:flex-row md:items-center py-4 gap-3 ">
                        <DateSelect />
                        <MultiSelect />
                        <Input
                            placeholder="Buscar..."
                            value={filterText}
                            onChange={(event) => setFilterText(event.target.value)}
                            className="md:max-w-sm"
                        />
                    </div>
                </div>
            </div>
            <Table>
                <TableHeader>
                    {
                        table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {
                                    headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {
                                                    header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
                                                }
                                            </TableHead>
                                        )
                                    })
                                }
                            </TableRow>
                        ))
                    }
                </TableHeader>
                <TableBody>
                    {
                        table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>

                                {
                                    row.getVisibleCells().map((cell) => (
                                        <TableCell className="text-gray-900 dark:text-white" key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={columns.length}>
                                    No hay datos para mostrar
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    )
}