import { CSSProperties } from "react";
import { BaseIcon, IconType, IconLibrary } from "./base-icon";
import "./icon.css";

export function Icon({
  icon,
  iconType,
  iconLibrary,
  color,
  size = 16,
  className,
  style,
}: IconProps) {
  return (
    <BaseIcon
      icon={icon}
      iconType={iconType}
      iconLibrary={iconLibrary}
      color={color}
      size={size}
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        ...style,
      }}
    />
  );
}

export interface IconProps {
  icon: string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}
