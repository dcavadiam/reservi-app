import { DataTable } from "@/components/table/reservations/data-table";
import { columns } from "@/components/table/reservations/columns"
import { useUserContext } from "@/context/userContext";

export const Main = () => {
    const { users } = useUserContext();
    return (
        <main className="w-full flex flex-1 max-md:flex-col gap-4 p-4 ">
            <section className="flex gap-4 p-6 justify-center md:w-1/5 max-md:flex-col-reverse reverse">
                <div className="h-full flex md:flex-col justify-between items- md:pt-7">
                    <span className="text-center text-xs">00:00</span>
                    <span className="text-center text-xs">12:00</span>
                    <span className="text-center text-xs">24:00</span>
                </div>
                <div className=" h-full flex flex-col items-center gap-4">
                    <span className="text-center text-xs">Linea de tiempos</span>
                    <div className="w-full h-14 border dark:border-neutral-800 border-gray-800 rounded-md p-3 md:w-20 md:h-full">
                    </div>
                </div>
            </section>
            <section className="md:w-4/5 md:pr-8">
                <DataTable columns={columns} data={users} />
            </section>
            {/* <section className="md:w-1/5">
                <h2 className="text-center font-bold">Nuevo usuario</h2>
                <UserForm />
                <h2 className="text-center font-bold">Crear bloque de tiempo</h2>
                <TimeBlockForm />
            </section> */}
        </main>
    )
}