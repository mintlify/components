import { mergeProps } from "@base-ui/react/merge-props";
import { cloneElement, isValidElement, type ReactNode } from "react";

const renderAsChild = (child: ReactNode) => {
  if (!isValidElement(child)) {
    return undefined;
  }

  return (props: React.HTMLAttributes<HTMLElement>) =>
    cloneElement(child, mergeProps(props, child.props));
};

export { renderAsChild };
