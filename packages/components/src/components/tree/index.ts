import { TreeFile } from "./file";
import { TreeFolder } from "./folder";
import { TreeRoot } from "./root";

export type { TreeFileProps } from "./file";
export type { TreeFolderProps } from "./folder";
export type { TreeProps } from "./root";

const Tree = Object.assign(TreeRoot, {
  File: TreeFile,
  Folder: TreeFolder,
});

export { Tree };
