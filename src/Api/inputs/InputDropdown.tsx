export const InputDropdown = ({
  options,
  onInputChange,
}: {
  options: string[];
  onInputChange: (newValue: string) => void;
}) => (
  <div className="relative">
    <select
      className="w-full py-0.5 px-2 rounded border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-500 cursor-pointer"
      onChange={(e) => onInputChange(e.target.value)}
    >
      <option disabled selected>
        Select
      </option>
      {options.map((option) => (
        <option>{option}</option>
      ))}
    </select>
    <DownArrowSvg />
  </div>
);

const DownArrowSvg = () => (
  <svg
    className="absolute right-2 top-[7px] h-3 fill-slate-500 dark:fill-slate-400 pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path d="M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z" />
  </svg>
);
