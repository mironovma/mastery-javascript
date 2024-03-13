import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

import { Button } from "../button";

interface CategoryButtonProps {
    href: string;
    header: string;
    description: string;
}

export const CategoryButton = ({
    href,
    header,
    description,
}: CategoryButtonProps) => {
    return (
        <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full h-auto py-4"
        >
            <Link to={href}>
                <div className="w-full flex items-center justify-between gap-2 text-left">
                    <div className="flex flex-col gap-1 flex-wrap">
                        <h3 className="text-xl">{header}</h3>
                        <p className="text-muted-foreground text-pretty">
                            {description}
                        </p>
                    </div>
                    <ChevronRightIcon size={50} />
                </div>
            </Link>
        </Button>
    );
};
