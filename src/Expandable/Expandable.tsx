import clsx from 'clsx';
import { useState } from 'react';

import ExpandableCover from './ExpandableCover';

function Expandable({
  title,
  description,
  defaultOpen = false,
  onChange,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  onChange?: (open: boolean) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);

  const onClickOpen = (open: boolean) => {
    setOpen(open);
    if (onChange) {
      onChange(open);
    }
  };

  return (
    <div key={title} role="listitem" className="">
      <ExpandableCover title={title} description={description} open={open} setOpen={onClickOpen} />
      <div
        id={title + 'Children'}
        className={clsx(
          'mt-2 pt-2 mb-4 mx-[6px] px-4 border-l border-zinc-100 dark:border-zinc-800',
          !open && 'hidden'
        )}
      >
        {children}
      </div>
    </div>
  );
}

export default Expandable;
