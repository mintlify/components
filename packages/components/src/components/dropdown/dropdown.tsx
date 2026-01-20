import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { DropdownMenuProps } from '@radix-ui/react-dropdown-menu';
import { CheckIcon } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/utils/cn';

const DropdownMenu = (props: DropdownMenuProps) => (
    <DropdownMenuPrimitive.Root modal={false} {...props} />
);
DropdownMenu.displayName = DropdownMenuPrimitive.Root.displayName;

const DropdownMenuTrigger = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <DropdownMenuPrimitive.Trigger
        ref={ref}
        className={cn(
            'group disabled:pointer-events-none [&>span]:line-clamp-1 rounded-lg overflow-hidden group',
            'flex items-center py-0.5 gap-1 text-sm text-gray-950/50 dark:text-white/50 group-hover:text-gray-950/70 dark:group-hover:text-white/70',
            className
        )}
        {...props}
    >
        {children}
    </DropdownMenuPrimitive.Trigger>
));
DropdownMenuTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuContent = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            ref={ref}
            sideOffset={sideOffset}
            collisionPadding={16}
            align="start"
            style={{ textRendering: 'geometricPrecision' }}
            className={cn(
                'origin-(--radix-dropdown-menu-content-transform-origin) shadow-xl dark:shadow-none shadow-gray-500/5 dark:shadow-gray-500/5 bg-background-light dark:bg-background-dark p-1 relative z-50 max-h-96 max-w-(--radix-dropdown-menu-content-available-width) min-w-(--radix-dropdown-menu-trigger-width) overflow-y-auto rounded-2xl border-standard text-gray-950/70 dark:text-white/70',
                'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const DropdownMenuItem = React.forwardRef<
    React.ElementRef<typeof DropdownMenuPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & { isSelected?: boolean }
>(({ className, isSelected, ...props }, ref) => (
    <DropdownMenuPrimitive.Item
        ref={ref}
        style={{ fontWeight: 'normal !important' }}
        className={cn(
            'flex items-center justify-between px-2 py-1 gap-2 text-sm rounded-md group hover:bg-background-dark/3 dark:hover:bg-background-light/[0.03] focus:bg-background-dark/5 dark:focus:bg-background-light/5 relative w-full cursor-pointer select-none outline-0 focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50',
            isSelected
                ? 'text-primary dark:text-primary-light font-medium'
                : 'text-gray-950/50 dark:text-white/50 hover:text-gray-950/75 dark:hover:text-white/75 focus:text-gray-950/75 dark:focus:text-white/75',
            className
        )}
        {...props}
    >
        {props.children}
        <CheckIcon
            className={cn(
                'size-3.5 text-primary dark:text-primary-light shrink-0',
                !isSelected && 'opacity-0'
            )}
            strokeWidth={2.5}
        />
    </DropdownMenuPrimitive.Item>
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

export {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuPortal,
    DropdownMenuTrigger,
};
