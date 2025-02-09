import { TimeBlockForm } from "@/components/form/TimeBlockForm"
import { UserForm } from "@/components/form/UserForm"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { UserRoundPlus, CalendarPlus } from "lucide-react"
export const Header = () => {
    return (
        <header className="flex items-center justify-between py-4 px-10 border-b-[1px] border-opacity-20 border-white">
            <h1 className="text-xl font-bold text-black dark:text-white">Reservas</h1>
            <div className="flex gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="hover:scale-105 duration-200">
                            <UserRoundPlus /> Añadir usuario
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Añadir usuario</DialogTitle>
                            <DialogDescription>
                                Añade un nuevo usuario a la reserva
                            </DialogDescription>
                        </DialogHeader>
                        <UserForm />
                    </DialogContent>
                </Dialog>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="hover:scale-105 duration-200">
                            <CalendarPlus />
                            Crear bloque de tiempo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Añadir bloque de tiempo</DialogTitle>
                            <DialogDescription>
                                Añade un nuevo bloque de tiempo a un usuario existente
                            </DialogDescription>
                        </DialogHeader>
                        <TimeBlockForm />
                    </DialogContent>
                </Dialog>
            </div>
        </header>
    )
}