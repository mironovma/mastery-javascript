import { ReactNode, memo } from "react";
import { cn } from "@/shared/lib/utils";

interface SectionHeaderProps {
    className?: string;
    children: ReactNode;
}

export const SectionHeader = memo(
    ({ className, children }: SectionHeaderProps) => {
        return (
            <h2
                className={cn(
                    "my-2 text-muted-foreground text-sm font-semibold",
                    className
                )}
            >
                {children}
            </h2>
        );
    }
);
