import clsx from "clsx";

export type ParamProps = {
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  hidden?: boolean;

  /** Custom classes for the param variable name, can be used to customize its color */
  nameClasses?: string;

  children: any;
};

export function Param({
  name,
  type,
  defaultValue,
  required = false,
  hidden = false,
  nameClasses,
  children,
}: ParamProps) {
  if (hidden) {
    return null;
  }

  return (
    <div
      className={clsx(
        "pb-3 mb-4 border-b border-slate-100 dark:border-slate-800"
      )}
    >
      <div className="flex font-mono text-sm">
        <div className="py-px flex-1 space-x-2 truncate">
          <span
            className={clsx(
              "px-1 py-px rounded-md font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700",
              nameClasses,
              (nameClasses && !nameClasses.includes("text-")) || !nameClasses
                ? "dark:text-slate-200"
                : undefined
            )}
          >
            {name}
          </span>
          {required && (
            <span className="text-slate-500 dark:text-slate-300">Required</span>
          )}
          {defaultValue && (
            <span className="text-slate-500 dark:text-slate-300">
              Default: {defaultValue}
            </span>
          )}
        </div>
        {type && (
          <div className="text-slate-600 dark:text-slate-300">{type}</div>
        )}
      </div>
      <div className="mt-2 prose-sm prose-slate dark:prose-dark">
        {children}
      </div>
    </div>
  );
}
