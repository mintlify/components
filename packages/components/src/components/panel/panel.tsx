import type { ComponentProps } from "react";
import { cn } from "@/utils/cn";

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
