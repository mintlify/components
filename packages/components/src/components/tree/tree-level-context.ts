import { createContext } from 'react';

export type TreeLevelContextValue = {
    level: number;
    parentId: string | null;
};

const DEFAULT_VALUE: TreeLevelContextValue = {
    level: 1,
    parentId: null,
};

export const TreeLevelContext = createContext<TreeLevelContextValue>(DEFAULT_VALUE);
