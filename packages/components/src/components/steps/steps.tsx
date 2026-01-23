import type React from "react";
import type { ReactNode } from "react";
import { Icon } from "@/components/icon";
import { Classes } from "@/constants/selectors";
import type { IconLibrary, IconType } from "@/models";
import { cn } from "@/utils/cn";
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
}: StepsItemProps) => {
  const titleTag = STEP_TITLE_SIZES.includes(titleSize) ? titleSize : "p";

  const transformedIconOrNumber =
    typeof icon === "string" ? (
      <Icon
        className="size-3 bg-gray-900 dark:bg-gray-50"
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
      role="listitem"
    >
      <div
        className={cn(
          "absolute top-11 h-[calc(100%-2.75rem)] w-px",
          isLast
            ? 'bg-linear-to-b from-gray-200 via-80% via-gray-200 to-transparent group-has-[[data-component-part="step-content"]:empty]/step:hidden dark:from-white/10 dark:via-white/10'
            : "bg-gray-200/70 dark:bg-white/10"
        )}
        contentEditable={false}
        data-component-part="step-line"
      />
      <div
        className="absolute ml-[-13px] py-2"
        contentEditable={false}
        data-component-part="step-number"
      >
        <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gray-50 font-semibold text-gray-900 text-xs dark:bg-white/10 dark:text-gray-50">
          {transformedIconOrNumber}
        </div>
      </div>
      <div className="w-full overflow-hidden pr-px pl-8">
        {!!title &&
          (() => {
            const titleClasses = "mt-2 text-gray-900 dark:text-gray-200";
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
                >
                  {title}
                </p>
              ),
              h2: (
                <h2 className={titleClasses} {...titleProps}>
                  {title}
                </h2>
              ),
              h3: (
                <h3 className={titleClasses} {...titleProps}>
                  {title}
                </h3>
              ),
              h4: (
                <h4 className={titleClasses} {...titleProps}>
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
