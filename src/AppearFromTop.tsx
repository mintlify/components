import { Transition } from "@headlessui/react";
import clsx from "clsx";

export function AppearFromTop({
  isOpen,
  as,
  className,
  children,
}: {
  isOpen: boolean;
  className?: string;
  as?: any;
  children: any;
}) {
  return (
    <div className="overflow-hidden relative">
      <Transition
        show={isOpen}
        as={as}
        className={className}
        enter="transition duration-400 ease-out transform"
        enterFrom="transform opacity-0 -translate-y-12"
        enterTo="transform opacity-100 translate-y-0"
        leave="transition duration-75 ease-out transform"
        leaveFrom="transform opacity-100 translate-y-0"
        leaveTo="transform opacity-0 -translate-y-12"
      >
        {children}
      </Transition>
    </div>
  );
}
