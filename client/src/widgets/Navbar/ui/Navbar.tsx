import { MenuIcon } from "lucide-react";

import { ThemeSwitcher } from "@/features/theme-switcher";
import { cn } from "@/shared/lib/utils";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/ui/sheet";
import { Link } from "react-router-dom";

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <menu
            className={cn(
                "w-full h-10 bg-sky-700 dark:bg-slate-900 flex justify-between items-center",
                className
            )}
        >
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="text-white" />
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>Frontend Mastery</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                        <ul className="flex flex-col gap-2">
                            <li>
                                <SheetClose asChild>
                                    <Link to="/">Главная</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link to="/account">Мой профиль</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link to="/logout">Выйти</Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </div>
                </SheetContent>
            </Sheet>

            <ThemeSwitcher />
        </menu>
    );
};
