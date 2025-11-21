<<<<<<< Updated upstream
import { cn } from "../../utils/cn";
=======
import { CSSProperties } from "react";
import { BaseIcon, IconType, IconLibrary } from "./base-icon";
>>>>>>> Stashed changes
import "./icon.css";

export interface IconProps {
  icon: string;
  iconType?: IconType;
  color?: string;
  size?: number;
  className?: string;
}

export type IconType =
  | "regular"
  | "solid"
  | "light"
  | "thin"
  | "sharp-solid"
  | "duotone"
  | "brands";

export function Icon({
  icon,
  iconType = "regular",
  color,
  size = 16,
  className,
}: IconProps) {
<<<<<<< Updated upstream
  const isSvg = icon.startsWith("<svg");
  const isUrl = icon.startsWith("http") || icon.startsWith("/");

  if (isSvg) {
    return (
      <span
        className={cn("mt-icon", className)}
        style={{
          color,
          width: size,
          height: size,
        }}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
    );
  }

  if (isUrl) {
    return (
      <img
        src={icon}
        alt=""
        className={cn("mt-icon", className)}
        style={{
          width: size,
          height: size,
        }}
      />
    );
  }

  return (
    <i
      className={cn("mt-icon", `fa-${iconType}`, `fa-${icon}`, className)}
      style={{
        color,
        fontSize: size,
=======
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
>>>>>>> Stashed changes
      }}
    />
  );
}
<<<<<<< Updated upstream
=======

export interface IconProps {
  icon: string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  color?: string;
  size?: number;
  className?: string;
  style?: CSSProperties;
}
>>>>>>> Stashed changes
