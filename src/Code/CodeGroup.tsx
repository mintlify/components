import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { getNodeText } from "../utils/getNodeText";
import { CopyToClipboardButton } from "./CopyToClipboardButton";
import React, { ComponentPropsWithoutRef } from "react";
import { CodeBlockProps } from "./CodeBlock";

export type CodeGroupPropsBase = {
  /**
   * Color of the filename text and the border underneath it when the content is being shown
   */
  selectedColor?: string;
  /**
   * Background color for the tooltip saying `Click to Copy` when hovering the clipboard button.
   */
  tooltipColor?: string;
  /**
   * Background color for the tooltip saying `Copied` when clicking the clipboard button.
   */
  copiedTooltipColor?: string;

  isSmallText?: boolean;

  children?:
    | React.ReactElement<CodeBlockProps>[]
    | React.ReactElement<CodeBlockProps>;
};

export type CodeGroupProps = CodeGroupPropsBase &
  Omit<ComponentPropsWithoutRef<"div">, keyof CodeGroupPropsBase>;

/**
 * Group multiple code blocks into a tabbed UI.
 * Uses CodeBlocks as children but does not render them directly. Instead,
 * CodeGroup extracts the props and renders CodeBlock's children.
 *
 * @param {CodeBlock[]} - children
 */
export function CodeGroup({
  children,
  selectedColor,
  tooltipColor,
  copiedTooltipColor,
  isSmallText,
}: CodeGroupProps) {
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
  const childArr = React.Children.toArray(children) as Array<
    Exclude<React.ReactElement<CodeBlockProps>, boolean | null | undefined>
  >;
  return (
    <Tab.Group as="div" className="not-prose gray-frame">
      <Tab.List className="flex text-xs leading-6 rounded-tl-xl pt-2">
        {({ selectedIndex }) => (
          <>
            {childArr.map((child, tabIndex: number) => (
              <>
                <TabItem
                  key={child?.props?.filename + "TabItem" + tabIndex}
                  myIndex={tabIndex}
                  selectedIndex={selectedIndex}
                  selectedColor={selectedColor}
                >
                  {child?.props?.filename || "Filename"}
                </TabItem>
                <div
                  className={clsx(
                    "flex-auto flex justify-end bg-codeblock-tabs border-y border-slate-500/30 pr-4 rounded-tr",
                    selectedIndex === childArr?.length - 1
                      ? "rounded-tl border-l"
                      : ""
                  )}
                >
                  <CopyToClipboardButton
                    textToCopy={getNodeText(
                      childArr[selectedIndex]?.props?.children
                    )}
                    tooltipColor={tooltipColor ?? selectedColor}
                    copiedTooltipColor={
                      copiedTooltipColor ?? tooltipColor ?? selectedColor
                    }
                  />
                </div>
              </>
            ))}
          </>
        )}
      </Tab.List>
      <Tab.Panels className="flex overflow-auto">
        {childArr.map((child: any) => (
          <Tab.Panel
            key={child?.props?.filename}
            className={clsx(
              "flex-none code-in-gray-frame",
              isSmallText && "text-xs leading-5"
            )}
            style={{ fontVariantLigatures: "none" }}
          >
            {child?.props?.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

interface TabItemProps {
  children: any;
  selectedIndex: number;
  myIndex: number;
  selectedColor?: string;
}

function TabItem({
  children,
  selectedIndex,
  myIndex,
  selectedColor = "#CBD5E1",
}: TabItemProps) {
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
