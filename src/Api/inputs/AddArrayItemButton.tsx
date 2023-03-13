import React from 'react';

export function AddArrayItemButton({ onClick }: { onClick: () => void }) {
  // pointer-events-none on the plus sign SVG is needed to allow clicking the button underneath.
  // Without it, you can't click on the button when hovering over the plus sign.
  return (
    <div className="relative">
      <button
        className="w-full py-0.5 px-2 rounded text-left border border-slate-200 dark:border-slate-600 bg-white dark:bg-dark-input text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500"
        onClick={onClick}
      >
        Add Item
      </button>
      <svg
        className="hidden sm:block absolute right-2 top-[7px] h-3 fill-slate-500 dark:fill-slate-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
      >
        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
      </svg>
    </div>
  );
}
