'use client';

import { ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { IconLibrary, IconType } from '@/models';

type Numberish = number | `${number}`;

export const stepTitleSizes = ['p', 'h2', 'h3', 'h4'] as const;
export type StepTitleSize = (typeof stepTitleSizes)[number];

export type StepsItemProps = {
  /**
   * The icon for the step. Defaults to the step number, but can also accept an Icon string or ReactNode.
   */
  icon?: ReactNode | string;
  /**
   * The number of the step. Defaults to 1.
   */
  stepNumber?: Numberish;
  /**
   * Determines the icon type. Defaults to `regular`.
   */
  iconType?: IconType;
  /**
   * Determines the icon library. Defaults to `fontawesome`.
   */
  iconLibrary?: IconLibrary;
  /**
   * The title is the primary text for the step and shows up next to the indicator.
   */
  title: string | ReactNode;
  /**
   * The content of the step.
   */
  children?: string | ReactNode;
  /**
   * The size of the step title. Defaults to p.
   */
  titleSize?: StepTitleSize;
  /**
   * Additional CSS classes for the step item.
   */
  className?: string;
  /**
   * Internal: Used to mark whether the index is the last index
   */
  isLast?: boolean;
};

const StepsItem = ({
  stepNumber = 1,
  icon,
  iconType,
  iconLibrary,
  title,
  children,
  titleSize = 'p',
  className,
  isLast = false,
}: StepsItemProps) => {
  const titleTag = stepTitleSizes.includes(titleSize) ? titleSize : 'p';

  const transformedIconOrNumber =
    typeof icon === 'string' ? (
      <Icon
        icon={icon}
        iconType={iconType}
        iconLibrary={iconLibrary}
        className="h-3 w-3 bg-gray-900 dark:bg-gray-50"
        overrideColor
      />
    ) : icon == null ? (
      Number(stepNumber)
    ) : (
      icon
    );

  return (
    <div
      role="listitem"
      className={cn(Classes.Step, 'group/step relative flex items-start pb-5', className)}
      data-component-part="step-item"
    >
      <div
        data-component-part="step-line"
        className={cn(
          'absolute w-px h-[calc(100%-2.75rem)] top-[2.75rem]',
          isLast
            ? 'bg-transparent bg-gradient-to-b from-gray-200 dark:from-white/10 via-80% to-transparent group-has-[[data-component-part="step-content"]:empty]/step:hidden'
            : 'bg-gray-200/70 dark:bg-white/10'
        )}
        contentEditable={false}
      ></div>
      <div
        className="absolute ml-[-13px] py-2"
        data-component-part="step-number"
        contentEditable={false}
      >
        <div className="size-7 shrink-0 rounded-full bg-gray-50 dark:bg-white/10 text-xs text-gray-900 dark:text-gray-50 font-semibold flex items-center justify-center">
          {transformedIconOrNumber}
        </div>
      </div>
      <div className="w-full overflow-hidden pl-8 pr-px">
        {!!title &&
          {
            p: (
              <p
                className="mt-2 font-semibold prose dark:prose-invert text-gray-900 dark:text-gray-200"
                contentEditable={false}
                data-component-part="step-title"
              >
                {title}
              </p>
            ),
            h2: (
              <h2 className="mt-2" contentEditable={false} data-component-part="step-title">
                {title}
              </h2>
            ),
            h3: (
              <h3 className="mt-2" contentEditable={false} data-component-part="step-title">
                {title}
              </h3>
            ),
            h4: (
              <h4 className="mt-2" contentEditable={false} data-component-part="step-title">
                {title}
              </h4>
            ),
          }[titleTag]}
        <div
          data-component-part="step-content"
          className={cn('prose dark:prose-invert', !title && 'mt-2')}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export type StepsProps = {
  /**
   * One or more `Steps.Item` components.
   */
  children: React.ReactElement<StepsItemProps> | React.ReactElement<StepsItemProps>[];
  /**
   * The size of the step title. Defaults to h3.
   */
  titleSize?: StepTitleSize;
  /**
   * Additional CSS classes for the Steps container.
   */
  className?: string;
};

export const Steps = ({ children, titleSize, className }: StepsProps) => {
  // Filter out falsy children (null, undefined, false) that can come from conditional rendering
  const childArray = (Array.isArray(children) ? children : [children]).filter(Boolean);

  return (
    <div
      role="list"
      className={cn(Classes.Steps, 'ml-3.5 mt-10 mb-6', className)}
      data-component-part="steps"
    >
      {childArray.map(({ props }, index) => (
        <StepsItem
          key={`step-${index}`}
          {...props}
          stepNumber={props.stepNumber ?? index + 1}
          {...(titleSize && { titleSize })}
          isLast={index === childArray.length - 1}
        />
      ))}
    </div>
  );
};

Steps.Item = StepsItem;

export type { StepsItemProps as StepProps };
