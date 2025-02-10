"use client"

import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data: data || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility
        }
    })

    return (
        <div>
            <div>
                <div className="flex items-center gap-4 py-4 justify-between">
                    <h2 className="text-xl font-bold text-black dark:text-white">Lista de usuarios</h2>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Filtros
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .slice(0, 5).map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
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