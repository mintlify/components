import { useContext } from 'react';

import { TreeLevelContext } from './tree-level-context';

export const useTreeLevel = () => useContext(TreeLevelContext);
