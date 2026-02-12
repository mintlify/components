/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: TODO */
import type { CSSProperties } from "react";

import { MINTLIFY_ICONS_CDN_URL } from "@/constants";
import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import {
  getIconUrl,
  ICON_TYPES,
  type IconLibrary,
  type IconType,
  isBrandsIcon,
  type PageType,
} from "@/utils/icon-utils";
import { isAbsoluteUrl } from "@/utils/is-absolute-url";

type IconProps = {
  icon: string;
  iconType?: IconType;
  className?: string;
  color?: string;
  colorLight?: string;
  colorDark?: string;
  overrideColor?: boolean;
  size?: number;
  overrideSize?: boolean;
  iconLibrary?: IconLibrary;
  basePath?: string;
  pageType?: PageType;
};

const Icon = ({
  icon,
  iconType,
  color,
  colorLight,
  colorDark,
  size,
  className,
  iconLibrary = "fontawesome",
  basePath,
  pageType,
  overrideColor,
  overrideSize,
}: IconProps) => {
  const style: CSSProperties = {
    ...(!overrideSize && { width: size || 16, height: size || 16 }),
    display: "inline-block",
    verticalAlign: "middle",
  };

  const hasLightDarkColors = colorLight && colorDark;
  const styleWithColors: CSSProperties = hasLightDarkColors
    ? ({
        ...style,
        "--color-light": colorLight,
        "--color-dark": colorDark,
      } as CSSProperties)
    : style;

  const classNames = cn(
    Classes.Icon,
    "inline",
    !(color || hasLightDarkColors || overrideColor) &&
      "bg-primary dark:bg-primary-light",
    hasLightDarkColors && "bg-(--color-light) dark:bg-(--color-dark)",
    className
  );
  const isPdf = pageType === "pdf";
  const url = getIconUrl(icon.toLowerCase(), iconType, iconLibrary);

  if (iconType && !ICON_TYPES.includes(iconType)) {
    console.log(
      `Invalid iconType ${iconType} expected a string equal to one of: brands, duotone, light, regular, sharp-solid, solid, thin`
    );
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
      return (
        <svg
          className={classNames}
          data-component-part="icon-svg"
          style={{
            WebkitMaskImage: `url(${icon})`,
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskImage: `url(${icon})`,
            maskRepeat: "no-repeat",
            maskPosition: "center",
            maskSize: "100%",
            ...(!hasLightDarkColors && { backgroundColor: "currentColor" }),
            ...styleWithColors,
          }}
        />
      );
    }

    let iconUrl = icon;
    if (icon.startsWith("/") && basePath) {
      iconUrl = `${basePath}${icon}`;
    }

    // because s3 urls are missing CORS headers, we will default it to an img tag
    return (
      // biome-ignore lint/correctness/useImageSize: TODO
      <img
        alt={icon}
        className={cn(classNames, "bg-transparent dark:bg-transparent")}
        data-component-part="icon-image"
        src={iconUrl}
        style={styleWithColors}
      />
    );
  }

  if (isPdf) {
    return (
      // biome-ignore lint/correctness/useImageSize: TODO
      <img
        alt={icon}
        className={cn(
          classNames,
          !(color || overrideColor || hasLightDarkColors) &&
            "bg-stone-800 dark:bg-stone-100"
        )}
        data-component-part="icon-image"
        src={url}
        style={{
          backgroundColor: "transparent",
          ...styleWithColors,
        }}
      />
    );
  }

  return (
    <svg
      className={cn(
        classNames,
        !(color || overrideColor || hasLightDarkColors) &&
          "bg-stone-800 dark:bg-stone-100"
      )}
      data-component-part="icon-svg"
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize:
          iconLibrary === "lucide" && !isBrandsIcon(icon) ? "100%" : undefined,
        backgroundColor: color,
        ...styleWithColors,
      }}
    />
  );
};

export { Icon };
export type { IconProps };
