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
import { useUserContext } from "@/context/userContext";

const UserCell = ({ row }: { row: Row<User> }) => {
    const user = row.original as User
    const { deleteUser } = useUserContext()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem>Editar</DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteUser(user.id)}>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const columns: ColumnDef<User>[] = [
    {
        accessorKey: "name",
        header: "Nombre",
    },
    {
        accessorKey: "phone",
        header: "Teléfono",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "city",
        header: "Ciudad",
    },
    {
        accessorKey: "date",
        header: "Fecha",
    },
    {
        id: "actions",
        cell: UserCell
    }

]
