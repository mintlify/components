import { ReactElement } from "react";

export function CodeTabBar({
  filename,
  accentColor,
  children,
}: {
  filename: string;
  accentColor?: string;
  children?: ReactElement;
}) {
  return (
    <div className="flex text-slate-400 text-xs leading-6">
      <div
        className="flex-none border-t border-b border-t-transparent px-4 py-1 flex items-center"
        style={{ color: accentColor, borderBottomColor: accentColor }}
      >
        {filename}
      </div>
      <div className="flex-auto flex items-center bg-slate-700/50 border border-slate-500/30 rounded-t">
        {children && (
          <div className="flex-auto flex items-center justify-end px-4 space-x-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
