import { useContext } from "react";

import { TreeLevelContext } from "./tree-level-context";

const useTreeLevel = () => useContext(TreeLevelContext);

export { useTreeLevel };
