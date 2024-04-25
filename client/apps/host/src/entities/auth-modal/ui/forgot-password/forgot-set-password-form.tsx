import { z } from "zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheckIcon } from "lucide-react";

import {
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/shared/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/shared/ui/form";
import { Button } from "@/shared/ui/button";
import { InputPassword } from "@/shared/ui/custom/input-password";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

import { ForgotPasswordNewPasswordSchema } from "../../model/schema";

export const ForgotSetPasswordForm = () => {
    const { auth } = useMobxStore();

    const [isNewPasswordSetted, setIsNewPasswordSetted] =
        useState<boolean>(false);

    const formNewPassword = useForm<
        z.infer<typeof ForgotPasswordNewPasswordSchema>
    >({
        resolver: zodResolver(ForgotPasswordNewPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const onSetPassword = (
        values: z.infer<typeof ForgotPasswordNewPasswordSchema>,
    ) => {
        auth.forgotPasswordSetPassword(
            auth.resetPasswordEmail,
            values.password,
        );
        setIsNewPasswordSetted(true);
    };

    useEffect(() => {
        if (isNewPasswordSetted) {
            const timeoutId = setTimeout(() => {
                window.location.href = "/";
            }, 3000);

            return () => clearTimeout(timeoutId);
        }
    }, [isNewPasswordSetted]);

    return (
        <>
            <DialogHeader>
                <DialogTitle>Восстановление пароля</DialogTitle>
                <DialogDescription>
                    Установите новый пароль для аккаунта
                </DialogDescription>
            </DialogHeader>

            <Form key="awaitingNewPassword" {...formNewPassword}>
                <form className="grid gap-4 py-4">
                    <FormField
                        control={formNewPassword.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Новый пароль</FormLabel>
                                <FormControl>
                                    <InputPassword
                                        autoFocus
                                        placeholder="******"
                                        className="col-span-3"
                                        disabled={isNewPasswordSetted}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={formNewPassword.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Подтвердите пароль</FormLabel>
                                <FormControl>
                                    <InputPassword
                                        placeholder="******"
                                        className="col-span-3"
                                        disabled={isNewPasswordSetted}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <div className="w-full flex flex-col gap-4">
                            {!isNewPasswordSetted ? (
                                <Button
                                    className="w-full"
                                    onClick={formNewPassword.handleSubmit(
                                        onSetPassword,
                                    )}
                                    disabled={auth.isLoading}
                                >
                                    Установить новый пароль
                                </Button>
                            ) : (
                                <Button
                                    className="w-full flex justify-center items-center bg-green-100 text-green-600 pointer-events-none"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <CircleCheckIcon className="size-4 mr-1" />{" "}
                                    Новый пароль установлен
                                </Button>
                            )}
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};
