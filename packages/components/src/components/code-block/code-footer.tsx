import { EllipsisIcon } from "lucide-react";

type CodeFooterProps = {
  numberOfLines: number | undefined;
  isExpanded: boolean;
  toggleExpanded: () => void;
};

const CodeFooter = ({
  numberOfLines,
  isExpanded,
  toggleExpanded,
}: CodeFooterProps) => {
  if (!numberOfLines) {
    return null;
  }

  return (
    <div
      className="flex items-center px-3 py-1 font-medium text-stone-500 text-xs hover:text-stone-600 dark:text-stone-400 dark:hover:text-stone-300"
      data-component-part="code-block-footer"
    >
      <button
        className="flex flex-1 items-center gap-1.5 py-1.5"
        data-component-part="code-block-footer-button"
        onClick={toggleExpanded}
        type="button"
      >
        <EllipsisIcon className="size-3.5 shrink-0 text-stone-500 dark:text-stone-400" />
        {isExpanded
          ? "Collapse"
          : `See all ${numberOfLines} line${numberOfLines === 1 ? "" : "s"}`}
      </button>
    </div>
  );
};

export { type CodeFooterProps, CodeFooter };
