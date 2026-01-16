import { CSSProperties, ReactNode, useId, useState } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Folder2Icon, Folder2OpenIcon } from '@/icons';
import { cn } from '@/utils/cn';

import { TreeLevelProvider } from './context';
import { useTreeLevel } from './use-tree-level';
import { calculatePaddingLeft } from './utils';

export type TreeFolderProps = {
    name: string;
    defaultOpen?: boolean;
    children?: ReactNode;
    openable?: boolean;
};

export function TreeFolder({
    name,
    defaultOpen = false,
    children,
    openable: _openable = true,
}: TreeFolderProps) {
    const uniqueId = useId();
    const nodeId = `tree-folder-${uniqueId}`;
    const groupId = `tree-group-${uniqueId}`;

    const openable = _openable && !!children;

    const { level } = useTreeLevel();
    const [open, setOpen] = useState(openable && defaultOpen);

    const FolderIcon = openable && open ? Folder2OpenIcon : Folder2Icon;

    return (
        <div
            role="none"
            style={{ '--padding-left': calculatePaddingLeft(level) } as CSSProperties}
            data-component-part="tree-folder"
        >
            <div
                id={nodeId}
                role="treeitem"
                aria-level={level}
                aria-expanded={openable ? open : undefined}
                aria-selected={false}
                aria-owns={openable && open ? groupId : undefined}
                tabIndex={-1}
                onClick={openable ? () => setOpen((prev) => !prev) : undefined}
                className={cn(
                    'py-1 pr-1.5 -outline-offset-1 pl-[calc(var(--padding-left)*1px)] flex items-center gap-1.5 hover:bg-neutral-100 rounded-lg dark:hover:bg-neutral-900 text-gray-700 dark:text-gray-400',
                    openable ? 'cursor-pointer' : 'cursor-default',
                    Classes.TreeFolder
                )}
            >
                <FolderIcon
                    className="shrink-0 select-none size-4"
                    aria-hidden="true"
                    data-component-part={
                        openable && open ? 'tree-folder-icon-open' : 'tree-folder-icon-closed'
                    }
                />
                <span
                    className="truncate text-sm font-medium leading-5 -tracking-[0.1px]"
                    data-component-part="tree-folder-title"
                    title={name}
                >
                    {name}
                </span>
            </div>
            {openable && open && (
                <div
                    id={groupId}
                    role="group"
                    className="relative"
                    data-component-part="tree-folder-children-wrapper"
                >
                    <div
                        aria-hidden="true"
                        className="select-none absolute w-px h-full bg-neutral-200 dark:bg-neutral-800 left-[calc((var(--padding-left)+8)*1px)] z-10"
                        data-component-part="tree-folder-children-line"
                    />
                    <TreeLevelProvider level={level + 1} parentId={nodeId}>
                        {children}
                    </TreeLevelProvider>
                </div>
            )}
        </div>
    );
}
