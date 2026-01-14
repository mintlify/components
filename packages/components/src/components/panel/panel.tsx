import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";

export interface PanelProps {
  /**
   * Content to display inside the panel.
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes to apply to the panel.
   */
  className?: string;
  /**
   * Optional ID for the panel element.
   */
  id?: string;
}

/**
 * Panel component that shows content on smaller screens and hides on xl screens.
 * Used for responsive layouts where content should only be visible on mobile/tablet.
 */
export function Panel({ children, className, id }: PanelProps) {
  return (
    <div
      className={cn(Classes.Panel, "block xl:hidden", className)}
      id={id}
      data-component-part="panel"
    >
      {children}
    </div>
  );
}
