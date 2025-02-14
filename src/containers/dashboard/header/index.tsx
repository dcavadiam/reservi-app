import { TimeBlockForm } from "@/components/Form/TimeBlockForm"
import { UserForm } from "@/components/Form/UserForm"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useUserContext } from "@/context/userContext"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@radix-ui/react-toast"

import { UserRoundPlus, CalendarPlus } from "lucide-react"
import { useState } from "react"
export const Header = () => {
    const { users } = useUserContext();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    return (
        <header className="flex items-center justify-between py-4 px-4 sm:px-10 border-b-[1px] border-opacity-20 border-white">
            <h1 className="text-xl font-bold text-black dark:text-white">Reservas</h1>
            <div className="flex gap-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="hover:scale-105 duration-200">
                            <UserRoundPlus />
                            <span className="max-sm:hidden">Añadir usuario</span>
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
                {users?.length > 0 ? (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="duration-300 hover:scale-105">
                                <CalendarPlus />
                                <span className="max-sm:hidden">Crear bloque de tiempo</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Añadir bloque de tiempo</DialogTitle>
                                <DialogDescription>
                                    Añade un nuevo bloque de tiempo a un usuario existente
                                </DialogDescription>
                            </DialogHeader>
                            <TimeBlockForm onClose={() => setOpen(false)} />
                        </DialogContent>
                    </Dialog>
                ) : (
                    <Button
                        variant="outline"
                        className="duration-300 hover:scale-105 opacity-50"
                        onClick={() => {
                            toast({
                                title: "No hay usuarios registrados",
                                description: "Aún no hay usuarios registrados, por favor añádeles primero",
                                action: (
                                    <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
                                ),
                            })
                        }}
                    >
                        <CalendarPlus />
                        <span className="max-sm:hidden">Crear bloque de tiempo</span>
                    </Button>
                )}
            </div>
        </header>
    )
}