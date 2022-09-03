import clsx from "clsx";

export type ParamProps = {
  name: string;
  children: any;
  default?: string;
  type?: string;
  required?: boolean;
  hidden?: boolean;
  placeholder?: any;
  last?: boolean;
};

export function Param({
  name,
  children,
  default: defaultValue,
  type,
  required = false,
  hidden = false,
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
          <span className="px-1 py-px rounded-md font-medium bg-slate-50 text-primary dark:bg-slate-800 dark:text-primary-light border border-slate-200 dark:border-slate-700">
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
