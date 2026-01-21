import { CheckIcon } from "@/icons"
import { Classes } from "@/lib/local/selectors"
import { cn } from "@/utils/cn"
import { copyToClipboard } from "@/utils/copyToClipboard"
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { Tooltip } from "../tooltip"
import { useIsDarkTheme } from "@/hooks/useIsDarkTheme"

type ColorVariant = "table" | "compact"

type ColorProps = {
  children: React.ReactNode
  variant: ColorVariant
  className?: string
}

const ColorContext = createContext<ColorVariant>("compact")

const Color = ({ children, variant, className }: ColorProps) => {
  return (
    <ColorContext.Provider value={variant}>
      <div
        data-variant={variant}
        className={cn(
          Classes.Color,
          "flex group py-6",
          variant === "table" && "flex-col gap-6",
          variant === "compact" && "flex-row flex-wrap gap-x-2 gap-y-4",
          className
        )}
      >
        {children}
      </div>
    </ColorContext.Provider>
  )
}

type ColorRowProps = {
  children: React.ReactNode
  title?: string
}

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
          className="md:w-[120px] w-full shrink-0"
          data-component-part="color-row-title-container"
        >
          <p
            className="text-sm font-medium tracking-[-0.1px] text-gray-900 dark:text-gray-200 m-0 truncate"
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
  )
}

/** @deprecated Use a single string value instead */
type ColorItemValueLegacy = { light: string; dark: string }

type ColorItemProps = {
  value: string | ColorItemValueLegacy
  name?: string
}

const ColorItem = ({ name, value }: ColorItemProps) => {
  const [state, setState] = useState<"idle" | "copied">("idle")
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { isDarkTheme } = useIsDarkTheme()
  const variant = useContext(ColorContext)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const getCurrentColor = (): string => {
    if (typeof value === "string") {
      return value
    }

    const theme = isDarkTheme ? "dark" : "light"

    return value[theme]
  }

  const currentColor = getCurrentColor()

  const handleCopy = async () => {
    const result = await copyToClipboard(currentColor)
    if (result === "error") return

    setState("copied")

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => setState("idle"), 2000)
  }

  const colorButton = (
    <button
      style={{ backgroundColor: currentColor }}
      onClick={handleCopy}
      className={cn(
        "cursor-copy relative flex items-center justify-center rounded-lg border border-neutral-200 dark:border-neutral-800",
        variant === "compact" && "max-h-[104px] aspect-square",
        variant === "table" && "aspect-square w-full md:h-10"
      )}
      aria-label={name || `Color ${currentColor}`}
      aria-pressed={state === "copied"}
      aria-roledescription={state === "copied" ? "Copied" : "Copy"}
      data-component-part="color-item-button"
    >
      <CheckIcon
        aria-hidden
        className={cn(
          "absolute inset-0 m-auto pointer-events-none transition-opacity duration-100 opacity-0",
          "text-white dark:text-white filter-[drop-shadow(0_0_2px_rgb(0_0_0/0.1))_drop-shadow(0_0_4px_rgb(0_0_0/0.1))]",
          state === "copied" && "opacity-100"
        )}
      />
    </button>
  )

  return (
    <div
      className={cn(
        Classes.ColorItem,
        variant === "compact" && "flex flex-col gap-2 shrink-0",
        variant === "table" && "w-full max-w-[50px] md:max-w-[60px]"
      )}
    >
      {variant === "table" ? (
        <Tooltip title={currentColor}>{colorButton}</Tooltip>
      ) : (
        colorButton
      )}
      {variant === "compact" && (
        <div className="flex flex-col gap-0.5 min-w-0 w-[104px]">
          {name && (
            <p
              className="text-sm font-medium text-gray-900 dark:text-gray-200 m-0 truncate text-center"
              title={name}
              data-component-part="color-item-name"
            >
              {name}
            </p>
          )}
          <p
            className="text-xs text-gray-600 dark:text-gray-400 m-0 truncate font-mono text-center"
            title={currentColor}
            data-component-part="color-item-value"
          >
            {currentColor}
          </p>
        </div>
      )}
    </div>
  )
}

Color.Row = ColorRow
Color.Item = ColorItem

export { Color }
