import { useState, ReactElement, Children } from "react";
import Tab from "./Tab";

export default function Tabs({ children }: { children: ReactElement[] }) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const arrayChildren = Children.toArray(children) as ReactElement[];
  const activeTabContent = arrayChildren[activeTabIndex].props.children;

  return (
    <>
      <ul className="not-prose mb-6 pb-[1px] flex-none min-w-full overflow-auto border-b border-slate-200 space-x-6 flex dark:border-slate-200/5">
        {arrayChildren.map((child: ReactElement, i: number) => (
          <li className="cursor-pointer" onClick={() => setActiveTabIndex(i)}>
            <Tab title={child.props.title} isActive={i === activeTabIndex} />
          </li>
        ))}
      </ul>
      <div className="prose dark:prose-dark">{activeTabContent}</div>
    </>
  );
}
