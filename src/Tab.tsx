import clsx from "clsx";
import { useState } from "react";

export const Tabs = ({ children }: any) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  if (!Array.isArray(children)) {
    children = [children];
  }

  const tabs = children.filter((child: any) => {
    // TODO: remove isTab for storybook
    return child.props.mdxType === "Tab" || child.props.isTab;
  });

  if (tabs.length === 0) {
    return null;
  }

  const activeTabContent = tabs[activeTabIndex].props.children;

  return (
    <>
      <div className="not-prose mb-6">
        <div className="flex-none min-w-full overflow-auto">
          <ul className="border-b border-slate-200 space-x-6 flex whitespace-nowrap dark:border-slate-200/5">
            {tabs.map((tab: any, i: number) => (
              <li onClick={() => setActiveTabIndex(i)}>
                <h2
                  className={clsx(
                    "flex text-sm leading-6 font-semibold pt-3 pb-2.5 border-b-2 -mb-px cursor-pointer",
                    i === activeTabIndex
                      ? "text-primary dark:text-primary-light border-current"
                      : "text-slate-900 border-transparent hover:border-slate-300 dark:text-slate-200 dark:hover:border-slate-700"
                  )}
                >
                  {tab.props.title}
                </h2>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="prose dark:prose-dark">{activeTabContent}</div>
    </>
  );
};

export const Tab = ({ children }: any) => {
  return children;
};
