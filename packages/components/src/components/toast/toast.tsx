import { cn } from "cn";
import { type ReactNode, useState } from "react";
import { Classes } from "@/constants/selectors";
import {
  CheckIcon,
  DangerIcon,
  InfoIcon,
  NoteIcon,
  TipIcon,
  WarningFilledIcon,
  XIcon,
} from "@/icons";

type ToastVariant = "info" | "warning" | "note" | "tip" | "check" | "danger";

type ToastAction = {
  label: string;
  onClick: () => void;
};

type ToastProps = {
  children: ReactNode;
  variant?: ToastVariant;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss?: () => void;
  dismissLabel?: string;
  className?: string;
};

const variantConfig = {
  info: {
    icon: InfoIcon,
    className: "bg-stone-600/20",
    iconClassName: "text-stone-700 dark:text-stone-300",
  },
  warning: {
    icon: WarningFilledIcon,
    className: "bg-orange-600/20",
    iconClassName: "text-orange-700 dark:text-orange-300",
  },
  note: {
    icon: NoteIcon,
    className: "bg-blue-600/20",
    iconClassName: "text-blue-700 dark:text-blue-300",
  },
  tip: {
    icon: TipIcon,
    className: "bg-green-600/20",
    iconClassName: "text-green-700 dark:text-green-300",
  },
  check: {
    icon: CheckIcon,
    className: "bg-green-600/20",
    iconClassName: "text-green-700 dark:text-green-300",
  },
  danger: {
    icon: DangerIcon,
    className: "bg-red-600/20",
    iconClassName: "text-red-700 dark:text-red-300",
  },
};

const FOCUS_RING_CLASSNAME =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light";

const LineCenter = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div className={cn("flex h-[1lh] shrink-0 items-center", className)}>
    {children}
  </div>
);

const Toast = ({
  children,
  variant = "info",
  action,
  dismissible = true,
  onDismiss,
  dismissLabel = "Dismiss",
  className,
}: ToastProps) => {
  const [open, setOpen] = useState(true);

  if (!open) {
    return null;
  }

  const config = variantConfig[variant];
  const IconComponent = config.icon;

  return (
    <div
      className={cn(
        Classes.Toast,
        "flex items-start gap-2 rounded-xl py-2 pr-2 pl-2.5 font-medium text-base text-stone-900 leading-5 dark:text-stone-200",
        config.className,
        className
      )}
      data-toast-type={variant}
      role={variant === "warning" || variant === "danger" ? "alert" : "status"}
    >
      <LineCenter className="my-0.5">
        <IconComponent
          aria-hidden="true"
          className={cn("size-4", config.iconClassName)}
          data-component-part="toast-icon"
        />
      </LineCenter>
      <div className="flex min-w-0 flex-1 flex-wrap items-start justify-end gap-x-2 gap-y-1">
        <div
          className="overflow-wrap-anywhere min-w-0 flex-[1_1_18rem] py-0.5"
          data-component-part="toast-content"
        >
          {children}
        </div>
        {(action || dismissible) && (
          <LineCenter className="my-0.5 gap-1.5">
            {action && (
              <button
                className={cn(
                  "inline-flex h-6 items-center rounded-lg bg-white px-2 text-sm text-stone-900 leading-none transition-colors hover:bg-white/70 dark:bg-white/10 dark:text-stone-100 dark:hover:bg-white/20",
                  FOCUS_RING_CLASSNAME
                )}
                data-component-part="toast-action"
                onClick={() => {
                  setOpen(false);
                  action.onClick();
                }}
                type="button"
              >
                {action.label}
              </button>
            )}
            {dismissible && (
              <button
                aria-label={dismissLabel}
                className={cn(
                  "flex size-6 items-center justify-center rounded-lg text-stone-500 transition-colors hover:bg-stone-950/5 hover:text-stone-700 dark:text-stone-400 dark:hover:bg-white/10 dark:hover:text-stone-200",
                  FOCUS_RING_CLASSNAME
                )}
                data-component-part="toast-dismiss"
                onClick={() => {
                  setOpen(false);
                  onDismiss?.();
                }}
                type="button"
              >
                <XIcon />
              </button>
            )}
          </LineCenter>
        )}
      </div>
    </div>
  );
};

export { Toast };
export type { ToastAction, ToastProps, ToastVariant };
