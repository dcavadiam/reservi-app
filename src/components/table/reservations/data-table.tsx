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

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [filterText, setFilterText] = useState(""); // Estado único para el input
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
            globalFilter: filterText // Usamos un filtro global
        },
        globalFilterFn: (row, columnId, filterValue) => {
            const columnsToSearch = selectedTags.length === 0 ? ["name", "email", "phone", "city"] : selectedTags;
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
                <div className="flex items-center gap-4 py-4 justify-between">
                    <h2 className="text-xl font-bold text-black dark:text-white">Lista de usuarios</h2>

                    
                    <div className="flex items-center py-4 gap-3">
                        <MultiSelect />
                        <Input
                            placeholder="Buscar..."
                            value={filterText}
                            onChange={(event) => setFilterText(event.target.value)}
                            className="max-w-sm"
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
                                        <TableCell key={cell.id}>
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