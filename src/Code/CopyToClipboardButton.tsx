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
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
        className="top-5 h-[1.15rem] fill-zinc-500 hover:fill-zinc-300 cursor-pointer"
      >
        <path d="M320 64H280h-9.6C263 27.5 230.7 0 192 0s-71 27.5-78.4 64H104 64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64zM80 112v24c0 13.3 10.7 24 24 24h88 88c13.3 0 24-10.7 24-24V112h16c8.8 0 16 7.2 16 16V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V128c0-8.8 7.2-16 16-16H80zm88-32a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zM136 272a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zm40-16c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H176zm0 96c-8.8 0-16 7.2-16 16s7.2 16 16 16h96c8.8 0 16-7.2 16-16s-7.2-16-16-16H176zm-64 40a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
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
