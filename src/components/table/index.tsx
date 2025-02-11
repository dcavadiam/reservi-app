import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from "@/components/ui/table"

import { IconUserCircle, IconPhone } from '@tabler/icons-react'

import { USERS } from "@/mocks/users";

export const UsersTable = () => {
    return (
        <Table className="w-full mx-auto row-1 row-2 col-2 col-3">
            <TableCaption>Lista de reservas de los usuarios</TableCaption>
            <TableBody>
                {
                    USERS.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium">
                                <IconUserCircle stroke={1.75} />
                            </TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell className="flex items-center gap-1">
                                <IconPhone size={15} stroke={1.75} />
                                {user.phone}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.address}</TableCell>
                            <TableCell>
                                <div className="w-7 h-7 bg-red-200 border-white border rounded-md"></div>
                            </TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}