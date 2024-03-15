import { ElementType, Fragment, ReactNode } from "react";

import { Separator } from "../separator";
import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";

interface SectionMenuItem {
    Icon?: ElementType;
    iconColor?: string;
    header: string;
    description?: string;
    to: string;
}

interface SectionMenuProps {
    className?: string;
    items: SectionMenuItem[];
}

export const SectionMenu = ({ className, items }: SectionMenuProps) => {
    return (
        <nav className={className}>
            <ul className="m-0 p-0">
                {items.map((item, index) => (
                    <Fragment key={item.header}>
                        <Link
                            to={item.to}
                            className={cn(
                                "px-2 py-4 flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition",
                                index === 0 && "rounded-t-md",
                                index === items.length - 1 && "rounded-b-md"
                            )}
                        >
                            <div className={item.iconColor}>
                                {item.Icon && <item.Icon />}
                            </div>
                            <div>
                                <h3>{item.header}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                        <Separator className="bg-background" />
                    </Fragment>
                ))}
            </ul>
        </nav>
    );
};
