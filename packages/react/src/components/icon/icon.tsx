import { IconType } from "../../types";
import { cn } from "../../utils/cn";
import "./icon.css";

export interface IconProps {
  icon: string;
  iconType?: IconType;
  color?: string;
  size?: number;
  className?: string;
}

export function Icon({
  icon,
  iconType = "regular",
  color,
  size = 16,
  className,
}: IconProps) {
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
      }}
    />
  );
}
