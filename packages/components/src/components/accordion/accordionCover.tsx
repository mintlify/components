
import { ReactNode } from 'react';

import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';

export function AccordionCover({
    id,
    title,
    description,
    open,
    icon,
    coverClass,
    topOffset = '-top-[4.5rem]',
}: {
    id?: string;
    title: string | ReactNode;
    description?: string;
    open: boolean;
    icon?: ReactNode;
    coverClass: string;
    topOffset?: string;
}) {

    return (
        <summary
            className={cn(
                'relative not-prose flex flex-row items-center content-center w-full cursor-pointer',
                'list-none [&::-webkit-details-marker]:hidden',
                coverClass
            )}
            aria-controls={id + ' accordion children'}
            aria-expanded={open}
            data-component-part="accordion-button"
        >
            <div id={id} className={cn('absolute', topOffset)} />
            <div className="mr-0.5" data-component-part="accordion-caret-right">
                <Icon
                    icon="caret-right"
                    iconType="solid"
                    className={cn(
                        'h-3 w-3 transition bg-gray-700 dark:bg-gray-400',
                        open && 'duration-200 rotate-90 -mt-1',
                        !open && 'duration-75'
                    )}
                />
            </div>
            {icon ? (
                <div
                    className="h-4 w-4 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100"
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
