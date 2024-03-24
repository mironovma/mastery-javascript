import { z } from "zod";
import { useForm } from "react-hook-form";
import { ReactNode, useState } from "react";
import { observer } from "mobx-react-lite";
import { zodResolver } from "@hookform/resolvers/zod";

import { useMobxStore } from "@/shared/hooks/useMobxStore";
import { Button } from "@/shared/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shared/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";

import { LoginSchema, RegistrationSchema } from "../model/schema";

interface SubmitFunc {
    onLogin: (values: z.infer<typeof LoginSchema>) => void;
    onRegistration: (values: z.infer<typeof RegistrationSchema>) => void;
}

interface AuthModalProps {
    className?: string;
    trigger?: ReactNode;
    onSubmit: SubmitFunc;
}
// TODO: в этом же компоненте сделать две формы: на регистрацию и авторизацию
// обе запихиваю в authmodal
// по локальному состоянию переключаю либо на рег, либо на лог
// разные схемы валидации
// и далее на сервере делаю возможность передачи еще username

export const AuthModal = observer(
    ({ className, trigger, onSubmit }: AuthModalProps) => {
        const { auth } = useMobxStore();

        const [isRegistration, setIsRegistration] = useState<boolean>(false);

        return (
            <div className={className}>
                <Dialog>
                    <DialogTrigger asChild>
                        {trigger ?? (
                            <Button className="text-white" variant="link">
                                Вход и регистрация
                            </Button>
                        )}
                    </DialogTrigger>
                    <DialogContent>
                        {isRegistration ? (
                            <RegistrationModal
                                isLoading={auth.isLoading}
                                onRegistration={onSubmit.onRegistration}
                            />
                        ) : (
                            <LoginModal
                                isLoading={auth.isLoading}
                                onLogin={onSubmit.onLogin}
                            />
                        )}
                        <DialogDescription className="flex gap-1 -mt-2">
                            {!isRegistration
                                ? "Нет аккаунта?"
                                : "Уже есть аккаунт?"}
                            <Button
                                variant="link"
                                className="p-0 m-0 h-auto"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setIsRegistration((prev) => !prev);
                                }}
                            >
                                {!isRegistration
                                    ? "Зарегистрируйтесь!"
                                    : "Авторизируйтесь!"}
                            </Button>
                            {/* {auth.error && (
                                <div>{JSON.stringify(auth.error)}</div>
                            )} */}
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        );
    },
);

const LoginModal = ({
    isLoading,
    onLogin,
}: {
    isLoading: boolean;
    onLogin: ({ email, password }: z.infer<typeof LoginSchema>) => void;
}) => {
    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

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
                                    <Input
                                        type="password"
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
                                onClick={form.handleSubmit(onLogin)}
                                disabled={isLoading}
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

const RegistrationModal = ({
    isLoading,
    onRegistration,
}: {
    isLoading: boolean;
    onRegistration: ({
        email,
        password,
        username,
    }: z.infer<typeof RegistrationSchema>) => void;
}) => {
    const form = useForm<z.infer<typeof RegistrationSchema>>({
        resolver: zodResolver(RegistrationSchema),
        defaultValues: {
            email: "",
            password: "",
            username: "",
        },
    });

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
                                <FormLabel>Имя пользователя</FormLabel>
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
                                    <Input
                                        type="password"
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
                                disabled={isLoading}
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
