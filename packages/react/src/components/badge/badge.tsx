import { ReactNode } from "react";
import { Icon, IconType } from "../icon";
import { cn } from "../../utils/cn";
import "./badge.css";

export function Badge({
  children,
  color = "gray",
  shape = "rounded",
  size = "md",
  stroke = false,
  disabled = false,
  icon,
  iconType,
  className,
}: BadgeProps) {
  const IconComponent =
    typeof icon === "string" ? (
      <Icon
        icon={icon}
        iconType={iconType}
        className="mt-badge-icon"
        size={iconSizes[size]}
      />
    ) : (
      icon
    );

  return (
    <span
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
    >
      {!!IconComponent && IconComponent}
      {children}
    </span>
  );
}

export interface BadgeProps {
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
   * Optional icon before content. String (icon name) or React node.
   * see {@link Icon} for available icon sets.
   * @example
   * ```tsx
   * <Badge icon="check" iconType="lucide">Verified</Badge>
   * ```
   */
  icon?: ReactNode | string;
  /**
   * Icon set type when `icon` is a string.
   * @see {@link IconType}
   */
  iconType?: IconType;
  className?: string;
  children: ReactNode;
}

const iconSizes: Record<"xs" | "sm" | "md" | "lg", number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 16,
};
