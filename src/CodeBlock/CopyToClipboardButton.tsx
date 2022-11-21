import clsx from "clsx";
import { useState } from "react";
import { copyToClipboard } from "../utils/copyToClipboard";

export function CopyToClipboardButton({
  textToCopy,
  copiedTooltipColor = "#002937",
}: {
  textToCopy: string;
  copiedTooltipColor?: string;
}) {
  const [hidden, setHidden] = useState(true);

  // Hide copy button if you would copy an empty string
  if (!textToCopy) {
    return null;
  }

  // Hide copy button if the browser does not support it
  if (!navigator.clipboard) {
    console.warn(
      "The browser's Clipboard API is unavailable. The Clipboard API is only available on HTTPS."
    );
    return null;
  }

  return (
    <button
      className="relative"
      onClick={async () => {
        const result = await copyToClipboard(textToCopy);
        if (result === "success") {
          setHidden(false);
          setTimeout(() => {
            setHidden(true);
          }, 2000);
        }
      }}
    >
      <svg
        className="top-5 h-5 fill-slate-500 hover:fill-slate-300 cursor-pointer"
        viewBox="0 0 20 20"
      >
        <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
        <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      </svg>
      <CopiedTooltip hidden={hidden} copiedTooltipColor={copiedTooltipColor} />
    </button>
  );
}

function CopiedTooltip({
  hidden,
  copiedTooltipColor,
}: {
  hidden: boolean;
  copiedTooltipColor: string;
}) {
  return (
    <div
      className={clsx(
        hidden && "hidden",
        "absolute bottom-full left-1/2 mb-3.5 pb-1 -translate-x-1/2"
      )}
    >
      <div
        className="relative text-white text-xs leading-6 font-medium px-1.5 rounded-lg"
        style={{ background: copiedTooltipColor }}
        data-reach-alert="true"
      >
        Copied
        <svg
          aria-hidden="true"
          width="16"
          height="6"
          viewBox="0 0 16 6"
          className="absolute top-full left-1/2 -mt-px -ml-2"
          style={{ color: copiedTooltipColor }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}
