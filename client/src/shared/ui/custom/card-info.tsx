import { memo } from "react";
import { InfoIcon } from "lucide-react";

import { Card, CardContent, CardDescription } from "../card";

interface CardInfoProps {
    className?: string;
    description: string;
}

export const CardInfo = memo(({ className, description }: CardInfoProps) => {
    return (
        <Card className={className}>
            <CardContent className="p-3">
                <CardDescription className="flex items-center gap-2">
                    <InfoIcon size={24} />
                    {description}
                </CardDescription>
            </CardContent>
        </Card>
    );
});
