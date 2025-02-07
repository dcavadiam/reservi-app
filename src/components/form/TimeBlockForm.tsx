'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
    user: z.string().nonempty(
        { message: "Por favor digite un nombre" }
    ),
    date: z.string().nonempty({
        message: "Por favor digite una fecha"
    }),
})

export function TimeBlockForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            date: Date.now().toString(),
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        console.log(data)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4  p-4 rounded-md flex flex-col justify-center items-center">
                <FormField control={form.control} name="user" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Nombre" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="date" render={({ field }) => (
                    <FormItem>
                        <Input type="datetime-local" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-fit" type="submit">Guardar</Button>
            </form>
        </Form>
    )
}