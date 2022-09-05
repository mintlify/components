import { ReactNode, useState } from "react";
import clsx from "clsx";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { UserDefinedIcon } from "./UserDefinedIcon";

export function Card({
  title,
  icon,
  iconColor,
  hoverHighlightColour,
  children,
}: {
  title: string;
  icon?: ReactNode | IconDefinition;

  /** Icon color, will default to the text colour if left undefined */
  iconColor?: string;

  /** Color to highlight the border with when hovering over the card. Will not highlight if excluded */
  hoverHighlightColour?: string;

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

  const card = (
    <div
      className={clsx(
        "not-prose group relative my-2 ring-2 ring-transparent rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden px-6 py-5 w-full",
        hoverHighlightColour && "cursor-pointer"
      )}
      style={
        hoverHighlightColour && isHover
          ? { borderColor: hoverHighlightColour }
          : undefined
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <p className="mt-1 text-slate-600 dark:text-slate-400">{children}</p>
    </div>
  );

  return card;
}
