import type { CSSProperties } from "react";
import { Classes } from "@/constants/selectors";
import { FileIcon } from "@/icons";
import { cn } from "@/utils/cn";

import { useTreeLevel } from "./use-tree-level";
import { calculatePaddingLeft } from "./utils";

type TreeFileProps = {
  name: string;
};

const TreeFile = ({ name }: TreeFileProps) => {
  const { level } = useTreeLevel();

  return (
    <div
      aria-level={level}
      aria-selected={false}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-lg py-1 pr-1.5 pl-[calc(var(--padding-left)*1px)] text-stone-700 -outline-offset-1 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-900",
        Classes.TreeFile
      )}
      data-component-part="tree-file"
      role="treeitem"
      style={{ "--padding-left": calculatePaddingLeft(level) } as CSSProperties}
      tabIndex={-1}
    >
      <FileIcon
        aria-hidden="true"
        className="size-4 shrink-0 select-none"
        data-component-part="tree-file-icon"
      />
      <span
        className="truncate font-medium text-sm leading-5 -tracking-[0.1px]"
        data-component-part="tree-file-title"
        title={name}
      >
        {name}
      </span>
    </div>
  );
};

export { TreeFile };
export type { TreeFileProps };
