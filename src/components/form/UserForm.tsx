'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useUserContext } from "@/context/userContext";

const formSchema = z.object({
    name: z.string().nonempty(
        { message: "Por favor digite un nombre" }
    ),
    phone: z.string().nonempty(
        { message: "Por favor digite un número de teléfono" }
    ),
    email: z.string().email(
        { message: "Por favor digite un correo válido" }
    ),
    city: z.string().nonempty(
        { message: "Por favor digite una ciudad" }
    ),
});

export function UserForm() {
    const { toast } = useToast(); // Inicializa useToast
    const { addUser } = useUserContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            city: "",
        }
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        // Simula una carga exitosa
        console.log(data);
        addUser({
            id: crypto.randomUUID(),
            name: data.name,
            email: data.email,
            phone: data.phone,
            city: data.city,
            date: "",
        });
        // Muestra el toast de éxito
        toast({
            title: "Usuario guardado",
            description: "El usuario ha sido guardado correctamente.",
            variant: "default",
        });

        // Limpia el formulario después de enviar (opcional)
        form.reset();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4 rounded-md flex flex-col justify-center">
                <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Nombre" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Teléfono" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Correo" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="city" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Ciudad" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-fit" type="submit">Guardar</Button>
            </form>
        </Form>
    );
}