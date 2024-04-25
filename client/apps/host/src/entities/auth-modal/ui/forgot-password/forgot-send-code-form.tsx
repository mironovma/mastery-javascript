import { z } from "zod";
import { useForm } from "react-hook-form";
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
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

import { ForgotPasswordSchema } from "../../model/schema";

export const ForgotSendCodeForm = ({ onAuth }: { onAuth: () => void }) => {
    const { auth } = useMobxStore();

    const onSendCode = (values: z.infer<typeof ForgotPasswordSchema>) => {
        auth.forgotPasswordSendCode(values.email);
    };

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    return (
        <>
            <DialogHeader>
                <DialogTitle>Восстановление пароля</DialogTitle>
                <DialogDescription>
                    Для восстановления пароля введите свою почту
                </DialogDescription>
            </DialogHeader>

            {/* Зачем key для формы? react hook form оптимизирует работу с формами,
            чтобы избежать лишних рендеров. Если ключ не указывать в этой форме, то
            values из предыдущей формы будут попадать далее в следующие. Если укажем key, то
            форма будет рендериться заново. */}
            <Form key="idle" {...form}>
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

                    <DialogDescription className="flex gap-1 -mt-2">
                        Уже есть аккаунт?{" "}
                        <Button
                            variant="link"
                            className="p-0 m-0 h-auto justify-start"
                            onClick={(e) => {
                                e.preventDefault();
                                onAuth();
                            }}
                        >
                            Авторизируйтесь!
                        </Button>
                    </DialogDescription>

                    <DialogFooter>
                        <div className="w-full flex flex-col gap-4">
                            <Button
                                className="w-full"
                                onClick={form.handleSubmit(onSendCode)}
                                disabled={auth.isLoading}
                            >
                                Отправить код
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </Form>
        </>
    );
};
