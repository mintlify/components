'use client';

import { createContext, useContext, useEffect, useRef, useState, useTransition, ReactNode } from 'react';

import { CheckIcon } from '@/icons';
import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';
import { copyToClipboard } from '@/utils/copyToClipboard';

import { Tooltip } from '../tooltip';

type ColorVariant = 'table' | 'compact';
type ColorTheme = 'light' | 'dark';

type ColorContextValue = {
  variant: ColorVariant;
  theme: ColorTheme;
};

const ColorContext = createContext<ColorContextValue>({
  variant: 'compact',
  theme: 'light',
});

type ColorProps = {
  children: ReactNode;
  variant?: ColorVariant;
  className?: string;
  /**
   * The current theme. Used to determine which color value to display
   * when `value` is an object with `light` and `dark` keys.
   * @default 'light'
   */
  theme?: ColorTheme;
};

const ColorRoot = ({ children, variant = 'compact', className, theme = 'light' }: ColorProps) => {
  return (
    <ColorContext.Provider value={{ variant, theme }}>
      <div
        data-variant={variant}
        className={cn(
          Classes.Color,
          'flex group',
          variant === 'table' && 'flex-col gap-6',
          variant === 'compact' && 'flex-row flex-wrap gap-x-2 gap-y-4',
          className
        )}
      >
        {children}
      </div>
    </ColorContext.Provider>
  );
};

type ColorRowProps = {
  children: ReactNode;
  title?: string;
  className?: string;
};

const ColorRow = ({ children, title, className }: ColorRowProps) => {
  return (
    <div
      data-component-part="row"
      className={cn(
        Classes.ColorRow,
        'flex flex-col gap-2 md:flex-row md:items-center',
        className
      )}
    >
      {!!title && (
        <div
          data-component-part="row-title-container"
          className="md:w-[120px] w-full flex-shrink-0"
        >
          <p
            data-component-part="row-title"
            className="text-sm font-medium [letter-spacing:-0.1px] text-gray-900 dark:text-gray-200 m-0 truncate"
            title={title}
          >
            {title}
          </p>
        </div>
      )}
      <div data-component-part="row-items" className="flex w-full gap-1 md:gap-2">
        {children}
      </div>
    </div>
  );
};

type ColorItemProps = {
  value: string | { light: string; dark: string };
  name?: string;
  className?: string;
};

const ColorItem = ({ name, value, className }: ColorItemProps) => {
  const [state, setState] = useState<'idle' | 'copied'>('idle');
  const [, startTransition] = useTransition();
  const { variant, theme } = useContext(ColorContext);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getCurrentColor = (): string => {
    if (typeof value === 'string') {
      return value;
    }
    return theme === 'dark' ? value.dark : value.light;
  };

  const currentColor = getCurrentColor();

  // Cleanup timeout on unmount to prevent memory leak and state updates on unmounted component
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    // Clear any existing timeout to prevent race condition on rapid clicks
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const result = await copyToClipboard(currentColor);
    if (result !== 'success') {
      return;
    }

    startTransition(() => {
      setState('copied');
    });

    timeoutRef.current = setTimeout(() => {
      startTransition(() => {
        setState('idle');
      });
    }, 2000);
  };

  const colorButton = (
    <button
      type="button"
      data-component-part="item-button"
      style={{ backgroundColor: currentColor }}
      onClick={handleCopy}
      className={cn(
        'cursor-copy relative flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
        variant === 'compact' && 'max-h-[104px] aspect-square',
        variant === 'table' && 'aspect-square w-full md:h-10'
      )}
      aria-label={
        state === 'copied'
          ? `Copied ${name || currentColor}`
          : `Copy color ${name || currentColor}`
      }
    >
      <CheckIcon
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto pointer-events-none transition-opacity duration-100 opacity-0',
          'text-white dark:text-white [filter:drop-shadow(0_0_2px_rgb(0_0_0_/_0.1))_drop-shadow(0_0_4px_rgb(0_0_0_/_0.1))]',
          state === 'copied' && 'opacity-100'
        )}
      />
    </button>
  );

  return (
    <div
      data-component-part="item"
      className={cn(
        Classes.ColorItem,
        variant === 'compact' && 'flex flex-col gap-2 flex-shrink-0',
        variant === 'table' && 'w-full max-w-[50px] md:max-w-[60px]',
        className
      )}
    >
      {variant === 'table' ? <Tooltip tip={currentColor}>{colorButton}</Tooltip> : colorButton}
      {variant === 'compact' && (
        <div
          data-component-part="item-info"
          className="flex flex-col gap-0.5 min-w-0 w-[104px]"
        >
          {name && (
            <p
              data-component-part="item-name"
              className="text-sm font-medium text-gray-900 dark:text-gray-200 m-0 truncate text-center"
              title={name}
            >
              {name}
            </p>
          )}
          <p
            data-component-part="item-value"
            className="text-xs text-gray-600 dark:text-gray-400 m-0 truncate font-mono text-center"
            title={currentColor}
          >
            {currentColor}
          </p>
        </div>
      )}
    </div>
  );
};

const Color = Object.assign(ColorRoot, {
  Row: ColorRow,
  Item: ColorItem,
});

export { Color };
export type { ColorProps, ColorRowProps, ColorItemProps, ColorVariant, ColorTheme };
