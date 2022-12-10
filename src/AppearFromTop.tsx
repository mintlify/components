import { Transition } from "@headlessui/react";

export function AppearFromTop({
  show,
  className,
  children,
}: {
  show: boolean;
  className?: string;
  children: any;
}) {
  return (
    <div className="overflow-hidden relative">
      <Transition
        show={show}
        className={className}
        enter="transition duration-200 ease-out transform"
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
