import type React from "react";
import { Icon } from "@/components/icon";
import { cn } from "@/utils/cn";
import type { IconLibrary, IconType } from "@/utils/icon-utils";

const MENTION_COLORS = [
  "neutral",
  "info",
  "success",
  "warning",
  "feature",
  "error",
] as const;

type MentionColor = (typeof MENTION_COLORS)[number];

const colorVariants: Record<MentionColor, string> = {
  neutral:
    "[--mention-bg:#F5F5F4] dark:[--mention-bg:#292524] [--mention-text:#57534E] dark:[--mention-text:#A8A29E]",
  info: "[--mention-bg:#EFF6FF] dark:[--mention-bg:#172554] [--mention-text:#1D4ED8] dark:[--mention-text:#93C5FD]",
  success:
    "[--mention-bg:#F0FDF4] dark:[--mention-bg:#052E16] [--mention-text:#15803D] dark:[--mention-text:#86EFAC]",
  warning:
    "[--mention-bg:#FFF7ED] dark:[--mention-bg:#431407] [--mention-text:#C2410C] dark:[--mention-text:#FDBA74]",
  feature:
    "[--mention-bg:#FAF5FF] dark:[--mention-bg:#3B0764] [--mention-text:#7E22CE] dark:[--mention-text:#D8B4FE]",
  error:
    "[--mention-bg:#FEF2F2] dark:[--mention-bg:#450A0A] [--mention-text:#B91C1C] dark:[--mention-text:#FCA5A5]",
};

type MentionProps = {
  children: React.ReactNode;
  /**
   * Page path for a page mention. When provided, the component renders as an
   * anchor tag linking to the page and displays the page icon by default.
   */
  path?: string;
  /**
   * Username or identifier for a user mention. When provided, the component
   * displays the user icon by default.
   */
  user?: string;
  /**
   * Optional icon override. Accepts:
   * - A FontAwesome or Lucide icon name string (e.g. `"plane"`, `"bed"`)
   * - An image URL string, rendered as a circular avatar
   * - Any React node for fully custom icon content
   */
  icon?: React.ReactNode | string;
  /** Icon type for FontAwesome icons. */
  iconType?: IconType;
  /** Icon library to use. Defaults to `"fontawesome"`. */
  iconLibrary?: IconLibrary;
  /** Color variant. Defaults to `"neutral"`. */
  color?: MentionColor;
  className?: string;
};

const DEFAULT_PAGE_ICON = "file";
const DEFAULT_USER_ICON = "circle-user";

const isUrl = (s: string) =>
  s.startsWith("http://") ||
  s.startsWith("https://") ||
  s.startsWith("/") ||
  s.startsWith("data:");

const ICON_NAME_REGEX = /^[\w-]+$/;
const isIconName = (s: string) => ICON_NAME_REGEX.test(s);

const Mention = ({
  children,
  path,
  user,
  icon,
  iconType,
  iconLibrary = "fontawesome",
  color = "neutral",
  className,
}: MentionProps) => {
  const isUser = !!user;
  const defaultIconName = isUser ? DEFAULT_USER_ICON : DEFAULT_PAGE_ICON;
  // null → explicitly hide the icon. "" → treat as omitted, fall back to default.
  const hideIcon = icon === null;
  const resolvedIcon = hideIcon
    ? null
    : ((icon === "" ? undefined : icon) ?? defaultIconName);

  const renderIcon = () => {
    if (resolvedIcon === null) {
      return null;
    }

    if (typeof resolvedIcon !== "string") {
      return (
        <span aria-hidden="true" className="flex shrink-0 items-center">
          {resolvedIcon}
        </span>
      );
    }

    if (isUrl(resolvedIcon)) {
      return (
        <img
          alt=""
          aria-hidden="true"
          className="size-3 shrink-0 rounded-full object-cover"
          height={12}
          src={resolvedIcon}
          width={12}
        />
      );
    }

    if (isIconName(resolvedIcon)) {
      return (
        <Icon
          className="shrink-0"
          icon={resolvedIcon}
          iconLibrary={iconLibrary}
          iconType={iconType}
          overrideColor
          overrideSize
        />
      );
    }

    // Emoji or other non-icon text
    return (
      <span aria-hidden="true" className="shrink-0 text-[0.8em] leading-none">
        {resolvedIcon}
      </span>
    );
  };

  const isLink = !!path && !user;

  // When an icon is present the left padding is tightened to match the vertical
  // gap so the icon appears equally inset on all three sides (left, top, bottom).
  // The right padding stays wider to give the label text room to breathe.
  // When there is no icon both sides use the wider right padding value.
  const sharedClassName = cn(
    "mention",
    "inline-flex items-center gap-1 rounded-md py-0.5",
    // Icon present: tight left padding so the icon is equally inset on all
    // three sides (matches the 4px vertical gap). Right side stays wider.
    // No icon: symmetric padding matching the right-side value.
    resolvedIcon !== null ? "pr-2 pl-1" : "px-2",
    "font-medium text-xs",
    "bg-(--mention-bg) text-(--mention-text)",
    '[&_[data-component-part="icon-svg"]]:bg-(--mention-text)',
    '[&_[data-component-part="icon-svg"]]:size-3',
    colorVariants[color],
    isLink && "cursor-pointer no-underline transition-opacity hover:opacity-80",
    className
  );

  if (isLink) {
    return (
      <a className={sharedClassName} href={path}>
        {renderIcon()}
        {children}
      </a>
    );
  }

  return (
    <span className={sharedClassName}>
      {renderIcon()}
      {children}
    </span>
  );
};

export { Mention, MENTION_COLORS, colorVariants as mentionColorVariants };
export type { MentionProps, MentionColor };
