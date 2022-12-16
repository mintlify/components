export function BaseUrlDropdown({
  baseUrls,
  defaultValue,
  onChange,
}: {
  /** Array of base URLs to select from. Component is hidden when the array is empty or only has one value. */
  baseUrls: string[];

  /** Initially selected base URL. */
  defaultValue: string | undefined;

  /** Function called when the user selects a different base URL. */
  onChange: (baseUrl: string) => void;
}) {
  if (baseUrls == null || !Array.isArray(baseUrls) || baseUrls.length <= 1) {
    return null;
  }

  return (
    <div className="border-slate-400 dark:border-slate-400 relative select-none align-middle inline-flex rounded-md -top-px mx-1 w-5 h-[1.125rem] bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border hover:border-slate-400 dark:hover:border-slate-400 focus:outline-none cursor-pointer">
      <select
        aria-label="Select API base"
        aria-expanded="false"
        className="z-10 absolute inset-0 opacity-0 cursor-pointer"
        onChange={(e) => onChange(e.target.value)}
        defaultValue={defaultValue}
      >
        <option disabled>Select API base</option>
        {baseUrls.map((baseUrl) => (
          <option key={baseUrl}>{baseUrl}</option>
        ))}
      </select>
      <svg
        width="20"
        height="20"
        fill="none"
        className="transform absolute -top-0.5 -left-px rotate-90"
      >
        <path
          className="stroke-slate-700 dark:stroke-slate-100"
          d="M9 7l3 3-3 3"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
}
