import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { getNodeText } from "../utils/getNodeText";
import { CopyToClipboardButton } from "./CopyToClipboardButton";

export type CodeGroupProps = { children: any; isSmallText?: boolean };

/**
 * Group multiple code blocks into a tabbed UI.
 * Uses CodeBlocks as children but does not render them directly. Instead,
 * CodeGroup extracts the props and renders CodeBlock's children.
 *
 * @param {CodeBlock[]} props.children
 */
export function CodeGroup({ children, isSmallText }: CodeGroupProps) {
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
      <div className="flex text-slate-400 text-xs leading-6 rounded-tl-xl pt-2">
        <Tab.List className="flex">
          {children.map((child: any, tabIndex: number) => (
            <TabItem
              key={child.props.filename + "TabItem"}
              myIndex={tabIndex}
              selectedIndex={selectedIndex}
              selectedColor={child.props.filenameColor}
            >
              {child.props.filename}
            </TabItem>
          ))}
        </Tab.List>
        <div
          className={clsx(
            "flex-auto flex justify-end bg-slate-700/50 border-y border-slate-500/30 pr-4 rounded-tr",
            selectedIndex === children.length - 1 ? "rounded-tl border-l" : ""
          )}
        >
          {hydrated ? (
            <CopyToClipboardButton
              textToCopy={getNodeText(selectedChild.props.children)}
              copiedTooltipColor={
                selectedChild.props.copiedTooltipColor ??
                selectedChild.props.filenameColor
              }
            />
          ) : undefined}
        </div>
      </div>
      <Tab.Panels className="flex overflow-auto">
        {children.map((child: any) => (
          <Tab.Panel
            key={child.props.filename}
            className={clsx(
              "flex-none min-w-full text-slate-50 p-5 ligatures-none",
              isSmallText ? "text-xs leading-5" : "text-sm leading-6"
            )}
          >
            {hydrated && child.props.children}
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

  // A cap is the edge of a list of tabs that has a special border treatment
  // The edges of a tab may be in one of three states:
  // - null if selected
  // - normal if it looks like a normal tab
  // - capped if there's a solid rounded corner on that edge
  const edges = {
    leading: isSelected ? null : isAfterSelected ? "capped" : "normal",
    trailing: isSelected ? null : isBeforeSelected ? "capped" : "normal",
  };

  return (
    <Tab
      className="flex items-center relative z-10 overflow-hidden px-4 py-1 text-slate-400 outline-none"
      style={{ color: isSelected ? selectedColor : "" }}
    >
      <span className="z-10">{children}</span>

      {/* Inactive tabs with optional edge caps */}
      {!isSelected && (
        <TabAdornment
          className={clsx(
            "bg-slate-700/50 border-y border-slate-500/30",
            edges.leading === "capped" && "border-l rounded-tl",
            edges.trailing === "capped" && "border-r rounded-tr"
          )}
        />
      )}

      {/* Divider between inactive tabs */}
      {edges.trailing === "normal" && (
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
