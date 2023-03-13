import { clsx } from 'clsx';
import React from 'react';
import { ReactNode } from 'react';

import { ExpandableItemCoverIcon } from '../Expandable/ExpandableCover';

function AccordionItemCover({
  title,
  description,
  open,
  setOpen,
  icon,
  coverClass,
}: {
  title: string;
  description?: string;
  open: boolean;
  setOpen: (open: boolean) => any;
  icon?: ReactNode;
  coverClass: string;
}) {
  // In rounded style, we round the button itself so when a web browser in keyboard navigation mode
  // highlights the button the highlight will follow the corners.
  return (
    <button
      onClick={() => setOpen(!open)}
      className={clsx('not-prose flex flex-row items-center content-center w-full', coverClass)}
      aria-controls={title + 'Children'}
      aria-expanded={open}
    >
      <div className="mr-0.5">
        <ExpandableItemCoverIcon open={open} />
      </div>
      {icon ? (
        <div className="h-4 w-4 fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100">
          {icon}
        </div>
      ) : null}
      <div className="leading-tight text-left">
        <p className="m-0 font-medium text-slate-900 dark:text-slate-200">{title}</p>
        {description ? (
          <p className="m-0 text-slate-900 dark:text-slate-200">{description}</p>
        ) : null}
      </div>
    </button>
  );
}

export default AccordionItemCover;
