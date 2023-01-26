import clsx from "clsx";
import { useEffect, useState } from "react";
import { getNodeText } from "../utils/getNodeText";
import { ReactElement } from "react";

import { CopyToClipboardButton } from "./CopyToClipboardButton";

export function CodeBlock({
  filename,
  filenameColor,
  tooltipColor,
  copiedTooltipColor,
  children,
}: {
  filename?: string;
  /**
   *  Color of the filename text and the border underneath it when the content is being shown.
   */
  filenameColor?: string;
  /**
   * Background color for the tooltip saying Click to Copy when you hover the clipboard.
   */
  tooltipColor?: string;
  /**
   * Background color for the tooltip saying Copied when you click the clipboard.
   */
  copiedTooltipColor?: string;

  children?: any;
}) {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const Button = () => (
    <CopyToClipboardButton
      textToCopy={getNodeText(children)}
      tooltipColor={tooltipColor ?? filenameColor}
      copiedTooltipColor={copiedTooltipColor ?? tooltipColor ?? filenameColor}
    />
  );

  return (
    <div className={clsx("mt-5 mb-8 not-prose gray-frame", filename && "pt-2")}>
      {filename ? (
        <CodeTabBar filename={filename} filenameColor={filenameColor}>
          {hydrated ? <Button /> : undefined}
        </CodeTabBar>
      ) : null}
      {!filename && hydrated && (
        <div className="z-10 absolute top-5 right-5">
          <Button />
        </div>
      )}
      <div
        className="code-in-gray-frame children:!my-0 children:!shadow-none children:!bg-transparent"
        style={{ fontVariantLigatures: "none" }}
      >
        {hydrated ? children : null}
      </div>
    </div>
  );
}

/**
 * Different from CodeGroup because we cannot use Headless UI's Tab component outside a Tab.Group
 * Styling should look the same though.
 */
function CodeTabBar({
  filename,
  filenameColor,
  children,
}: {
  filename: string;
  filenameColor?: string;
  children?: ReactElement;
}) {
  return (
    <div className="flex text-slate-400 text-xs leading-6">
      <div
        className="flex-none border-t border-b border-t-transparent px-4 py-1 flex items-center"
        style={{ color: filenameColor, borderBottomColor: filenameColor }}
      >
        {filename}
      </div>
      <div className="flex-auto flex items-center bg-codeblock-tabs border border-slate-500/30 rounded-t">
        {children && (
          <div className="flex-auto flex items-center justify-end px-4 space-x-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
