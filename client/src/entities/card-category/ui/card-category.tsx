import { ChangeEvent, useEffect, useState } from "react";
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
    name: string;
    description?: string;

    isChecked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CardCategory = observer(
    ({
        className,
        name,
        description,
        isChecked,
        onChange,
    }: CardCategoryProps) => {
        const [isCheckedInput, setIsCheckedInput] = useState<boolean>(false);

        useEffect(() => {
            setIsCheckedInput(isChecked);
        }, [isChecked]);

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
                    <input
                        type="checkbox"
                        className="ml-auto"
                        checked={isCheckedInput}
                        onChange={onChange}
                    />
                </SectionMenuItem>
            </SectionMenuWrapper>
        );
    },
);
