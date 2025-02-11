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
import { User } from "@/types/user";
import { useEffect } from "react";

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
    address: z.string().nonempty(
        { message: "Por favor digite una ciudad" }
    ),
});


interface UserFormProps {
    user?: User
    onClose?: () => void
}

export function UserForm({ user, onClose }: UserFormProps) {
    const { toast } = useToast(); // Inicializa useToast
    const { addUser, editUser } = useUserContext();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            address: "",
        }
    });

    // Set user values in form if provided
    useEffect(() => {
        if (user) {
            form.setValue("name", user.name);
            form.setValue("phone", user.phone);
            form.setValue("email", user.email);
            form.setValue("address", user.address);
        }
    },
        [user, form])


    function onSubmit(data: z.infer<typeof formSchema>) {
        // Crea un nuevo usuario
        if (user) {
            editUser(user.id, {
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
            });
        } else {
            addUser({
                id: crypto.randomUUID(),
                name: data.name,
                email: data.email,
                phone: data.phone,
                address: data.address,
                date: [],
            });
        }

        // Muestra el toast de éxito
        toast({
            title: "Usuario guardado",
            description: "El usuario ha sido guardado correctamente.",
            variant: "default",
        });

        // Limpia el formulario después de enviar (opcional)
        form.reset();
        if (onClose) onClose();
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
                <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                        <Input placeholder="Ciudad" {...field} />
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="w-fit" type="submit">
                    {
                        user ? "Actualizar" : "Guardar"
                    }
                </Button>
            </form>
        </Form>
    );
}