import { memo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeftIcon, MenuIcon } from "lucide-react";

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
import { Button } from "@/shared/ui/button";

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();

    const location = useLocation();
    const navigate = useNavigate();

    const isMainPage =
        location.pathname === "/" || location.pathname === "/app";

    return (
        <menu
            className={cn(
                "w-full h-14 px-3 bg-sky-700 dark:bg-slate-900 flex items-center sticky",
                className,
            )}
        >
            <div className="flex-1 flex justify-start">
                {isMainPage ? (
                    <NavbarBurger />
                ) : (
                    <Button
                        variant="ghost"
                        className="p-0"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeftIcon className="cursor-pointer">
                            back
                        </ArrowLeftIcon>
                    </Button>
                )}
            </div>

            <div className="flex-1 flex justify-center">
                <div>
                    <span className="dark:text-sky-700 text-white">
                        {t("APP_NAME").slice(0, 2)}
                    </span>
                    <span>{t("APP_NAME").slice(2)}</span>
                </div>
            </div>
            <div className="flex-1 flex justify-end items-center gap-3">
                <AuthUser />
                <ThemeSwitcher />
            </div>
        </menu>
    );
});

const NavbarBurger = () => {
    const { t } = useTranslation();

    return (
        <Sheet>
            <SheetTrigger>
                <MenuIcon className="text-white" />
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>
                        <div>
                            <span className="text-sky-700">
                                {t("APP_NAME").slice(0, 2)}
                            </span>
                            <span>{t("APP_NAME").slice(2)}</span>
                        </div>
                    </SheetTitle>
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
                                <Link to="/app">{t("Приложение")}</Link>
                            </SheetClose>
                        </li>
                    </ul>
                </div>
                <SheetFooter className="absolute bottom-6">
                    <LangSwither />
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};
