"use client"
import { ColumnDef, Row } from "@tanstack/react-table"
import { User } from "@/types/user";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUserContext } from "@/context/userContext";
import { UserForm } from "@/components/form/UserForm";
import { useState } from "react";
import { Block } from "@/types/block";

const ActionsCell = ({ row }: { row: Row<User> }) => {
    const user = row.original as User
    const { deleteUser } = useUserContext()
    const [open, setOpen] = useState(false); // Controla el estado del Dialog

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {/* Controlamos el estado del Dialog manualmente */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            Editar
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar usuario</DialogTitle>
                            <DialogDescription>
                                Edita los datos del usuario
                            </DialogDescription>
                        </DialogHeader>
                        <UserForm user={user} onClose={() => setOpen(false)} />
                    </DialogContent>
                </Dialog>

                {/* Eliminar Usuario */}
                <DropdownMenuItem onClick={() => deleteUser(user.id)}>
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
        cell: ({ row }) => {
            return (
                <div className="font-semibold text-base text-gray-300">{row.original.name}</div>
            )
        }
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
        cell: ({ row }) => {
            return (
                <div className="font-semibold text-base text-gray-300">{row.original.phone}</div>
            )
        }
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            return (
                <div className="font-semibold text-base text-gray-300">{row.original.email}</div>
            )
        }
    },
    {
        accessorKey: "city",
        header: "Ciudad",
        cell: ({ row }) => {
            return (
                <div className="font-semibold text-base text-gray-300">{row.original.city}</div>
            )
        }
    },
    {
        accessorKey: "date",
        header: "Fecha",
        cell: ({ row }) => {
            return (
                row.original.date.length === 0 ? (
                    <div className="border border-gray-900 dark:border-gray-400 w-8 h-8 rounded-md"></div>
                ) :
                    (
                        <div className="flex gap-2">
                            {
                                row.original.date.map((date: Block) => {

                                    return (

                                        <div key={date.id} className={`border border-gray-900 dark:border-gray-400 w-8 h-8 rounded-md`} style={{ backgroundColor: date.color }}></div>

                                    )
                                })
                            }
                        </div>
                    )
            )
        }
    },
    {
        id: "actions",
        cell: ActionsCell
    }

]
