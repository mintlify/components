import { type CSSProperties, type ReactNode, useId, useState } from "react";
import { Classes } from "@/constants/selectors";
import { Folder2Icon, Folder2OpenIcon } from "@/icons";
import { cn } from "@/utils/cn";

import { TreeLevelProvider } from "./context";
import { useTreeLevel } from "./use-tree-level";
import { calculatePaddingLeft } from "./utils";

type TreeFolderProps = {
  name: string;
  defaultOpen?: boolean;
  children?: ReactNode;
  openable?: boolean;
};

const TreeFolder = ({
  name,
  defaultOpen = false,
  children,
  openable: _openable = true,
}: TreeFolderProps) => {
  const uniqueId = useId();
  const nodeId = `tree-folder-${uniqueId}`;
  const groupId = `tree-group-${uniqueId}`;

  const openable = _openable && !!children;

  const { level } = useTreeLevel();
  const [open, setOpen] = useState(openable && defaultOpen);

  const FolderIcon = openable && open ? Folder2OpenIcon : Folder2Icon;

  return (
    <div
      data-component-part="tree-folder"
      role="none"
      style={{ "--padding-left": calculatePaddingLeft(level) } as CSSProperties}
    >
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
      <div
        aria-expanded={openable ? open : undefined}
        aria-level={level}
        aria-owns={openable && open ? groupId : undefined}
        aria-selected={false}
        className={cn(
          "flex items-center gap-1.5 rounded-lg py-1 pr-1.5 pl-[calc(var(--padding-left)*1px)] text-stone-700 -outline-offset-1 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-900",
          openable ? "cursor-pointer" : "cursor-default",
          Classes.TreeFolder
        )}
        id={nodeId}
        onClick={openable ? () => setOpen((prev) => !prev) : undefined}
        role="treeitem"
        tabIndex={-1}
      >
        <FolderIcon
          aria-hidden="true"
          className="size-4 shrink-0 select-none"
          data-component-part={
            openable && open
              ? "tree-folder-icon-open"
              : "tree-folder-icon-closed"
          }
        />
        <span
          className="truncate font-medium text-sm leading-5 -tracking-[0.1px]"
          data-component-part="tree-folder-title"
          title={name}
        >
          {name}
        </span>
      </div>
      {openable && open && (
        // biome-ignore lint/a11y/useSemanticElements: TODO
        <div
          className="relative"
          data-component-part="tree-folder-children-wrapper"
          id={groupId}
          role="group"
        >
          <div
            aria-hidden="true"
            className="absolute left-[calc((var(--padding-left)+8)*1px)] z-10 h-full w-px select-none bg-stone-200 dark:bg-stone-800"
            data-component-part="tree-folder-children-line"
          />
          <TreeLevelProvider level={level + 1} parentId={nodeId}>
            {children}
          </TreeLevelProvider>
        </div>
      )}
    </div>
  );
};

export { TreeFolder };
export type { TreeFolderProps };
