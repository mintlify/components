import { createContext } from "react";

type TreeLevelContextValue = {
  level: number;
  parentId: string | null;
};

const DEFAULT_VALUE: TreeLevelContextValue = {
  level: 1,
  parentId: null,
};

const TreeLevelContext = createContext<TreeLevelContextValue>(DEFAULT_VALUE);

export { TreeLevelContext };
export type { TreeLevelContextValue };
