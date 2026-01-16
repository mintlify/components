
import { ReactNode } from 'react';

import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';

export function AccordionCover({
    id,
    title,
    description,
    open,
    icon,
    topOffset = '-top-18',
}: {
    id: string;
    title: string | ReactNode;
    description?: string;
    open: boolean;
    icon?: ReactNode;
    topOffset?: string;
}) {

    return (
        <summary
            id={id + '-label'}
            className="py-4 px-5 space-x-2 hover:bg-gray-100 hover:dark:bg-gray-800 rounded-t-xl relative not-prose flex flex-row items-center content-center w-full cursor-pointer list-none [&::-webkit-details-marker]:hidden"
            aria-controls={id + '-accordion-children'}
            aria-expanded={open}
            data-component-part="accordion-button"
        >
            <div id={id} className={cn('absolute', topOffset)} />
            <div className="mr-0.5" data-component-part="accordion-caret-right">
                <Icon
                    icon="caret-right"
                    iconType="solid"
                    size={12}
                    className={cn(
                        'transition bg-gray-700 dark:bg-gray-400',
                        open && 'duration-200 rotate-90 -mt-1',
                        !open && 'duration-75'
                    )}
                />
            </div>
            {icon ? (
                <div
                    className="h-4 w-4 flex items-center justify-center fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100"
                    data-component-part="accordion-icon"
                >
                    {icon}
                </div>
            ) : null}
            <div
                className="leading-tight text-left"
                contentEditable={false}
                data-component-part="accordion-title-container"
            >
                <p
                    className="m-0 font-medium text-gray-900 dark:text-gray-200"
                    data-component-part="accordion-title"
                >
                    {title}
                </p>
                {description ? (
                    <p
                        className="m-0 text-gray-900 dark:text-gray-200"
                        data-component-part="accordion-description"
                    >
                        {description}
                    </p>
                ) : null}
            </div>
        </summary>
    );
}
