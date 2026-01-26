import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Rect, useRect } from "react-use-rect";
import { Classes } from "@/constants/selectors";
import { LinkIcon } from "@/icons";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy-to-clipboard";

type UpdatePropsBase = {
  id: string;
  label: string;
  description?: string;
  tags?: string[];
  rss?: {
    title?: string;
    description?: string;
  };
  onRegisterHeading?: (id: string, rect: Rect) => void;
  onUnregisterHeading?: (id: string) => void;
  hasContext?: boolean;
  isVisible: boolean;
  onCopyAnchorLink?: (id: string) => void;
};

type UpdateProps = UpdatePropsBase &
  Omit<ComponentPropsWithoutRef<"div">, keyof UpdatePropsBase>;

const Update = forwardRef<HTMLDivElement, UpdateProps>(
  (
    {
      children,
      label,
      id,
      description,
      tags,
      className,
      "aria-label": ariaLabel = "Navigate to changelog",
      onRegisterHeading,
      onUnregisterHeading,
      hasContext,
      isVisible,
      onCopyAnchorLink,
      ...props
    },
    ref
  ) => {
    const [rect, setRect] = useState<Rect | null>(null);
    const [rectRef] = useRect(setRect);
    const tagsArray = useMemo(
      () => [...new Set((tags ?? []).map((tag) => tag.trim()).filter(Boolean))],
      [tags]
    );

    const copyAnchorLink = useCallback(async () => {
      if (typeof window === "undefined") {
        return;
      }

      const result = await copyToClipboard(
        `${window.location.href.split("#")[0]}#${encodeURIComponent(id)}`
      );

      if (result === "success") {
        window.location.hash = encodeURIComponent(id);
        onCopyAnchorLink?.(id);
      }
    }, [id, onCopyAnchorLink]);

    useEffect(() => {
      if (!(hasContext && isVisible && rect)) {
        return;
      }

      onRegisterHeading?.(id, rect);

      return () => {
        onUnregisterHeading?.(id);
      };
    }, [
      rect,
      id,
      hasContext,
      isVisible,
      onRegisterHeading,
      onUnregisterHeading,
    ]);

    if (!isVisible) {
      return null;
    }

    return (
      <div
        className={cn(
          Classes.Update,
          "update-container relative flex w-full flex-col items-start gap-2 py-8 lg:flex-row lg:gap-6",
          className
        )}
        id={id}
        ref={ref}
        {...props}
      >
        <div className="group top-(--scroll-mt) flex w-full shrink-0 flex-col items-start justify-start lg:sticky lg:w-[160px]">
          <div className="absolute">
            <a
              aria-label={ariaLabel}
              className="group/link -ml-10 flex items-center border-0 opacity-0 focus:opacity-100 focus:outline-0 group-hover:opacity-100"
              href={`#${encodeURIComponent(id)}`}
            >
              &#8203;
              <div className="flex size-6 items-center justify-center rounded-md bg-white text-stone-400 shadow-sm ring-1 ring-stone-400/30 hover:ring-stone-400/60 group-focus/link:border-2 group-focus/link:border-primary dark:bg-background-dark dark:text-white/50 dark:ring-1 dark:ring-stone-700/25 dark:brightness-[1.35] dark:group-focus/link:border-primary-light dark:hover:ring-white/20 dark:hover:brightness-150">
                <LinkIcon />
              </div>
            </a>
          </div>
          {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: TODO */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: TODO */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
          <div
            className="flex grow-0 cursor-pointer items-center justify-center rounded-lg bg-primary/10 px-2 py-1 font-medium text-primary text-sm dark:text-primary-light"
            contentEditable={false}
            data-component-part="update-label"
            onClick={copyAnchorLink}
          >
            {label}
          </div>
          {tagsArray.length > 0 && (
            <div
              className="mt-3 flex flex-wrap gap-2 px-1 text-secondary text-sm dark:text-secondary-light"
              data-component-part="update-tag-list"
            >
              {tagsArray.map((tag) => (
                <span
                  className="inline-block rounded-lg font-medium text-sm"
                  data-component-part="update-tag"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          {description && (
            <div
              className="wrap-break-word mt-3 max-w-[160px] px-1 text-secondary text-sm dark:text-secondary-light"
              contentEditable={false}
              data-component-part="update-description"
            >
              {description}
            </div>
          )}
        </div>

        <div className="max-w-full flex-1 overflow-hidden px-0.5" ref={rectRef}>
          <div className="prose-sm" data-component-part="update-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Update.displayName = "Update";

export { Update };
export type { UpdateProps };
