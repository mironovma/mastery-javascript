import { memo } from "react";

interface PageHeaderProps {
    className?: string;
    header: string;
    description?: string;
}

export const PageHeader = memo(
    ({ className, header, description }: PageHeaderProps) => {
        return (
            <div className={className}>
                <h1 className="text-3xl font-semibold text-balance">
                    {header}
                </h1>
                {description && (
                    <h2 className="mt-4 text-lg font-semibold break-words text-muted-foreground">
                        {description}
                    </h2>
                )}
            </div>
        );
    }
);
