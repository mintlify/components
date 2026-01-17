import { ComponentProps } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  RotateCcwIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from 'lucide-react';

import { cn } from '@/utils/cn';

const Button = ({ children, className, ...props }: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className={cn(
        'flex items-center [&_svg]:size-4 justify-center size-7 rounded-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 transition-[transform] duration-100 motion-safe:active:scale-95 cursor-pointer touch-manipulation',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export type ZoomControlsProps = {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  onPan: (dx: number, dy: number) => void;
  panStep: number;
};

export const ZoomControls = ({ onZoomIn, onZoomOut, onReset, onPan, panStep }: ZoomControlsProps) => {
  return (
    <div
      className="absolute bottom-2 right-2 z-10 grid grid-cols-3 gap-1"
      data-component-part="zoom-controls"
      role="group"
      aria-label="Diagram zoom and pan controls"
    >
      <div aria-hidden="true" className="pointer-events-none" />

      <Button aria-label="Pan up" title="Pan up" onClick={() => onPan(0, panStep)}>
        <ChevronUpIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Zoom in" title="Zoom in" onClick={onZoomIn}>
        <ZoomInIcon aria-hidden="true" />
      </Button>

      <Button aria-label="Pan left" title="Pan left" onClick={() => onPan(panStep, 0)}>
        <ChevronLeftIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Reset view" title="Reset view" onClick={onReset}>
        <RotateCcwIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Pan right" title="Pan right" onClick={() => onPan(-panStep, 0)}>
        <ChevronRightIcon aria-hidden="true" />
      </Button>

      <div aria-hidden="true" className="pointer-events-none" />

      <Button aria-label="Pan down" title="Pan down" onClick={() => onPan(0, -panStep)}>
        <ChevronDownIcon aria-hidden="true" />
      </Button>
      <Button aria-label="Zoom out" title="Zoom out" onClick={onZoomOut}>
        <ZoomOutIcon aria-hidden="true" />
      </Button>
    </div>
  );
};
