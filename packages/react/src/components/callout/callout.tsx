import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import { Icon, IconProps, IconType } from "../icon";
import { cn } from "../../utils/cn";
import Color from "color";

import "./callout.css";
import { IconProp } from "../../types/icon";

export type CalloutVariant =
  | "info"
  | "warning"
  | "success"
  | "danger"
  | "note"
  | "tip";

interface CalloutRootProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Callout variant.
   * @see {@link CalloutVariant}
   */
  variant?: CalloutVariant;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function CalloutRoot({
  children,
  variant,
  color,
  className,
  style,
  ...props
}: CalloutRootProps) {
  let customStyle: CSSProperties = {};

  if (color) {
    const baseColor = Color(color);
    const isDarkColor = baseColor.isDark();
    const lighterTextColor = baseColor.lighten(0.5);
    const darkerTextColor = baseColor.darken(0.5);

    customStyle = {
      borderColor: `${color}33`,
      backgroundColor: `${color}1a`,
      "--callout-border": isDarkColor ? `${color}66` : `${color}4d`,
      "--callout-bg": isDarkColor ? `${color}4d` : `${color}1a`,
      "--callout-text": darkerTextColor.hex(),
      "--callout-icon-color": color,
      "--dark-callout-text": lighterTextColor.hex(),
    } as CSSProperties;
  }

  return (
    <div
      data-slot="callout"
      data-variant={variant}
      className={cn(
        "mt-callout",
        variant && `mt-callout-${variant}`,
        color && "mt-callout-custom",
        className
      )}
      role="note"
      aria-label={variant ? `${variant} callout` : "callout"}
      style={{ ...customStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

interface CalloutIconProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  /**
   * Icon before content. String (icon name) or IconProps object.
   * @see {@link IconProp}
   */
  icon?: string | Omit<IconProps, "size" | "className" | "style">;
  className?: string;
}

function CalloutIcon({
  children,
  icon,
  className,
  ...props
}: CalloutIconProps) {
  const IconComponent = children ? (
    children
  ) : typeof icon === "string" ? (
    <Icon icon={icon} className="mt-callout-icon" size={16} />
  ) : icon && typeof icon === "object" && "icon" in icon ? (
    <Icon {...icon} className="mt-callout-icon" size={16} />
  ) : null;

  return (
    <div className={cn("mt-callout-icon-wrapper", className)} {...props}>
      {IconComponent}
    </div>
  );
}

interface CalloutContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function CalloutContent({
  children,
  className,
  ...props
}: CalloutContentProps) {
  return (
    <div
      data-slot="callout-content"
      className={cn("mt-callout-content", className)}
      {...props}
    >
      <div data-slot="callout-content-body" className="mt-callout-body">
        {children}
      </div>
    </div>
  );
}

interface CalloutProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Callout variant.
   * @see {@link CalloutVariant}
   */
  variant?: CalloutVariant;
  /**
   * Icon before content. String (icon name) or IconProps object.
   * @see {@link IconProp}
   */
  icon?: IconProp;
  color?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

function CalloutComponent({
  children,
  variant,
  icon,
  color,
  className,
  style,
  ...props
}: CalloutProps) {
  const variantIcon = variant ? getVariantIcon(variant) : null;

  const IconComponent =
    typeof icon === "string" ? (
      <Icon icon={icon} className="mt-callout-icon" size={16} />
    ) : icon && typeof icon === "object" && "icon" in icon ? (
      <Icon {...icon} className="mt-callout-icon" size={16} />
    ) : icon !== undefined ? (
      icon
    ) : variantIcon ? (
      <Icon
        icon={variantIcon.icon}
        className="mt-callout-icon"
        size={16}
        iconType={variantIcon.iconType}
      />
    ) : null;

  return (
    <CalloutRoot
      data-slot="callout-root"
      variant={variant}
      color={color}
      className={className}
      style={style}
      {...props}
    >
      {IconComponent && <CalloutIcon>{IconComponent}</CalloutIcon>}
      <CalloutContent>{children}</CalloutContent>
    </CalloutRoot>
  );
}

interface VariantIcon {
  icon: string;
  iconType?: IconType;
}

function getVariantIcon(variant: CalloutVariant): VariantIcon {
  const configs: Record<CalloutVariant, VariantIcon> = {
    info: {
      icon: "circle-info",
      iconType: "regular",
    },
    warning: {
      icon: "triangle-exclamation",
      iconType: "regular",
    },
    success: {
      icon: "check",
      iconType: "regular",
    },
    danger: {
      icon: "hexagon-exclamation",
      iconType: "regular",
    },
    note: {
      icon: "circle-exclamation",
      iconType: "regular",
    },
    tip: {
      icon: "lightbulb",
      iconType: "regular",
    },
  };

  return configs[variant];
}

export const Callout = Object.assign(CalloutComponent, {
  Root: CalloutRoot,
  Icon: CalloutIcon,
  Content: CalloutContent,
});

export type {
  CalloutProps,
  CalloutRootProps,
  CalloutIconProps,
  CalloutContentProps,
};
