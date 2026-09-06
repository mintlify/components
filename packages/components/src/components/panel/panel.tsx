import { cn } from "cn";
import type { ComponentProps } from "react";

type PanelProps = ComponentProps<"div">;

const Panel = ({ children, className, ...props }: PanelProps) => {
  return (
    <div className={cn("block xl:hidden", className)} {...props}>
      {children}
    </div>
  );
};

export { Panel };
export type { PanelProps };
