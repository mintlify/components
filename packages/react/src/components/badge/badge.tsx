import { ReactNode } from "react";
import { Icon } from "../icon";
import { IconType } from "../../types";
import { cn } from "../../utils/cn";
import "./badge.css";

export interface BadgeProps {
  children: ReactNode;
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
  shape?: "rounded" | "pill";
  size?: "xs" | "sm" | "md" | "lg";
  stroke?: boolean;
  disabled?: boolean;
  icon?: ReactNode | string;
  iconType?: IconType;
  className?: string;
}

const iconSizes: Record<"xs" | "sm" | "md" | "lg", number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 16,
};

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
