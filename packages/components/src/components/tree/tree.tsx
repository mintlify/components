"use client";

import {
  createContext,
  useContext,
  useMemo,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useId,
  useState,
  CSSProperties,
  ComponentProps,
} from "react";

import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";

// ============================================================================
// Icons
// ============================================================================

const FileIcon = ({
  className,
  ...props
}: ComponentProps<"svg"> & { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M15.16 6.24999H11.75C11.198 6.24999 10.75 5.80199 10.75 5.24999V1.85199"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.75 14.25V3.75C2.75 2.645 3.645 1.75 4.75 1.75H10.336C10.601 1.75 10.856 1.855 11.043 2.043L14.957 5.957C15.145 6.145 15.25 6.399 15.25 6.664V14.25C15.25 15.355 14.355 16.25 13.25 16.25H4.75C3.645 16.25 2.75 15.355 2.75 14.25Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Folder2Icon = ({
  className,
  ...props
}: ComponentProps<"svg"> & { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M13.75 5.25C14.855 5.25 15.75 6.145 15.75 7.25V12.75C15.75 13.855 14.855 14.75 13.75 14.75H4.25C3.145 14.75 2.25 13.855 2.25 12.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.075C6.662 2.75 7.219 3.008 7.599 3.455L9.123 5.25H13.749H13.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Folder2OpenIcon = ({
  className,
  ...props
}: ComponentProps<"svg"> & { className?: string }) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M5 14.75H4.25C3.145 14.75 2.25 13.855 2.25 12.75V4.75C2.25 3.645 3.145 2.75 4.25 2.75H6.075C6.662 2.75 7.219 3.008 7.599 3.455L9.123 5.25H13.749C14.854 5.25 15.749 6.145 15.749 7.25V8.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.148 13.27L16.991 10.14C17.248 9.187 16.53 8.25 15.543 8.25H6.15001C5.47201 8.25 4.87801 8.705 4.70201 9.36L3.76001 12.86C3.50301 13.813 4.22101 14.75 5.20801 14.75H14.217C15.121 14.75 15.913 14.143 16.148 13.27Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// ============================================================================
// Context
// ============================================================================

type TreeLevelContextValue = {
  level: number;
  parentId: string | null;
};

const DEFAULT_VALUE: TreeLevelContextValue = {
  level: 1,
  parentId: null,
};

const TreeLevelContext = createContext<TreeLevelContextValue>(DEFAULT_VALUE);

const useTreeLevel = () => useContext(TreeLevelContext);

type TreeLevelProviderProps = {
  children: ReactNode;
  level: number;
  parentId: string | null;
};

const TreeLevelProvider = ({
  children,
  level,
  parentId,
}: TreeLevelProviderProps) => {
  const value = useMemo(() => ({ level, parentId }), [level, parentId]);

  return (
    <TreeLevelContext.Provider value={value}>
      {children}
    </TreeLevelContext.Provider>
  );
};

// ============================================================================
// Utils
// ============================================================================

const getParentTreeItem = (
  element: HTMLElement,
  container: HTMLElement
): HTMLElement | null => {
  const findParent = (parent: HTMLElement | null): HTMLElement | null => {
    if (!parent || parent === container) return null;

    if (parent.getAttribute("role") === "group") {
      const folder = parent.previousElementSibling;
      if (
        folder instanceof HTMLElement &&
        folder.getAttribute("role") === "treeitem"
      ) {
        return folder;
      }
    }

    return findParent(parent.parentElement);
  };

  return findParent(element.parentElement);
};

const getFirstChildTreeItem = (folder: HTMLElement): HTMLElement | null => {
  const group = folder.nextElementSibling;

  if (group?.getAttribute("role") === "group") {
    return group.querySelector<HTMLElement>('[role="treeitem"]');
  }

  return null;
};

const isInsideCollapsedGroup = (
  el: HTMLElement,
  container: HTMLElement
): boolean => {
  const checkParent = (parent: HTMLElement | null): boolean => {
    if (!parent || parent === container) return false;

    if (parent.getAttribute("role") === "group") {
      const folder = parent.previousElementSibling;
      if (folder?.getAttribute("aria-expanded") === "false") {
        return true;
      }
    }

    return checkParent(parent.parentElement);
  };

  return checkParent(el.parentElement);
};

const getVisibleTreeItems = (container: HTMLElement): HTMLElement[] =>
  Array.from(
    container.querySelectorAll<HTMLElement>('[role="treeitem"]')
  ).filter((el) => !isInsideCollapsedGroup(el, container));

const calculatePaddingLeft = (level: number) => {
  return 6 + (level - 1) * 22;
};

const getTreeItemLabel = (element: HTMLElement): string | null => {
  const labelSpan = element.querySelector<HTMLElement>("[title]");
  return labelSpan?.textContent ?? element.textContent ?? null;
};

const getSiblingFolders = (
  element: HTMLElement,
  container: HTMLElement
): HTMLElement[] => {
  const findParentGroup = (el: HTMLElement | null): HTMLElement | null => {
    if (!el || el === container) return null;

    if (el.getAttribute("role") === "group") return el;
    if (el.getAttribute("role") === "tree") return el;

    return findParentGroup(el.parentElement);
  };

  const parentGroup = findParentGroup(element.parentElement) ?? container;

  return Array.from(parentGroup.children).flatMap((child) => {
    const nested = child.querySelector<HTMLElement>(
      ':scope > [role="treeitem"][aria-expanded]'
    );
    const direct =
      child instanceof HTMLElement &&
      child.getAttribute("role") === "treeitem" &&
      child.hasAttribute("aria-expanded")
        ? child
        : null;

    return [nested, direct].filter((el): el is HTMLElement => el !== null);
  });
};

// ============================================================================
// TreeRoot
// ============================================================================

const TYPE_AHEAD_TIMEOUT_MS = 500;

export type TreeProps = {
  children: ReactNode;
  className?: string;
};

const updateRovingTabindex = (container: HTMLElement, target: HTMLElement) => {
  const allItems = container.querySelectorAll<HTMLElement>('[role="treeitem"]');
  allItems.forEach((item) => {
    item.setAttribute("tabindex", item === target ? "0" : "-1");
  });
};

const TreeRoot = ({ children, className }: TreeProps) => {
  const treeRef = useRef<HTMLDivElement>(null);
  const typeAheadBufferRef = useRef("");
  const typeAheadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!treeRef.current || initializedRef.current) return;

    const firstItem =
      treeRef.current.querySelector<HTMLElement>('[role="treeitem"]');
    if (firstItem) {
      updateRovingTabindex(treeRef.current, firstItem);
      initializedRef.current = true;
    }
  }, [children]);

  useEffect(() => {
    return () => {
      if (typeAheadTimeoutRef.current) {
        clearTimeout(typeAheadTimeoutRef.current);
      }
    };
  }, []);

  const focusItem = useCallback((item: HTMLElement | null | undefined) => {
    if (!item || !treeRef.current) return;

    updateRovingTabindex(treeRef.current, item);
    item.focus();
  }, []);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    const target = e.target;

    if (
      !(target instanceof HTMLElement) ||
      target.getAttribute("role") !== "treeitem"
    )
      return;
    if (!treeRef.current) return;

    updateRovingTabindex(treeRef.current, target);
  }, []);

  const handleTreeKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    const container = e.currentTarget;
    const target = e.target;

    if (
      !(target instanceof HTMLElement) ||
      target.getAttribute("role") !== "treeitem"
    )
      return;

    const visibleItems = getVisibleTreeItems(container);
    const currentIndex = visibleItems.indexOf(target);
    const isFolder = target.getAttribute("aria-expanded") !== null;
    const isExpanded = target.getAttribute("aria-expanded") === "true";

    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        focusItem(visibleItems[currentIndex + 1]);
        break;
      }

      case "ArrowUp": {
        e.preventDefault();
        focusItem(visibleItems[currentIndex - 1]);
        break;
      }

      case "ArrowRight": {
        e.preventDefault();
        if (isFolder) {
          if (!isExpanded) {
            target.click();
          } else {
            focusItem(getFirstChildTreeItem(target));
          }
        }
        break;
      }

      case "ArrowLeft": {
        e.preventDefault();
        if (isFolder && isExpanded) {
          target.click();
        } else {
          focusItem(getParentTreeItem(target, container));
        }
        break;
      }

      case "Home": {
        e.preventDefault();
        focusItem(visibleItems[0]);
        break;
      }

      case "End": {
        e.preventDefault();
        focusItem(visibleItems[visibleItems.length - 1]);
        break;
      }

      case " ":
      case "Enter": {
        e.preventDefault();
        target.click();
        break;
      }

      case "*": {
        e.preventDefault();
        const siblingFolders = getSiblingFolders(target, container);
        siblingFolders.forEach((folder) => {
          if (folder.getAttribute("aria-expanded") === "false") {
            folder.click();
          }
        });
        break;
      }

      default: {
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();

          if (typeAheadTimeoutRef.current) {
            clearTimeout(typeAheadTimeoutRef.current);
          }

          typeAheadBufferRef.current += e.key.toLowerCase();

          const searchString = typeAheadBufferRef.current;
          const startIndex = currentIndex + 1;

          const itemsAfter = visibleItems.slice(startIndex);
          const itemsBefore = visibleItems.slice(0, startIndex);
          const searchOrder = [...itemsAfter, ...itemsBefore];

          const match = searchOrder.find((item) => {
            const label = getTreeItemLabel(item);
            return label?.toLowerCase().startsWith(searchString);
          });

          if (match) {
            focusItem(match);
          }

          typeAheadTimeoutRef.current = setTimeout(() => {
            typeAheadBufferRef.current = "";
          }, TYPE_AHEAD_TIMEOUT_MS);
        }
        break;
      }
    }
  };

  return (
    <div
      ref={treeRef}
      role="tree"
      aria-label="File tree"
      onFocus={handleFocus}
      onKeyDown={handleTreeKeyDown}
      className={cn(Classes.Tree, className)}
      data-component-part="tree-root"
    >
      <TreeLevelProvider level={1} parentId={null}>
        {children}
      </TreeLevelProvider>
    </div>
  );
};

// ============================================================================
// TreeFolder
// ============================================================================

export type TreeFolderProps = {
  name: string;
  defaultOpen?: boolean;
  children?: ReactNode;
  openable?: boolean;
};

function TreeFolder({
  name,
  defaultOpen = false,
  children,
  openable: _openable = true,
}: TreeFolderProps) {
  const uniqueId = useId();
  const nodeId = `tree-folder-${uniqueId}`;
  const groupId = `tree-group-${uniqueId}`;

  const openable = _openable && !!children;

  const { level } = useTreeLevel();
  const [open, setOpen] = useState(openable && defaultOpen);

  const FolderIcon = openable && open ? Folder2OpenIcon : Folder2Icon;

  return (
    <div
      role="none"
      style={
        { "--padding-left": calculatePaddingLeft(level) } as CSSProperties
      }
    >
      <div
        id={nodeId}
        role="treeitem"
        aria-level={level}
        aria-expanded={openable ? open : undefined}
        aria-selected={false}
        aria-owns={openable && open ? groupId : undefined}
        tabIndex={-1}
        onClick={openable ? () => setOpen((prev) => !prev) : undefined}
        className={cn(
          "py-1 pr-1.5 -outline-offset-1 pl-[calc(var(--padding-left)*1px)] flex items-center gap-1.5 hover:bg-neutral-100 rounded-lg dark:hover:bg-neutral-900 text-gray-700 dark:text-gray-400",
          openable ? "cursor-pointer" : "cursor-default",
          Classes.TreeFolder
        )}
        data-component-part="tree-folder"
      >
        <FolderIcon
          className="shrink-0 select-none size-4"
          aria-hidden="true"
          data-component-part={
            openable && open ? "tree-folder-icon-open" : "tree-folder-icon-closed"
          }
        />
        <span
          className="truncate text-sm font-medium leading-5 -tracking-[0.1px]"
          data-component-part="tree-folder-title"
          title={name}
        >
          {name}
        </span>
      </div>
      {openable && open && (
        <div
          id={groupId}
          role="group"
          className="relative"
          data-component-part="tree-folder-children-wrapper"
        >
          <div
            aria-hidden="true"
            className="select-none absolute w-px h-full bg-neutral-200 dark:bg-neutral-800 left-[calc((var(--padding-left)+8)*1px)] z-10"
            data-component-part="tree-folder-children-line"
          />
          <TreeLevelProvider level={level + 1} parentId={nodeId}>
            {children}
          </TreeLevelProvider>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// TreeFile
// ============================================================================

export type TreeFileProps = {
  name: string;
};

const TreeFile = ({ name }: TreeFileProps) => {
  const { level } = useTreeLevel();

  return (
    <div
      role="treeitem"
      aria-level={level}
      aria-selected={false}
      tabIndex={-1}
      className={cn(
        "py-1 pr-1.5 -outline-offset-1 pl-[calc(var(--padding-left)*1px)] flex items-center gap-1.5 cursor-default hover:bg-neutral-100 rounded-lg dark:hover:bg-neutral-900 text-gray-700 dark:text-gray-400",
        Classes.TreeFile
      )}
      style={
        { "--padding-left": calculatePaddingLeft(level) } as CSSProperties
      }
      data-component-part="tree-file"
    >
      <FileIcon
        className="shrink-0 select-none size-4"
        aria-hidden="true"
        data-component-part="tree-file-icon"
      />
      <span
        className="truncate text-sm font-medium leading-5 -tracking-[0.1px]"
        data-component-part="tree-file-title"
        title={name}
      >
        {name}
      </span>
    </div>
  );
};

// ============================================================================
// Exports
// ============================================================================

export const Tree = Object.assign(TreeRoot, {
  File: TreeFile,
  Folder: TreeFolder,
});
