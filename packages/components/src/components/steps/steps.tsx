import type React from "react";
import { type ReactNode, useCallback, useEffect, useState } from "react";
import { type Rect, useRect } from "react-use-rect";
import { Icon } from "@/components/icon";
import { Classes } from "@/constants/selectors";
import { LinkIcon } from "@/icons";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import type { IconLibrary, IconType } from "@/utils/icon-utils";
import { STEP_TITLE_SIZES, type StepTitleSize } from "./constants";

type Numberish = number | `${number}`;

type StepsItemProps = {
  icon?: ReactNode | string;
  stepNumber?: Numberish;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  title: string | ReactNode;
  children?: string | ReactNode;
  titleSize?: StepTitleSize;
  className?: string;
  isLast?: boolean;
  id?: string;
  noAnchor?: boolean;
  scrollElementIntoView?: (id: string) => void;
  onCopyAnchorLink?: (id: string | undefined) => void;
  onRegisterHeading?: (id: string, rect: Rect) => void;
  onUnregisterHeading?: (id: string) => void;
  _hasContext?: boolean;
};

const StepsItem = ({
  stepNumber = 1,
  icon,
  iconType,
  iconLibrary,
  title,
  children,
  titleSize = "p",
  className,
  isLast = false,
  id,
  noAnchor = false,
  scrollElementIntoView,
  onRegisterHeading,
  onUnregisterHeading,
  _hasContext,
  onCopyAnchorLink,
}: StepsItemProps) => {
  const [rect, setRect] = useState<Rect | null>(null);
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const [rectRef] = useRect(setRect);

  const titleTag = STEP_TITLE_SIZES.includes(titleSize) ? titleSize : "p";
  const isAnchorEnabled = ["h2", "h3"].includes(titleTag);

  const copyAnchorLink = useCallback(async () => {
    if (!isAnchorEnabled || noAnchor || !id || typeof window === "undefined") {
      return;
    }

    const result = await copyToClipboard(
      `${window.location.href.split("#")[0]}#${encodeURIComponent(id)}`
    );

    if (result === "success") {
      window.location.hash = encodeURIComponent(id);
      onCopyAnchorLink?.(id);
    }
  }, [isAnchorEnabled, id, noAnchor, onCopyAnchorLink]);

  useEffect(() => {
    if (!(_hasContext && id && rect)) {
      return;
    }

    onRegisterHeading?.(id, rect);

    return () => {
      onUnregisterHeading?.(id);
    };
  }, [rect, id, _hasContext, onRegisterHeading, onUnregisterHeading]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scrolling should only happen once, on initial load
  useEffect(() => {
    if (!id || noAnchor) {
      return;
    }

    const hash = decodeURIComponent(window.location.hash.substring(1));

    if (hash === id) {
      scrollElementIntoView?.(id);
    }
  }, []);

  const toggleAnchor = useCallback(
    (shown: boolean) => {
      if (!isAnchorEnabled || noAnchor || !id) {
        return;
      }

      setIsTitleHovered(shown);
    },
    [isAnchorEnabled, noAnchor, id]
  );

  const interactionProps = {
    onMouseEnter: () => toggleAnchor(true),
    onMouseLeave: () => toggleAnchor(false),
    onClick: copyAnchorLink,
  };

  const transformedIconOrNumber =
    typeof icon === "string" ? (
      <Icon
        className="size-3 bg-stone-900 dark:bg-stone-50"
        icon={icon}
        iconLibrary={iconLibrary}
        iconType={iconType}
        overrideColor
        overrideSize
      />
      // biome-ignore lint/style/noNestedTernary: TODO
    ) : icon == null ? (
      Number(stepNumber)
    ) : (
      icon
    );

  return (
    // biome-ignore lint/a11y/useSemanticElements: TODO
    <div
      className={cn(
        Classes.Step,
        "group/step relative flex items-start pb-5",
        className
      )}
      data-component-part="step-item"
      id={id}
      ref={rectRef}
      role="listitem"
    >
      <div
        className={cn(
          "absolute top-11 h-[calc(100%-2.75rem)] w-px",
          isLast
            ? 'bg-linear-to-b from-stone-200 via-80% via-stone-200 to-transparent group-has-[[data-component-part="step-content"]:empty]/step:hidden dark:from-white/10 dark:via-white/10'
            : "bg-stone-200/70 dark:bg-white/10"
        )}
        contentEditable={false}
        data-component-part="step-line"
      />
      <div
        className="absolute ml-[-13px] py-2"
        contentEditable={false}
        data-component-part="step-number"
      >
        {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: TODO */}
        {/** biome-ignore lint/a11y/noStaticElementInteractions: TODO */}
        <div
          className="relative flex size-7 shrink-0 items-center justify-center rounded-full bg-stone-50 font-semibold text-stone-900 text-xs dark:bg-white/10 dark:text-stone-50"
          onMouseEnter={() => toggleAnchor(true)}
          onMouseLeave={() => toggleAnchor(false)}
        >
          <div className={cn(isTitleHovered && "opacity-0")}>
            {transformedIconOrNumber}
          </div>
          {!noAnchor && id && (
            <div
              className="absolute"
              data-component-part="step-number-anchor-link"
            >
              <a
                aria-label="Navigate to header"
                className={cn(
                  "flex items-center border-0 opacity-0",
                  isTitleHovered && "opacity-100"
                )}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  copyAnchorLink();
                }}
              >
                <div className="flex size-6 items-center justify-center">
                  <LinkIcon />
                </div>
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="w-full overflow-hidden pr-px pl-8">
        {!!title &&
          (() => {
            const titleClasses = "mt-2 text-stone-900 dark:text-stone-200";
            const titleProps = {
              contentEditable: false,
              "data-component-part": "step-title",
            };
            return {
              p: (
                <p
                  className={cn(
                    titleClasses,
                    "prose dark:prose-invert font-semibold"
                  )}
                  {...titleProps}
                  {...interactionProps}
                >
                  {title}
                </p>
              ),
              h2: (
                <h2
                  className={titleClasses}
                  {...titleProps}
                  {...interactionProps}
                >
                  {title}
                </h2>
              ),
              h3: (
                <h3
                  className={titleClasses}
                  {...titleProps}
                  {...interactionProps}
                >
                  {title}
                </h3>
              ),
              h4: (
                <h4
                  className={titleClasses}
                  {...titleProps}
                  {...interactionProps}
                >
                  {title}
                </h4>
              ),
            }[titleTag];
          })()}
        <div
          className={cn("prose dark:prose-invert", !title && "mt-2")}
          data-component-part="step-content"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

type StepsProps = {
  children:
    | React.ReactElement<StepsItemProps>
    | React.ReactElement<StepsItemProps>[];
  titleSize?: StepTitleSize;
  className?: string;
};

const Steps = ({ children, titleSize, className }: StepsProps) => {
  const childArray = (Array.isArray(children) ? children : [children]).filter(
    Boolean
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: TODO
    <div
      className={cn(Classes.Steps, "mt-10 mb-6 ml-3.5", className)}
      data-component-part="steps"
      role="list"
    >
      {childArray.map(({ props }, index) => (
        <StepsItem
          // biome-ignore lint/suspicious/noArrayIndexKey: TODO
          key={`step-${index}`}
          {...props}
          isLast={index === childArray.length - 1}
          stepNumber={props.stepNumber ?? index + 1}
          titleSize={props.titleSize ?? titleSize}
        />
      ))}
    </div>
  );
};

Steps.Item = StepsItem;

export { Steps };
export type { StepsItemProps, StepsProps };
