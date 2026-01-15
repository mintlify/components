import { TreeFile } from './file';
import { TreeFolder } from './folder';
import { TreeRoot } from './root';

const Tree = Object.assign(TreeRoot, {
    File: TreeFile,
    Folder: TreeFolder,
});

export { Tree };
