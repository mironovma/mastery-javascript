/* eslint-disable react/prop-types */
import React from "react";

import { cn } from "@/shared/lib/utils";
import { Link } from "react-router-dom";

const SectionMenuHeader = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "mb-2 text-muted-foreground text-xs font-semibold",
            className,
        )}
        {...props}
    />
));
SectionMenuHeader.displayName = "SectionMenuHeader";

const SectionMenuWrapper = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));
SectionMenuWrapper.displayName = "SectionMenuWrapper";

const SectionMenuItem = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { to: string }
>(({ to, className, ...props }, ref) => (
    <div className="w-full dark:bg-primary-foreground/50 bg-primary/5 cursor-pointer rounded-none first:rounded-t-lg last:rounded-b-lg">
        <Link to={to}>
            <div
                ref={ref}
                className={cn("flex items-center gap-x-4 px-4 py-3", className)}
                {...props}
            />
        </Link>
    </div>
));
SectionMenuItem.displayName = "SectionMenuItem";

const SectionMenuItemText = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));
SectionMenuItemText.displayName = "SectionMenuItemText";

const SectionMenuItemTitle = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
));
SectionMenuItemTitle.displayName = "SectionMenuItemTitle";

const SectionMenuItemDescription = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("text-muted-foreground text-xs font-semibold", className)}
        {...props}
    />
));
SectionMenuItemDescription.displayName = "SectionMenuItemDescription";

export {
    SectionMenuWrapper,
    SectionMenuHeader,
    SectionMenuItem,
    SectionMenuItemText,
    SectionMenuItemTitle,
    SectionMenuItemDescription,
};
