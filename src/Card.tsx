import { ReactNode, useState } from "react";
import clsx from "clsx";
import isAbsoluteUrl from "is-absolute-url";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { UserDefinedIcon } from "./UserDefinedIcon";

export function Card({
  title,
  icon,
  iconColor,
  hoverHighlightColour,
  href,
  onClick,
  children,
}: {
  /** Large title above children */
  title?: string;

  /** Icon to the top-left of the title */
  icon?: ReactNode | IconDefinition;

  /** Icon color, will default to the text colour if left undefined */
  iconColor?: string;

  /** Color to highlight the border with when hovering over the card. Will not highlight if excluded */
  hoverHighlightColour?: string;

  /** Link to make the entire card clickable */
  href?: string;

  /** Function to trigger when the card is clicked */
  onClick?: any;

  children: ReactNode;
}) {
  // Highlight the card with a dynamic color
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };
  const handleMouseLeave = () => {
    setIsHover(false);
  };

  // Use an <a> tag if we are linking to things
  const Tag = href ? "a" : "div";
  const absoluteUrlAttributes =
    href && isAbsoluteUrl(href)
      ? { target: "_blank", ref: "noopener noreferrer" }
      : {};

  return (
    <Tag
      className={clsx(
        "block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden px-6 py-5 w-full",
        hoverHighlightColour && "cursor-pointer"
      )}
      style={
        hoverHighlightColour && isHover
          ? { borderColor: hoverHighlightColour }
          : undefined
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={href}
      onClick={onClick}
      {...absoluteUrlAttributes}
    >
      <UserDefinedIcon icon={icon} size={6} color={iconColor} />
      <h2
        className={clsx(
          "font-semibold text-base text-slate-800 dark:text-white",
          icon !== null && icon !== undefined && "mt-4"
        )}
      >
        {title}
      </h2>
      <span
        className={clsx(
          "mt-1 font-normal",
          title
            ? "text-slate-600 dark:text-slate-400"
            : "text-slate-700 dark:text-slate-300"
        )}
      >
        {children}
      </span>
    </Tag>
  );
}
