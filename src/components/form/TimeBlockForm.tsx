'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    user: z.string().nonempty(
        { message: "Por favor digite un nombre" }
    ),
    initialDate: z.string().nonempty({
        message: "Por favor digite una fecha"
    }),
    finalDate: z.string().nonempty({
        message: "Por favor digite una fecha"
    }),
})

export function TimeBlockForm() {

    const { toast } = useToast(); // Inicializa useToast

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            initialDate: Date.now().toString(),
            finalDate: Date.now().toString(),
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
            // Simula una carga exitosa
            console.log(data);
    
            // Muestra el toast de éxito
            toast({
                title: "Bloque guardado",
                description: "El bloque de tiempo ha sido guardado correctamente.",
                variant: "default",
            });
    
            // Limpia el formulario después de enviar (opcional)
            form.reset();
        }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-md flex flex-col justify-center">
                <FormField control={form.control} name="user" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Usuario</FormLabel>
                        <Input placeholder="Nombre" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                    <FormField control={form.control} name="initialDate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha inicio</FormLabel>
                            <Input  type="datetime-local" {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="finalDate" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fecha final</FormLabel>
                            <Input  type="datetime-local" {...field} />
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                <Button className="w-fit" type="submit">Guardar</Button>
            </form>
        </Form>
    )
}