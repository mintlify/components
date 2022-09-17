import clsx from "clsx";
import { useState } from "react";
import ExpandableCover from "./ExpandableCover";

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
      <ExpandableCover
        title={title}
        description={description}
        open={open}
        setOpen={onClickOpen}
      />
      <dd
        id={title + "Children"}
        className={clsx(
          "mt-2 pt-1 mb-4 mx-[7px] px-4 border-l border-slate-100 dark:border-slate-800",
          !open && "hidden"
        )}
      >
        {children}
      </dd>
    </div>
  );
}

export default Expandable;
