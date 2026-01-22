import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  RotateCcwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import type { ComponentProps } from "react";

import { cn } from "@/utils/cn";
import type { MermaidPlacement } from "./mermaid";

const Button = ({
  children,
  className,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={cn(
        "flex size-7 cursor-pointer touch-manipulation items-center justify-center rounded-md border border-gray-200 bg-white text-gray-900 transition-[transform] duration-100 hover:bg-gray-50 motion-safe:active:scale-95 dark:border-white/10 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 [&_svg]:size-4",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};

type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onPan: (dx: number, dy: number) => void;
  panStep: number;
  placement?: MermaidPlacement;
};

const ZoomControls = ({
  onZoomIn,
  onZoomOut,
  onReset,
  onPan,
  panStep,
  placement,
}: ZoomControlsProps) => {
  return (
    // biome-ignore lint/a11y/useSemanticElements: TODO
    <div
      aria-label="Diagram zoom and pan controls"
      className={cn(
        "absolute z-10 grid grid-cols-3 gap-1",
        placement === "top-left" && "top-2 left-2",
        placement === "top-right" && "top-2 right-2",
        placement === "bottom-left" && "bottom-2 left-2",
        placement === "bottom-right" && "right-2 bottom-2"
      )}
      data-component-part="zoom-controls"
      role="group"
    >
      <div aria-hidden="true" className="pointer-events-none" />

      <Button
        aria-label="Pan up"
        onClick={() => onPan(0, panStep)}
        title="Pan up"
      >
        <ChevronUpIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Zoom in" onClick={onZoomIn} title="Zoom in">
        <ZoomInIcon aria-hidden="true" />
      </Button>

      <Button
        aria-label="Pan left"
        onClick={() => onPan(panStep, 0)}
        title="Pan left"
      >
        <ChevronLeftIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Reset view" onClick={onReset} title="Reset view">
        <RotateCcwIcon aria-hidden="true" />
      </Button>
      <Button
        aria-label="Pan right"
        onClick={() => onPan(-panStep, 0)}
        title="Pan right"
      >
        <ChevronRightIcon aria-hidden="true" />
      </Button>

      <div aria-hidden="true" className="pointer-events-none" />

      <Button
        aria-label="Pan down"
        onClick={() => onPan(0, -panStep)}
        title="Pan down"
      >
        <ChevronDownIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Zoom out" onClick={onZoomOut} title="Zoom out">
        <ZoomOutIcon aria-hidden="true" />
      </Button>
    </div>
  );
};

export { ZoomControls };
export type { ZoomControlsProps };
