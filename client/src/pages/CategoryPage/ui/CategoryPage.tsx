import { Separator } from "@radix-ui/react-separator";
import { Fragment, memo } from "react";

import { cn } from "@/shared/lib/utils";
import defaultImage from "@/shared/assets/img/code.png";
import { SectionHeader } from "@/shared/ui/custom/section-header";

const items = [
    {
        header: "JavaScript",
        amount: 32,
        Icon: "image",
        iconColor: "",
        to: "",
        imgLink: null,
    },
];

const CategoryPage = memo(() => {
    return (
        <div>
            <SectionHeader>Выберите категории для изучения</SectionHeader>

            <ul className="m-0 p-0">
                {items.map((item) => (
                    <Fragment key={item.header}>
                        <li
                            className={cn(
                                "px-3 py-4 flex items-center justify-between cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition",
                            )}
                        >
                            <div className="flex items-center gap-2">
                                {item.Icon && (
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-600">
                                        <img
                                            src={item.imgLink ?? defaultImage}
                                            alt={item.header}
                                        />
                                    </div>
                                )}
                                <div>
                                    <h3>{item.header}</h3>
                                    <p className="text-muted-foreground text-sm">
                                        {`${item.amount} карточки`}
                                    </p>
                                </div>
                            </div>
                            <div>{/* <Checkbox /> */}чекбокс</div>
                        </li>
                        <Separator className="h-1" />
                    </Fragment>
                ))}
            </ul>
        </div>
    );
});

export default CategoryPage;
