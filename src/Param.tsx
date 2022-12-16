import clsx from "clsx";

// required and optional should be merged into a single prop that allows arbitrary text
export type ParamProps = {
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
  optional?: boolean;
  hidden?: boolean;

  /** Custom classes for the param variable name, can be used to customize its color */
  nameClasses?: string;

  children: any;
};

export function Param(props: ParamProps) {
  return <ParamField {...props} />;
}

export function ParamField({
  name,
  type,
  defaultValue,
  required = false,
  optional = false,
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
        "pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-800"
      )}
    >
      <div className="flex font-mono text-sm">
        {name && (
          <div className="py-0.5 flex-1 space-x-2 truncate">
            <span
              className={clsx(
                "rounded-md px-1.5 py-px border border-zinc-300 dark:brightness-[1.35] dark:border-zinc-800 bg-zinc-50 dark:bg-background-dark font-medium",
                nameClasses,
                (nameClasses && !nameClasses.includes("text-")) || !nameClasses
                  ? "dark:text-slate-200"
                  : undefined
              )}
            >
              {name}
            </span>
            {required && (
              <span className="text-slate-500 dark:text-slate-300">
                Required
              </span>
            )}
            {optional && (
              <span className="text-slate-500 dark:text-slate-300">
                Optional
              </span>
            )}
            {defaultValue && (
              <span className="text-slate-500 dark:text-slate-300">
                Default: {defaultValue}
              </span>
            )}
          </div>
        )}
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
