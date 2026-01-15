import { CSSProperties } from 'react';

import { Classes } from '@/lib/local/selectors';
import { FileIcon } from '@/icons';
import { cn } from '@/utils/cn';

import { useTreeLevel } from './use-tree-level';
import { calculatePaddingLeft } from './utils';

export type TreeFileProps = {
    name: string;
};

export const TreeFile = ({ name }: TreeFileProps) => {
    const { level } = useTreeLevel();

    return (
        <div
            role="treeitem"
            aria-level={level}
            aria-selected={false}
            tabIndex={-1}
            className={cn(
                'py-1 pr-1.5 -outline-offset-1 pl-[calc(var(--padding-left)*1px)] flex items-center gap-1.5 cursor-default hover:bg-neutral-100 rounded-lg dark:hover:bg-neutral-900 text-gray-700 dark:text-gray-400',
                Classes.TreeFile
            )}
            style={{ '--padding-left': calculatePaddingLeft(level) } as CSSProperties}
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
