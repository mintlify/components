import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme";
import { CheckIcon } from "@/icons";
import { Classes } from "@/lib/local/selectors";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { Tooltip } from "../tooltip";
import type { ColorVariant } from "./constants";

type ColorProps = {
  children: React.ReactNode;
  variant: ColorVariant;
  className?: string;
};

const ColorContext = createContext<ColorVariant>("compact");

const Color = ({ children, variant, className }: ColorProps) => {
  return (
    <ColorContext.Provider value={variant}>
      <div
        className={cn(
          Classes.Color,
          "group flex py-6",
          variant === "table" && "flex-col gap-6",
          variant === "compact" && "flex-row flex-wrap gap-x-2 gap-y-4",
          className
        )}
        data-variant={variant}
      >
        {children}
      </div>
    </ColorContext.Provider>
  );
};

type ColorRowProps = {
  children: React.ReactNode;
  title?: string;
};

const ColorRow = ({ children, title }: ColorRowProps) => {
  return (
    <div
      className={cn(
        Classes.ColorRow,
        "flex flex-col gap-2 md:flex-row md:items-center"
      )}
    >
      {!!title && (
        <div
          className="w-full shrink-0 md:w-[120px]"
          data-component-part="color-row-title-container"
        >
          <p
            className="m-0 truncate font-medium text-gray-900 text-sm tracking-[-0.1px] dark:text-gray-200"
            data-component-part="color-row-title"
            title={title}
          >
            {title}
          </p>
        </div>
      )}
      <div
        className="flex w-full gap-1 md:gap-2"
        data-component-part="color-row-items-container"
      >
        {children}
      </div>
    </div>
  );
};

/** @deprecated Use a single string value instead */
type ColorItemValueLegacy = { light: string; dark: string };

type ColorItemProps = {
  value: string | ColorItemValueLegacy;
  name?: string;
};

const ColorItem = ({ name, value }: ColorItemProps) => {
  const [state, setState] = useState<"idle" | "copied">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDarkTheme } = useIsDarkTheme();
  const variant = useContext(ColorContext);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getCurrentColor = (): string => {
    if (typeof value === "string") {
      return value;
    }

    const theme = isDarkTheme ? "dark" : "light";

    return value[theme];
  };

  const currentColor = getCurrentColor();

  const handleCopy = async () => {
    const result = await copyToClipboard(currentColor);

    if (result === "error") {
      return;
    }

    setState("copied");

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => setState("idle"), 2000);
  };

  const colorButton = (
    <button
      aria-label={name || `Color ${currentColor}`}
      aria-pressed={state === "copied"}
      aria-roledescription={state === "copied" ? "Copied" : "Copy"}
      className={cn(
        "relative flex cursor-copy items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800",
        variant === "compact" && "aspect-square max-h-[104px]",
        variant === "table" && "aspect-square w-full md:h-10"
      )}
      data-component-part="color-item-button"
      onClick={handleCopy}
      style={{ backgroundColor: currentColor }}
      type="button"
    >
      <CheckIcon
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 m-auto opacity-0 transition-opacity duration-100",
          "filter-[drop-shadow(0_0_2px_rgb(0_0_0/0.1))_drop-shadow(0_0_4px_rgb(0_0_0/0.1))] text-white dark:text-white",
          state === "copied" && "opacity-100"
        )}
      />
    </button>
  );

  return (
    <div
      className={cn(
        Classes.ColorItem,
        variant === "compact" && "flex shrink-0 flex-col gap-2",
        variant === "table" && "w-full max-w-[50px] md:max-w-[60px]"
      )}
    >
      {variant === "table" ? (
        <Tooltip title={currentColor}>{colorButton}</Tooltip>
      ) : (
        colorButton
      )}
      {variant === "compact" && (
        <div className="flex w-[104px] min-w-0 flex-col gap-0.5">
          {name && (
            <p
              className="m-0 truncate text-center font-medium text-gray-900 text-sm dark:text-gray-200"
              data-component-part="color-item-name"
              title={name}
            >
              {name}
            </p>
          )}
          <p
            className="m-0 truncate text-center font-mono text-gray-600 text-xs dark:text-gray-400"
            data-component-part="color-item-value"
            title={currentColor}
          >
            {currentColor}
          </p>
        </div>
      )}
    </div>
  );
};

Color.Row = ColorRow;
Color.Item = ColorItem;

export { Color };
