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

import { LoginSchema } from "../../model/schema";

export const LoginModal = ({ onForgot }: { onForgot: () => void }) => {
    const { auth } = useMobxStore();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onLogin = (values: z.infer<typeof LoginSchema>) => {
        auth.login(values.email, values.password);
        navigate("/");
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Вход</DialogTitle>
                <DialogDescription>
                    Введите почту и пароль для авторизации
                </DialogDescription>
            </DialogHeader>

            <Form {...form}>
                <form className="grid gap-4 py-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
                                <FormControl>
                                    <Input
                                        autoFocus
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

                    <Button
                        variant="link"
                        className="p-0 m-0 h-auto justify-start"
                        onClick={(e) => {
                            e.preventDefault();
                            onForgot();
                        }}
                    >
                        Забыли пароль?
                    </Button>

                    <DialogFooter>
                        <div className="w-full flex flex-col gap-4">
                            <Button
                                className="w-full"
                                onClick={form.handleSubmit(onLogin)}
                                disabled={auth.isLoading}
                            >
                                Войти
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};
