import { DataTable } from "@/components/Table/reservations/data-table";
import { columns } from "@/components/Table/reservations/columns"
import { useUserContext } from "@/context/userContext";
import { Timeline } from "@/components/timeline";

export const Main = () => {
    const { users } = useUserContext();
    return (
        <main className="w-full flex flex-1 max-md:flex-col gap-4 p-4 ">
            <Timeline />
            <section className="md:w-4/5 md:pr-8">
                <DataTable columns={columns} data={users} />
            </section>
        </main>
    )
}