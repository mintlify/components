import clsx from "clsx";
import { useEffect, useState } from "react";
import { getNodeText } from "../utils/getNodeText";

import { CodeTabBar } from "./CodeTabBar";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function CodeBlock({
  filename,
  filenameColor,
  copiedTooltipColor,
  children,
}: {
  filename?: string;

  /** Color of the filename text and the border underneath it when the content is being shown */
  filenameColor?: string;

  /** Background color for the tooltip saying Copied when you click the clipboard */
  copiedTooltipColor?: string;

  children?: any;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <div
      className={clsx(
        "mt-5 mb-8 bg-slate-800 rounded-xl shadow-lg dark:ring-1 dark:ring-white/10 dark:ring-inset",
        filename && "pt-2"
      )}
    >
      {filename ? (
        <CodeTabBar filename={filename} filenameColor={filenameColor}>
          {hydrated ? (
            <CopyToClipboardButton
              textToCopy={getNodeText(children)}
              copiedTooltipColor={copiedTooltipColor ?? filenameColor}
            />
          ) : undefined}
        </CodeTabBar>
      ) : null}
      <div className="children:!my-0 children:!shadow-none children:!bg-transparent relative">
        {hydrated ? children : null}
      </div>
    </div>
  );
}
