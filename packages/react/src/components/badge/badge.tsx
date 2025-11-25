import { ReactNode, HTMLAttributes } from "react";
import { Icon, IconProps } from "../icon";
import { cn } from "../../utils/cn";
import { IconProp } from "../../types/icon";

export function Badge({
  children,
  color = "gray",
  shape = "rounded",
  size = "md",
  stroke = false,
  disabled = false,
  icon,
  className,
  ...props
}: BadgeProps) {
  const IconComponent =
    typeof icon === "string" ? (
      <Icon icon={icon} className="mt-badge-icon" size={iconSizes[size]} />
    ) : icon && typeof icon === "object" && "icon" in icon ? (
      <Icon {...icon} className="mt-badge-icon" size={iconSizes[size]} />
    ) : (
      icon
    );

  return (
    <span
      data-slot="badge"
      data-shape={shape}
      data-stroke={stroke}
      data-disabled={disabled}
      data-color={color}
      data-size={size}
      aria-disabled={disabled}
      className={cn(
        "mt-badge",
        `mt-badge-${color}`,
        `mt-badge-${size}`,
        className
      )}
      {...props}
    >
      {!!IconComponent && IconComponent}
      {children}
    </span>
  );
}

export interface BadgeProps
  extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  /**
   * @default "gray"
   */
  color?:
    | "gray"
    | "blue"
    | "green"
    | "orange"
    | "red"
    | "purple"
    | "white"
    | "surface"
    | "white-destructive"
    | "surface-destructive";
  /**
   * Badge border radius shape.
   * @default "rounded"
   */
  shape?: "rounded" | "pill";
  /**
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg";
  /**
   * Whether to display a border stroke outline.
   * @default false
   */
  stroke?: boolean;
  /**
   * Whether the badge is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * Icon before content. String (icon name) or IconProps object.
   * @see {@link IconProps}
   */
  icon?: IconProp;
  className?: string;
  children: ReactNode;
}

const iconSizes: Record<"xs" | "sm" | "md" | "lg", number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 16,
};
