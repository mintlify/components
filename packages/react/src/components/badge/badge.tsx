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
  const badgeClasses = cn(
    "mt-badge",
    `mt-${color}`,
    `mt-${shape}`,
    `mt-${size}`,
    stroke && "mt-stroke",
    disabled && "mt-disabled",
    className
  );

  return (
    <span className={badgeClasses}>
      {icon && (
        <span className="mt-icon">
          {typeof icon === "string" ? (
            <Icon icon={icon} iconType={iconType} />
          ) : (
            icon
          )}
        </span>
      )}
      <span className="mt-content">{children}</span>
    </span>
  );
}
