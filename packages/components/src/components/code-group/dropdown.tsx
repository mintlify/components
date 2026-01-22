import type { DropdownMenuProps } from "@radix-ui/react-dropdown-menu";
import {
  Content as DropdownContent,
  Item as DropdownItem,
  Portal as DropdownPortal,
  Root as DropdownRoot,
  Trigger as DropdownTrigger,
} from "@radix-ui/react-dropdown-menu";
import { CheckIcon } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import { cn } from "@/utils/cn";

const DropdownMenu = (props: DropdownMenuProps) => (
  <DropdownRoot modal={false} {...props} />
);
DropdownMenu.displayName = DropdownRoot.displayName;

const DropdownMenuTrigger = forwardRef<
  ElementRef<typeof DropdownTrigger>,
  ComponentPropsWithoutRef<typeof DropdownTrigger>
>(({ className, children, ...props }, ref) => (
  <DropdownTrigger
    className={cn(
      "group group overflow-hidden rounded-lg disabled:pointer-events-none [&>span]:line-clamp-1",
      "flex items-center gap-1 py-0.5 text-gray-950/50 text-sm group-hover:text-gray-950/70 dark:text-white/50 dark:group-hover:text-white/70",
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
  </DropdownTrigger>
));
DropdownMenuTrigger.displayName = DropdownTrigger.displayName;

const DropdownMenuPortal = DropdownPortal;

const DropdownMenuContent = forwardRef<
  ElementRef<typeof DropdownContent>,
  ComponentPropsWithoutRef<typeof DropdownContent>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <DropdownPortal>
    <DropdownContent
      align="start"
      className={cn(
        "relative z-50 max-h-96 min-w-(--radix-dropdown-menu-trigger-width) max-w-(--radix-dropdown-menu-content-available-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-y-auto rounded-2xl border-standard p-1 text-gray-950/70 shadow-gray-500/5 shadow-xl dark:text-white/70 dark:shadow-gray-500/5 dark:shadow-none",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=open]:animate-in",
        className
      )}
      collisionPadding={16}
      ref={ref}
      sideOffset={sideOffset}
      style={{ textRendering: "geometricPrecision" }}
      {...props}
    />
  </DropdownPortal>
));
DropdownMenuContent.displayName = DropdownContent.displayName;

const DropdownMenuItem = forwardRef<
  ElementRef<typeof DropdownItem>,
  ComponentPropsWithoutRef<typeof DropdownItem> & {
    isSelected?: boolean;
  }
>(({ className, isSelected, ...props }, ref) => (
  <DropdownItem
    className={cn(
      "group relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2 py-1 text-sm outline-0 hover:bg-gray-950/[0.03] focus:bg-accent focus:bg-gray-950/5 focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 dark:focus:bg-white/5 dark:hover:bg-white/[0.03]",
      isSelected
        ? "font-medium text-primary dark:text-primary-light"
        : "text-gray-950/50 hover:text-gray-950/75 focus:text-gray-950/75 dark:text-white/50 dark:focus:text-white/75 dark:hover:text-white/75",
      className
    )}
    ref={ref}
    {...props}
  >
    {props.children}
    <CheckIcon
      className={cn(
        "size-3.5 shrink-0 text-primary dark:text-primary-light",
        !isSelected && "opacity-0"
      )}
      strokeWidth={2.5}
    />
  </DropdownItem>
));
DropdownMenuItem.displayName = DropdownItem.displayName;

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
};
