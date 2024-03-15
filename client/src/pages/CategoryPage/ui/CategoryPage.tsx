import { Separator } from "@radix-ui/react-separator";
import { Fragment, memo } from "react";
import { Link } from "react-router-dom";

import { cn } from "@/shared/lib/utils";
import { SectionHeader } from "@/shared/ui/custom/section-header";

const items = [
    {
        header: "test",
        description: "desc",
        Icon: "image",
        iconColor: "",
        to: "",
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
                                "px-2 py-4 flex items-center gap-2 cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 transition"
                            )}
                        >
                            {item.Icon && (
                                <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-gray-100 dark:bg-gray-600">
                                    <img src="/" alt="img" />
                                </div>
                            )}
                            <div>
                                <h3>{item.header}</h3>
                                <p className="text-muted-foreground text-sm">
                                    {item.description}
                                </p>
                            </div>
                        </li>
                        <Separator className="bg-background" />
                    </Fragment>
                ))}
            </ul>
        </div>
    );
});

export default CategoryPage;
