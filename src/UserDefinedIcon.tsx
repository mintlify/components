import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import clsx from "clsx";

// The possible sizes are included in the safelist property of tailwind config
// to get around just-in-time compiling not detecting it.
export function UserDefinedIcon({
  icon,
  size = 4,
  color,
}: {
  icon: React.ReactNode | IconDefinition;
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 12;
  color?: string;
}) {
  if (icon === null || icon === undefined) {
    return null;
  }

  // Icon itself is an array with svg definition
  if (Array.isArray((icon as IconDefinition)?.icon)) {
    return (
      <FontAwesomeIcon
        icon={icon as unknown as IconDefinition}
        className={clsx(
          `h-${size}`,
          !color && "text-slate-800 dark:text-slate-100"
        )}
        color={color}
      />
    );
  }

  // There are likely aspect ratio issues with the way heights and widths are set here.
  // We could explore Tailwind's aspect ratio add-on later.
  return (
    <div
      className={clsx(
        `h-${size} w-${size}`,
        !color &&
          "fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100"
      )}
      style={color ? { fill: color } : undefined}
    >
      {icon as React.ReactNode}
    </div>
  );
}
