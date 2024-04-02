import { Code2Icon } from "lucide-react";
import { memo } from "react";

import {
    SectionMenuWrapper,
    SectionMenuItem,
    SectionMenuItemText,
    SectionMenuItemTitle,
    SectionMenuItemDescription,
} from "@/shared/ui/custom/section-menu";
import { Checkbox } from "@/shared/ui/checkbox";

interface CardCategoryProps {
    className?: string;
    name: string;
    description?: string;

    isSelected?: boolean;
    onSelect: () => void;
}

export const CardCategory = memo(
    ({
        className,
        name,
        description,
        isSelected,
        onSelect,
    }: CardCategoryProps) => {
        return (
            <SectionMenuWrapper className={className}>
                <SectionMenuItem to={""}>
                    <Code2Icon />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>{name}</SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            {description}
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                    <Checkbox
                        className="ml-auto"
                        checked={isSelected}
                        onChange={onSelect}
                    />
                </SectionMenuItem>
            </SectionMenuWrapper>
        );
    },
);
