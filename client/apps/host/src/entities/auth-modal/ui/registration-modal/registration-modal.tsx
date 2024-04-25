import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
} from "@/shared/ui/dialog";
import {
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    Form,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { InputPassword } from "@/shared/ui/custom/input-password";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

import { RegistrationSchema } from "../../model/schema";

export const RegistrationModal = () => {
    const { auth } = useMobxStore();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof RegistrationSchema>>({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

    const onRegistration = (values: z.infer<typeof RegistrationSchema>) => {
        auth.registration(values.email, values.password, values.username ?? "");
        navigate("/");
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Регистрация</DialogTitle>
                <DialogDescription>
                    Введите почту и пароль для регистрации
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Имя пользователя{" "}
                                    <span className="text-muted-foreground text-xs font-normal">
                                        (необязательное поле)
                                    </span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="username"
                                        className="col-span-3"
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(
                                                event.target.value.toLowerCase(),
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="frontend@mastery.com"
                                        className="col-span-3"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <InputPassword
                                        placeholder="******"
                                        className="col-span-3"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <div className="w-full flex flex-col gap-4">
                            <Button
                                className="w-full"
                                onClick={form.handleSubmit(onRegistration)}
                                disabled={auth.isLoading}
                            >
                                Зарегистрироваться
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};
