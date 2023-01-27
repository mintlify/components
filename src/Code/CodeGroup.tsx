import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getNodeText } from "../utils/getNodeText";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export type CodeGroupProps = {
  children: any;

  /** Color of the filename text and the border underneath it when the content is being shown */
  selectedColor?: string;

  /** Background color for the tooltip saying Copied when you click the clipboard */
  copiedTooltipColor?: string;

  isSmallText?: boolean;
};

/**
 * Group multiple code blocks into a tabbed UI.
 * Uses CodeBlocks as children but does not render them directly. Instead,
 * CodeGroup extracts the props and renders CodeBlock's children.
 *
 * @param {CodeBlock[]} props.children
 */
export function CodeGroup({
  children,
  selectedColor,
  copiedTooltipColor,
  isSmallText,
}: CodeGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (children == null) {
    // Hide the frame when no children were passed
    console.warn(
      "CodeGroup has no children, expected at least one CodeBlock child."
    );
    return null;
  } else if (!Array.isArray(children)) {
    // Allow looping over a single child
    children = [children];
  } else if (children.length === 0) {
    return null;
  }

  const selectedChild = children.filter(
    (_: any, i: number) => i === selectedIndex
  )[0];

  return (
    <Tab.Group
      as="div"
      onChange={setSelectedIndex as any}
      className="not-prose gray-frame"
    >
      <div className="flex text-xs leading-6 rounded-tl-xl pt-2">
        <Tab.List className="flex">
          {children.map((child: any, tabIndex: number) => (
            <TabItem
              key={child?.props?.filename + "TabItem" + tabIndex}
              myIndex={tabIndex}
              selectedIndex={selectedIndex}
              selectedColor={selectedColor}
            >
              {child?.props?.filename || "Filename"}
            </TabItem>
          ))}
        </Tab.List>
        <div
          className={clsx(
            "flex-auto flex justify-end bg-codeblock-tabs border-y border-slate-500/30 pr-4 rounded-tr",
            selectedIndex === children.length - 1 ? "rounded-tl border-l" : ""
          )}
        >
          {hydrated && selectedChild?.props ? (
            <CopyToClipboardButton
              textToCopy={getNodeText(selectedChild?.props?.children)}
              tooltipColor={copiedTooltipColor ?? selectedColor}
            />
          ) : undefined}
        </div>
      </div>
      <Tab.Panels className="flex overflow-auto">
        {children.map((child: any) => (
          <Tab.Panel
            key={child?.props?.filename}
            className={clsx(
              "flex-none code-in-gray-frame",
              isSmallText && "text-xs leading-5"
            )}
            style={{ fontVariantLigatures: "none" }}
          >
            {hydrated && child?.props?.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

function TabItem({
  children,
  selectedIndex,
  myIndex,
  selectedColor = "#CBD5E1",
}: {
  children: any;
  selectedIndex: number;
  myIndex: number;
  selectedColor?: string;
}) {
  const isSelected = selectedIndex === myIndex;
  const isBeforeSelected = selectedIndex === myIndex + 1;
  const isAfterSelected = selectedIndex === myIndex - 1;

  // An edge can be in one of three states:
  // - null if selected
  // - normal if not selected and in the middle
  // - rounded if there's a rounded corner on that side
  const edgeLeft = isSelected ? null : isAfterSelected ? "rounded" : "normal";
  const edgeRight = isSelected ? null : isBeforeSelected ? "rounded" : "normal";

  return (
    <Tab
      className="flex items-center relative overflow-hidden px-4 py-1 text-slate-400 outline-none"
      style={isSelected ? { color: selectedColor } : {}}
    >
      <span className="z-10">{children}</span>

      {/* Inactive tabs with optional edge caps */}
      {!isSelected && (
        <TabAdornment
          className={clsx(
            "bg-codeblock-tabs border-y border-slate-500/30",
            edgeLeft === "rounded" && "border-l rounded-tl",
            edgeRight === "rounded" && "border-r rounded-tr"
          )}
        />
      )}

      {/* Divider between inactive tabs */}
      {edgeRight === "normal" && (
        <TabAdornment className="inset-y-px border-r border-slate-200/5 z-20" />
      )}

      {/* Active tab highlight bar */}
      {isSelected && (
        <div
          className="pointer-events-none absolute inset-0 border-b"
          style={{ borderColor: selectedColor }}
        />
      )}
    </Tab>
  );
}

function TabAdornment({ className }: { className: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0", className)} />
  );
}
