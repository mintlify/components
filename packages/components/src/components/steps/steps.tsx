import React, { ReactNode } from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon } from '@/components/icon';
import { cn } from '@/utils/cn';
import { IconLibrary, IconType } from '@/models';
import { stepTitleSizes, StepTitleSize } from './constants';

type Numberish = number | `${number}`;

export type StepsItemProps = {
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
        className="size-3 bg-gray-900 dark:bg-gray-50"
        overrideColor
        overrideSize
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
            ? 'bg-gradient-to-b from-gray-200 via-gray-200 via-80% to-transparent dark:from-white/10 dark:via-white/10 group-has-[[data-component-part="step-content"]:empty]/step:hidden'
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
          (() => {
            const titleClasses = 'mt-2 text-gray-900 dark:text-gray-200';
            const titleProps = { contentEditable: false, 'data-component-part': 'step-title' };
            return {
              p: (
                <p className={cn(titleClasses, 'font-semibold prose dark:prose-invert')} {...titleProps}>
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
  children: React.ReactElement<StepsItemProps> | React.ReactElement<StepsItemProps>[];
  titleSize?: StepTitleSize;
  className?: string;
};

export const Steps = ({ children, titleSize, className }: StepsProps) => {
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
