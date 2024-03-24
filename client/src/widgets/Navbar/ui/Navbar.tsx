import { memo } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { MenuIcon } from "lucide-react";

import { AuthUser } from "@/features/user-auth";
import { LangSwither } from "@/features/lang-switcher";
import { ThemeSwitcher } from "@/features/theme-switcher";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/shared/ui/sheet";
import { cn } from "@/shared/lib/utils";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    return (
        <menu
            className={cn(
                "w-full h-14 px-3 bg-sky-700 dark:bg-slate-900 flex justify-between items-center",
                className
            )}
        >
            <Sheet>
                <SheetTrigger>
                    <MenuIcon className="text-white" />
                </SheetTrigger>

                <SheetContent side="left">
                    <SheetHeader>
                        <SheetTitle>{t("APP_NAME")}</SheetTitle>
                    </SheetHeader>
                    <div className="py-4">
                        <ul className="flex flex-col gap-2">
                            <li>
                                <SheetClose asChild>
                                    <Link to="/">{t("Главная")}</Link>
                                </SheetClose>
                            </li>
                            <li>
                                <SheetClose asChild>
                                    <Link to="/about">{t("О нас")}</Link>
                                </SheetClose>
                            </li>
                        </ul>
                    </div>
                    <SheetFooter className="absolute bottom-6">
                        <LangSwither />
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <div className="flex items-center gap-3">
                <AuthUser />
                <ThemeSwitcher />
            </div>
        </menu>
    );
});
