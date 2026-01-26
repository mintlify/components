import type React from "react";
import { cn } from "@/utils/cn";

type InfoPillProps = {
  children: React.ReactNode;
  prefix?: string;
  className?: string;
};

const InfoPill = ({ children, prefix, className }: InfoPillProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-1 break-all rounded-md bg-stone-100/50 px-2 py-0.5 font-medium text-stone-600 dark:bg-white/5 dark:text-stone-200",
        className
      )}
      data-component-part="field-info-pill"
    >
      {prefix && (
        <span className="text-stone-400 dark:text-stone-500">{prefix}</span>
      )}
      <span>{children}</span>
    </div>
  );
};

const RequiredPill = ({ label }: { label?: string }) => {
  if (!label) {
    return null;
  }

  return (
    <div
      className="whitespace-nowrap rounded-md bg-red-100/50 px-2 py-0.5 font-medium text-red-600 dark:bg-red-400/10 dark:text-red-300"
      data-component-part="field-required-pill"
    >
      {label}
    </div>
  );
};

const DeprecatedPill = ({ label }: { label?: string }) => {
  if (!label) {
    return null;
  }

  return (
    <div
      className="whitespace-nowrap rounded-md bg-amber-100/50 px-2 py-0.5 font-medium text-amber-600 dark:bg-amber-400/10 dark:text-amber-300"
      data-component-part="field-deprecated-pill"
    >
      {label}
    </div>
  );
};

export { InfoPill, RequiredPill, DeprecatedPill };
