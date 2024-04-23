import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/shared/ui/input-otp";
import { Button } from "@/shared/ui/button";
import { useMobxStore } from "@/shared/hooks/useMobxStore";

import { ForgotPasswordCodeSchema } from "../../model/schema";

export const ForgotConfirmCodeForm = () => {
    const { auth } = useMobxStore();

    const formSendCode = useForm<z.infer<typeof ForgotPasswordCodeSchema>>({
        resolver: zodResolver(ForgotPasswordCodeSchema),
        defaultValues: {
            code: "",
        },
    });

    const onAcceptCode = (values: z.infer<typeof ForgotPasswordCodeSchema>) => {
        auth.forgotPasswordConfirmCode(auth.resetPasswordEmail, values.code);
    };

    return (
        <>
            <DialogHeader>
                <DialogTitle>Восстановление пароля</DialogTitle>
                <DialogDescription>
                    Введите код подтверждения, отправленный на почту
                </DialogDescription>
            </DialogHeader>

            <Form key="codeSent" {...formSendCode}>
                <form className="grid gap-4 py-4">
                    <FormField
                        control={formSendCode.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Код</FormLabel>
                                <FormControl>
                                    <InputOTP
                                        autoFocus
                                        maxLength={6}
                                        {...field}
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0} />
                                            <InputOTPSlot index={1} />
                                            <InputOTPSlot index={2} />
                                        </InputOTPGroup>
                                        <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={3} />
                                            <InputOTPSlot index={4} />
                                            <InputOTPSlot index={5} />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <DialogFooter>
                        <div className="w-full flex flex-col gap-4">
                            <Button
                                className="w-full"
                                onClick={formSendCode.handleSubmit(
                                    onAcceptCode,
                                )}
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
