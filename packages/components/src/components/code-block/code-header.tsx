import type { ReactNode } from "react";

import { Icon as ComponentIcon } from "@/components/icon";
import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import type { CodeBlockTheme } from "@/validation";

type CodeHeaderProps = {
  filename?: string;
  icon?: string;
  codeBlockTheme?: CodeBlockTheme;
  children?: ReactNode;
};

const CodeHeader = ({
  filename,
  icon,
  codeBlockTheme = "system",
  children,
}: CodeHeaderProps) => {
  return (
    <div
      className="flex rounded-t-[14px] py-1 pr-2.5 pl-4 font-medium text-gray-400 text-xs leading-6"
      data-component-part="code-block-header"
    >
      <div
        className={cn(
          "flex flex-none items-center gap-1.5 text-gray-700 dark:text-gray-300",
          codeBlockTheme === "dark" && "text-gray-300"
        )}
        data-component-part="code-block-header-filename"
      >
        {icon && (
          <ComponentIcon
            className={cn(
              "size-3.5 bg-gray-500 dark:bg-gray-400",
              Classes.CodeBlockIcon
            )}
            icon={icon}
            iconType="regular"
            overrideColor
          />
        )}
        {filename}
      </div>
      <div className="flex flex-1 items-center justify-end gap-1.5">
        {children}
      </div>
    </div>
  );
};

export { type CodeHeaderProps, CodeHeader };
