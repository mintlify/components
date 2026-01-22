const getParentTreeItem = (
  element: HTMLElement,
  container: HTMLElement
): HTMLElement | null => {
  const findParent = (parent: HTMLElement | null): HTMLElement | null => {
    if (!parent || parent === container) {
      return null;
    }

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
    if (!parent || parent === container) {
      return false;
    }

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
    if (!el || el === container) {
      return null;
    }

    if (el.getAttribute("role") === "group") {
      return el;
    }

    if (el.getAttribute("role") === "tree") {
      return el;
    }

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

const updateRovingTabindex = (container: HTMLElement, target: HTMLElement) => {
  const allItems = container.querySelectorAll<HTMLElement>('[role="treeitem"]');
  // biome-ignore lint/complexity/noForEach: TODO
  allItems.forEach((item) => {
    item.setAttribute("tabindex", item === target ? "0" : "-1");
  });
};

export {
  getParentTreeItem,
  getFirstChildTreeItem,
  getVisibleTreeItems,
  calculatePaddingLeft,
  getTreeItemLabel,
  getSiblingFolders,
  updateRovingTabindex,
};
