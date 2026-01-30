import { Menu } from "@base-ui/react/menu";
import { CheckIcon } from "lucide-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/utils/cn";

type DropdownMenuProps = {
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DropdownMenu = ({ children, open, onOpenChange }: DropdownMenuProps) => (
  <Menu.Root onOpenChange={onOpenChange} open={open}>
    {children}
  </Menu.Root>
);
DropdownMenu.displayName = "DropdownMenu";

type DropdownMenuTriggerProps = ComponentPropsWithoutRef<typeof Menu.Trigger>;

const DropdownMenuTrigger = ({
  className,
  children,
  ...props
}: DropdownMenuTriggerProps) => (
  <Menu.Trigger
    className={cn(
      "group group overflow-hidden rounded-lg disabled:pointer-events-none [&>span]:line-clamp-1",
      "flex items-center gap-1 py-0.5 text-sm text-stone-950/50 group-hover:text-stone-950/70 dark:text-white/50 dark:group-hover:text-white/70",
      className
    )}
    {...props}
  >
    {children}
  </Menu.Trigger>
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

type DropdownMenuContentProps = ComponentPropsWithoutRef<typeof Menu.Popup> & {
  sideOffset?: number;
  align?: "start" | "center" | "end";
};

const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  align = "start",
  ...props
}: DropdownMenuContentProps) => (
  <Menu.Portal>
    <Menu.Positioner
      align={align}
      className="z-50"
      collisionPadding={16}
      sideOffset={sideOffset}
    >
      <Menu.Popup
        className={cn(
          "relative max-h-96 min-w-(--anchor-width) overflow-y-auto rounded-2xl border-standard bg-white p-1 text-stone-950/70 shadow-stone-500/5 shadow-xl dark:bg-stone-950 dark:text-white/70 dark:shadow-none dark:shadow-stone-500/5",
          "data-[ending-style]:fade-out-0 data-[starting-style]:fade-in-0 data-[ending-style]:zoom-out-95 data-[starting-style]:zoom-in-95",
          className
        )}
        style={{ textRendering: "geometricPrecision" }}
        {...props}
      />
    </Menu.Positioner>
  </Menu.Portal>
);
DropdownMenuContent.displayName = "DropdownMenuContent";

type DropdownMenuItemProps = ComponentPropsWithoutRef<typeof Menu.Item> & {
  isSelected?: boolean;
  onSelect?: () => void;
};

const DropdownMenuItem = ({
  className,
  isSelected,
  children,
  onSelect,
  onClick,
  ...props
}: DropdownMenuItemProps) => (
  <Menu.Item
    className={cn(
      "group relative flex w-full cursor-pointer select-none items-center justify-between gap-2 rounded-md px-2 py-1 text-sm outline-0 hover:bg-stone-950/3 focus:bg-stone-950/5 data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 dark:focus:bg-white/5 dark:hover:bg-white/3",
      isSelected
        ? "font-medium text-primary dark:text-primary-light"
        : "text-stone-950/50 hover:text-stone-950/75 focus:text-stone-950/75 dark:text-white/50 dark:focus:text-white/75 dark:hover:text-white/75",
      className
    )}
    onClick={(e) => {
      onClick?.(e);
      onSelect?.();
    }}
    {...props}
  >
    {children}
    <CheckIcon
      className={cn(
        "size-3.5 shrink-0 text-primary dark:text-primary-light",
        !isSelected && "opacity-0"
      )}
      strokeWidth={2.5}
    />
  </Menu.Item>
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
};
