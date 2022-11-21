import clsx from "clsx";
import { useEffect, useState } from "react";
import { getNodeText } from "../utils/getNodeText";

import { CodeTabBar } from "./CodeTabBar";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function CodeBlock({
  filename,
  accentColor,
  copiedTooltipColor,
  children,
}: {
  filename?: string;
  accentColor?: string;
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
        <CodeTabBar filename={filename} accentColor={accentColor}>
          {hydrated ? (
            <CopyToClipboardButton
              textToCopy={getNodeText(children)}
              copiedTooltipColor={copiedTooltipColor ?? accentColor}
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
