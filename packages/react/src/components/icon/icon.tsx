import { CSSProperties, SVGAttributes, ImgHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { isAbsoluteUrl } from "../../utils/isAbsoluteUrl";
import { MINTLIFY_ICONS_CDN_URL } from "../../constants";
import { FONT_AWESOME_BRANDS } from "../../constants/font-awesome-brands";
import { IS_DEV } from "../../constants/env";

export function Icon({
  icon,
  iconType,
  iconLibrary,
  color,
  size,
  className,
  style,
  ...props
}: IconProps) {
  if (iconType && !iconTypes.includes(iconType)) {
    if (IS_DEV) {
      console.warn(
        `Invalid iconType ${iconType} expected a string equal to one of: ${iconTypes.join(
          ", "
        )}`
      );
    }
    return null;
  }

  if (
    typeof icon === "string" &&
    (isAbsoluteUrl(icon) || icon.startsWith("/"))
  ) {
    if (
      icon.startsWith(MINTLIFY_ICONS_CDN_URL) ||
      icon.startsWith("https://mintlify.b-cdn.net")
    ) {
      const svgProps = props as SVGAttributes<SVGSVGElement>;
      return (
        <svg
          className={cn("mt-icon", className)}
          style={{
            WebkitMaskImage: `url(${icon})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${icon})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "100%",
            backgroundColor: "currentColor",
            width: size,
            height: size,
            ...style,
          }}
          {...svgProps}
        />
      );
    }

    const imgProps = props as ImgHTMLAttributes<HTMLImageElement>;
    return (
      <img
        src={icon}
        alt={icon}
        className={cn("mt-icon", className)}
        style={{
          width: size,
          height: size,
          ...style,
        }}
        {...imgProps}
      />
    );
  }

  const url = getIconUrl(icon.toLowerCase(), iconType, iconLibrary);
  const svgProps = props as SVGAttributes<SVGSVGElement>;

  return (
    <svg
      className={cn("mt-icon", className)}
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: iconLibrary === "lucide" ? "100%" : undefined,
        backgroundColor: color,
        width: size,
        height: size,
        ...style,
      }}
      {...svgProps}
    />
  );
}

export interface IconProps extends Omit<SVGAttributes<SVGSVGElement>, "color"> {
  /**
   * Icon name or custom URL.
   * Supports Font Awesome icons, Lucide icons, or any custom URL.
   */
  icon: string;
  /**
   * Icon style variant.
   * @default "regular"
   * @see {@link IconType}
   */
  iconType?: IconType;
  /**
   * Icon library to use.
   * @default "fontawesome"
   * @see {@link IconLibrary}
   */
  iconLibrary?: IconLibrary;
  /**
   * Icon color.
   * @default "currentColor"
   */
  color?: string;
  /**
   * Icon size in pixels.
   * @default 16
   */
  size?: number;
  className?: string;
  style?: CSSProperties;
}

function isBrandsIcon(icon?: string): boolean {
  if (!icon) return false;
  return FONT_AWESOME_BRANDS.includes(icon.toLowerCase());
}

export function getIconUrl(
  icon: string,
  iconType?: IconType,
  iconLibrary?: IconLibrary
) {
  if (isBrandsIcon(icon)) {
    return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/brands/${icon}.svg`;
  }
  if (iconLibrary === "lucide") {
    return `${MINTLIFY_ICONS_CDN_URL}/lucide/v0.545.0/${icon}.svg`;
  }
  const type = iconType ?? "regular";
  return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/${type}/${icon}.svg`;
}

export const iconLibraries = ["fontawesome", "lucide"] as const;
export type IconLibrary = "fontawesome" | "lucide";

export const iconTypes: readonly IconType[] = [
  "brands",
  "duotone",
  "light",
  "regular",
  "sharp-duotone-solid",
  "sharp-light",
  "sharp-regular",
  "sharp-solid",
  "sharp-thin",
  "solid",
  "thin",
] as const;

// storybook can't pick up iconTypes as const, so we need to define it here
export type IconType =
  | "brands"
  | "duotone"
  | "light"
  | "regular"
  | "sharp-duotone-solid"
  | "sharp-light"
  | "sharp-regular"
  | "sharp-solid"
  | "sharp-thin"
  | "solid"
  | "thin";
