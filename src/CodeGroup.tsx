import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { ReactNode, ReactElement, useState } from "react";

function TabAdornment({ className }: { className: string }) {
  return (
    <div className={clsx("pointer-events-none absolute inset-0", className)} />
  );
}

function TabItem({
  selectedIndex,
  myIndex,
  marker,
  children,
}: {
  selectedIndex: number;
  myIndex: number;
  marker?: string;
  children: ReactNode;
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
      className={clsx(
        "flex items-center relative z-10 overflow-hidden px-4 py-1",
        isSelected ? "text-primary-light" : "text-slate-400"
      )}
    >
      <span className="z-10">{children}</span>

      {marker === "close" && (
        <svg
          viewBox="0 0 4 4"
          className="ml-2.5 flex-none w-1 h-1 text-slate-500 overflow-visible"
        >
          <path
            d="M-1 -1L5 5M5 -1L-1 5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
          />
        </svg>
      )}

      {marker === "modified" && (
        <div className="ml-2.5 flex-none w-1 h-1 rounded-full bg-current" />
      )}

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
        <TabAdornment className="border-b border-b-primary-light" />
      )}
    </Tab>
  );
}

/**
 * Group multiple code blocks into a tabbed UI
 *
 * @param {object} props
 * @param {CodeBlock[]} props.children
 */
export function CodeGroup({
  actions,
  isSmallText,
  children,
}: {
  // TO DO: Set the types
  actions: any;
  isSmallText: boolean;
  children: any;
}) {
  let [selectedIndex, setSelectedIndex] = useState(0);

  if (!Array.isArray(children)) {
    children = [children];
  }

  return (
    // TO DO: Debug Tab.Group types
    // @ts-ignore
    <Tab.Group
      as="div"
      onChange={setSelectedIndex}
      className="not-prose bg-slate-800 rounded-xl shadow-md"
    >
      <div className="flex">
        <Tab.List className="flex text-slate-400 text-xs leading-6 overflow-hidden rounded-tl-xl pt-2">
          {children.map((child: ReactElement, tabIndex: number) => (
            <TabItem
              key={child.props.filename}
              myIndex={tabIndex}
              selectedIndex={selectedIndex}
            >
              {child.props.filename}
            </TabItem>
          ))}
        </Tab.List>
        <div className="flex-auto flex pt-2 rounded-tr-xl overflow-hidden">
          <div
            className={clsx(
              "flex-auto flex justify-end bg-slate-700/50 border-y border-slate-500/30 pr-4",
              selectedIndex === children.length - 1 ? "rounded-tl border-l" : ""
            )}
          />
        </div>
        {actions ? (
          <div className="absolute top-2 right-4 h-8 flex">
            {actions({ selectedIndex })}
          </div>
        ) : null}
      </div>
      <Tab.Panels className="flex overflow-auto">
        {children.map((child: ReactElement) => (
          <Tab.Panel
            key={child.props.filename}
            className={clsx(
              "flex-none min-w-full p-5 text-slate-50 ligatures-none",
              isSmallText ? "text-xs leading-5" : "text-sm leading-6"
            )}
          >
            {child.props.children}
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}
