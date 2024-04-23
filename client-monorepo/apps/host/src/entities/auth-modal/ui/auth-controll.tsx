import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { CircleUserRoundIcon } from "lucide-react";

import { Button } from "@/shared/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";

interface AuthControllProps {
    className?: string;
    username: string;
    email: string;
    // TODO: добавить возможность грузить в ЛК пользователя фотографию
    userImage?: string;
    onLogout: () => void;
}

export const AuthControll = ({
    className,
    username,
    email,
    userImage,
    onLogout,
}: AuthControllProps) => {
    return (
        <div className={className}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        className="p-0 h-10 w-10 rounded-full flex items-center justify-center hover:bg-white/15"
                        variant="ghost"
                    >
                        {userImage ? (
                            <img src={userImage} />
                        ) : (
                            <CircleUserRoundIcon className="text-white" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel className="min-w-32">
                        <p className="px-2 py-1 text-sm text-muted-foreground text-center">
                            @{username}
                        </p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>Мой профиль</DropdownMenuItem>
                    <DropdownMenuItem onClick={onLogout}>
                        Выйти
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
