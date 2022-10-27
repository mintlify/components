import { useState } from "react";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

export function PillSelect({
  options,
  onChange,
  defaultOption,
  selectedOptionClass,
}: {
  /** Array of options to select from */
  options: string[];

  /** Function called when the selected option changes. */
  onChange?: any;

  /** Option to initially show as selected in the dropdown */
  defaultOption?: string;

  /** Additional classes to apply on dropdown text for the currently selected option */
  selectedOptionClass?: string;
}) {
  let defaultState = defaultOption;
  const isOptionsValid = Array.isArray(options) && options.length > 0;
  if (defaultOption == null && isOptionsValid) {
    defaultState = options[0];
  }
  const [selectedOption, setSelectedOption] = useState(defaultState);

  if (!isOptionsValid) {
    return null;
  }

  const onClickOption = (option: string) => {
    setSelectedOption(option);
    if (onChange) {
      onChange(option);
    }
  };

  return (
    <div className="relative">
      <Menu>
        <Menu.Button className="text-xs text-slate-500 dark:text-slate-400 leading-5 font-semibold !bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20">
          {selectedOption}
          <svg
            width="6"
            height="3"
            className="ml-2 overflow-visible"
            aria-hidden="true"
          >
            <path
              d="M0 0L3 3L6 0"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {options.map((option: string) => (
            <Menu.Item disabled={option === selectedOption} key={option}>
              {({ active }) => (
                <a
                  className={clsx(
                    "flex items-center justify-between px-3 py-1 cursor-pointer",
                    active &&
                      "bg-slate-50 text-slate-900 dark:bg-slate-600/30 dark:text-white",
                    option === selectedOption && selectedOptionClass
                  )}
                  onClick={() => onClickOption(option)}
                >
                  {option}
                  {option === selectedOption && (
                    <svg width="24" height="24" fill="none" aria-hidden="true">
                      <path
                        d="m7.75 12.75 2.25 2.5 6.25-6.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
}
