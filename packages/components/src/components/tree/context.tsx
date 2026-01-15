import { useMemo, ReactNode } from 'react';

import { TreeLevelContext } from './tree-level-context';

type TreeLevelProviderProps = {
    children: ReactNode;
    level: number;
    parentId: string | null;
};

export const TreeLevelProvider = ({ children, level, parentId }: TreeLevelProviderProps) => {
    const value = useMemo(() => ({ level, parentId }), [level, parentId]);

    return <TreeLevelContext.Provider value={value}>{children}</TreeLevelContext.Provider>;
};
