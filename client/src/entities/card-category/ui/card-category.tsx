import { ChangeEvent } from "react";
import { observer } from "mobx-react-lite";
import { Code2Icon } from "lucide-react";

import {
    SectionMenuWrapper,
    SectionMenuItem,
    SectionMenuItemText,
    SectionMenuItemTitle,
    SectionMenuItemDescription,
} from "@/shared/ui/custom/section-menu";

interface CardCategoryProps {
    className?: string;
    category: {
        id: string;
        name: string;
        description?: string;
    };
    isChecked: boolean;
    onChange: (id: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * TODO: переименовать в CardCategoryItem
 */

export const CardCategory = observer(
    ({ className, category, isChecked, onChange }: CardCategoryProps) => {
        return (
            <SectionMenuWrapper className={className}>
                <SectionMenuItem>
                    <Code2Icon />
                    <SectionMenuItemText>
                        <SectionMenuItemTitle>
                            {category.name}
                        </SectionMenuItemTitle>
                        <SectionMenuItemDescription>
                            {category.description}
                        </SectionMenuItemDescription>
                    </SectionMenuItemText>
                    <input
                        type="checkbox"
                        className="ml-auto w-5 h-5 checked:accent-sky-700"
                        checked={isChecked}
                        onChange={onChange(category.id)}
                    />
                </SectionMenuItem>
            </SectionMenuWrapper>
        );
    },
);
