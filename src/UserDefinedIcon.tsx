import { ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export function UserDefinedIcon({
  icon,
}: {
  icon: ReactNode | IconDefinition;
}) {
  // Icon itself is an array with svg definition
  if (Array.isArray((icon as IconDefinition)?.icon)) {
    return (
      <FontAwesomeIcon
        icon={icon as unknown as IconDefinition}
        className="h-4 w-4 text-slate-800 dark:text-slate-100"
      />
    );
  } else if (icon) {
    return (
      <div className="h-4 w-4 fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100">
        {icon as ReactNode}
      </div>
    );
  }
  return null;
}
