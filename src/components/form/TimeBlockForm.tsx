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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { useUserContext } from "@/context/userContext"
import { Block } from "@/types/block"

const formSchema = z.object({
    user: z.string().min(1, "Por favor seleccione un usuario").refine(value => value !== "Seleccione un usuario", {
        message: "Por favor seleccione un usuario"
    }),
    color: z.string().min(1, "Por favor seleccione un color"),
    initialDate: z.string().nonempty({
        message: "Por favor digite una fecha"
    }),
    finalDate: z.string().nonempty({
        message: "Por favor digite una fecha"
    }),
})

interface TimeBlockFormProps {
    onClose?: () => void
}

export function TimeBlockForm({ onClose }: TimeBlockFormProps) {
    const { toast } = useToast(); // Inicializa useToast
    const { users, addDate } = useUserContext();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            user: "",
            color: "#ffffff",
            initialDate: "",
            finalDate: "",
        }
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        const blockTime: Block = {
            id: crypto.randomUUID(),
            color: data.color,
            initialDate: data.initialDate.toString(),
            finalDate: data.finalDate.toString(),
        }

        addDate(data.user, blockTime);

        // Muestra el toast de éxito
        toast({
            title: "Bloque guardado",
            description: "El bloque de tiempo ha sido guardado correctamente.",
            variant: "default",
        });

        // Limpia el formulario después de enviar (opcional)
        form.reset();
        if (onClose) onClose();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 rounded-md flex flex-col justify-center">
                <FormField
                    control={form.control}
                    name="user"
                    render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Usuario</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Seleccione un usuario" />
                                </SelectTrigger>
                                <SelectContent>
                                    {users.map((user) => (
                                        <SelectItem key={user.id} value={user.id}>
                                            {user.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color</FormLabel>
                            <Input type="color" value={field.value} onChange={field.onChange} />
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col md:flex-row gap-6 md:gap-4">
                    <FormField control={form.control} name="initialDate" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Fecha inicio</FormLabel>
                            <Input type="datetime-local" value={field.value} onChange={field.onChange} min={new Date().toISOString().slice(0, 16)}
                            />
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="finalDate" render={({ field, fieldState }) => (
                        <FormItem>
                            <FormLabel>Fecha final</FormLabel>
                            <Input type="datetime-local" value={field.value} onChange={field.onChange} min={new Date().toISOString().slice(0, 16)}
                            />
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                        </FormItem>
                    )} />
                </div>
                <Button className="w-fit" type="submit">Guardar</Button>
            </form>
        </Form >
    )
}