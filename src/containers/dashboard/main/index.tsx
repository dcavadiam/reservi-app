import { Input } from "@/components/ui/input";
import { TimeBlockForm } from "@/components/form/TimeBlockForm";
import { UserForm } from "@/components/form/UserForm";
import { UsersTable } from "@/components/table";

export const Main = () => {
    return (
        <main className="w-full flex gap-4 p-4 ">
            <section className="w-1/5 flex gap-4 justify-center">
                <div className="h-full flex flex-col justify-between items-center pt-7">
                    <span className="text-center text-xs">00:00</span>
                    <span className="text-center text-xs">12:00</span>
                    <span className="text-center text-xs">24:00</span>
                </div>
                <div className=" h-full flex flex-col items-center gap-4">
                    <span className="text-center text-xs">Linea de tiempos</span>
                    <div className="w-20 h-full border dark:border-neutral-800 border-gray-800 rounded-md p-3">

                    </div>

                </div>
            </section>
            <section className="w-3/5">
                <div className="flex justify-between items-center">
                    <h2>Lista de usuarios</h2>
                    <Input className="w-full max-w-[150px]" placeholder="Buscar" />
                </div>
                <UsersTable />
            </section>
            <section className="w-1/5">
                <h2 className="text-center font-bold">Nuevo usuario</h2>
                <UserForm />
                <h2 className="text-center font-bold">Crear bloque de tiempo</h2>
                <TimeBlockForm />

            </section>
        </main>
    )
}