/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: TODO */
import {
  type FocusEvent,
  type KeyboardEvent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";

import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";

import { TreeLevelProvider } from "./context";
import {
  getFirstChildTreeItem,
  getParentTreeItem,
  getSiblingFolders,
  getTreeItemLabel,
  getVisibleTreeItems,
  updateRovingTabindex,
} from "./utils";

const TYPE_AHEAD_TIMEOUT_MS = 500;

type TreeProps = {
  className?: string;
  children: ReactNode;
};

const TreeRoot = ({ className, children }: TreeProps) => {
  const treeRef = useRef<HTMLDivElement>(null);
  const typeAheadBufferRef = useRef("");
  const typeAheadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  useEffect(() => {
    if (!treeRef.current) {
      return;
    }

    const existingFocusable = treeRef.current.querySelector<HTMLElement>(
      '[role="treeitem"][tabindex="0"]'
    );

    if (existingFocusable) {
      return;
    }

    const firstItem =
      treeRef.current.querySelector<HTMLElement>('[role="treeitem"]');
    if (firstItem) {
      updateRovingTabindex(treeRef.current, firstItem);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (typeAheadTimeoutRef.current) {
        clearTimeout(typeAheadTimeoutRef.current);
      }
    };
  }, []);

  const focusItem = useCallback((item: HTMLElement | null | undefined) => {
    if (!(item && treeRef.current)) {
      return;
    }

    updateRovingTabindex(treeRef.current, item);
    item.focus();
  }, []);

  const handleFocus = useCallback((e: FocusEvent<HTMLDivElement>) => {
    const target = e.target;

    if (
      !(target instanceof HTMLElement) ||
      target.getAttribute("role") !== "treeitem"
    ) {
      return;
    }

    if (!treeRef.current) {
      return;
    }

    updateRovingTabindex(treeRef.current, target);
  }, []);

  const handleTreeKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const container = e.currentTarget;
    const target = e.target;

    if (
      !(target instanceof HTMLElement) ||
      target.getAttribute("role") !== "treeitem"
    ) {
      return;
    }

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
          if (isExpanded) {
            focusItem(getFirstChildTreeItem(target));
          } else {
            target.click();
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
        focusItem(visibleItems.at(-1));
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
        // biome-ignore lint/complexity/noForEach: TODO
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
      aria-label="File tree"
      className={cn(Classes.Tree, className)}
      data-component-part="tree-root"
      onFocus={handleFocus}
      onKeyDown={handleTreeKeyDown}
      ref={treeRef}
      role="tree"
    >
      <TreeLevelProvider level={1} parentId={null}>
        {children}
      </TreeLevelProvider>
    </div>
  );
};

export { TreeRoot };
export type { TreeProps };
