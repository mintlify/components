import { IconLibrary, IconType } from '@/models';
import { ArrowUpRight } from 'lucide-react';
import React, {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  ReactNode,
  Ref,
} from 'react';

import { Classes } from '@/lib/local/selectors';
import { Icon as ComponentIcon } from '@/components/icon';
import { ArrowRightIcon } from '@/icons';
import { cn } from '@/utils/cn';
import { isRemoteUrl } from '@/utils/isRemoteUrl';

export function Card({
  title,
  icon,
  iconType,
  iconLibrary,
  color,
  horizontal,
  href,
  img,
  children,
  disabled,
  cta,
  arrow,
  as,
  className,
}: {
  title?: string;
  icon?: ReactNode | string;
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  color?: string;
  horizontal?: boolean;
  href?: string;
  img?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  cta?: string;
  arrow?: boolean;
  as?: ElementType;
  className?: string;
}) {
  const Icon =
    typeof icon === 'string' ? (
      <ComponentIcon
        icon={icon}
        iconType={iconType}
        iconLibrary={iconLibrary}
        color={color}
        className="h-6 w-6 !m-0 shrink-0"
        overrideColor={!!color}
      />
    ) : (
      icon
    );

  if (disabled) href = undefined;

  return (
    <GenericCard
      as={as}
      className={cn(href && 'hover:!border-primary dark:hover:!border-primary-light', className)}
      title={title}
      icon={Icon}
      img={img}
      horizontal={horizontal}
      href={href}
      cta={cta}
      arrow={arrow}
      disabled={disabled}
    >
      {children}
    </GenericCard>
  );
}

export interface CardPropsBase<T> {
  /**
   * Large title above children.
   */
  title?: string;
  /**
   * Icon to the top-left of the title. Can be a ReactNode or a string equal to an image source.
   */
  icon?: ReactNode;
  /**
   * Icon type for FontAwesome icons (e.g., "regular", "solid", "brands").
   */
  iconType?: IconType;
  /**
   * Icon library to use ("fontawesome" or "lucide"). Defaults to "fontawesome".
   */
  iconLibrary?: IconLibrary;
  /**
   * Custom color for the icon.
   */
  color?: string;
  /**
   * If provided, will render an image to the top of the card.
   */
  img?: string;
  /**
   * If provided, will render the card in a horizontal configuration.
   */
  horizontal?: boolean;
  /**
   * Type of element to be rendered.
   */
  as?: T;
  /**
   * If provided, will render as an anchor element.
   */
  href?: string;
  /**
   * Ref of the element to be rendered.
   */
  mRef?: Ref<T | undefined>;
  /**
   * Label for the action button.
   */
  cta?: string;
  /**
   * Enable the link arrow icon
   */
  arrow?: boolean;
  /**
   * Whether the card is disabled
   */
  disabled?: boolean;
}

/**
 * Props for the `Card` component
 * @typeParam T - Type of the Element rendered by the card.
 */
export type CardProps<T extends ElementType> = CardPropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardPropsBase<T>>;

export function GenericCard<T extends ElementType = 'div'>({
  title,
  icon,
  img,
  className,
  children,
  horizontal,
  arrow,
  as,
  mRef,
  cta,
  disabled,
  ...props
}: CardProps<T>) {
  /**
   * If provided, use `as` or an `a` tag if linking to things with href.
   * Defaults to `div`.
   */
  const Component = as || (props.href != undefined ? 'a' : 'div');

  const isExternalLink = isRemoteUrl(props.href ?? '');
  const newTabProps = isExternalLink ? { target: '_blank', rel: 'noreferrer' } : {};
  const shouldShowArrowIcon = arrow ?? isExternalLink;

  const isImageSrc: boolean = typeof icon === 'string';

  /**
   * Extract the image alt text from the image source.
   * Example:
   * - img = "https://raw.githubusercontent.com/mintlify/themes/main/quill/`images/setting-up.svg"
   * - imageAlt = "setting-up"
   */
  const imageAlt = img ? img.match(/\/([^/]+)\.[^.]+$/)?.[1] ?? '' : '';

  const renderIcon: JSX.Element = (
    <>
      {icon ? (
        isImageSrc ? (
          <img
            src={icon as string}
            alt={title}
            className="h-6 w-6 object-cover object-center"
            data-component-part="card-icon"
          />
        ) : (
          <div
            className="h-6 w-6 fill-gray-800 dark:fill-gray-100 text-gray-800 dark:text-gray-100"
            data-component-part="card-icon"
          >
            {icon}
          </div>
        )
      ) : null}
    </>
  );

  return (
    <Component
      className={cn(
        Classes.Card,
        'block font-normal group relative my-2 ring-2 ring-transparent rounded-2xl bg-white dark:bg-background-dark border border-gray-950/10 dark:border-white/10 overflow-hidden w-full',
        props.href && 'cursor-pointer',
        props.href && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light',
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<never>}
    >
      {img && (
        <img
          src={img}
          alt={imageAlt}
          className="w-full object-cover object-center not-prose"
          data-component-part="card-image"
        />
      )}
      <div
        className={cn('px-6 py-5 relative', horizontal && 'flex items-center gap-x-4')}
        data-component-part="card-content-container"
      >
        {props.href && (
          <div
            className={cn(
              'absolute text-gray-400 dark:text-gray-500 group-hover:text-primary dark:group-hover:text-primary-light top-5 right-5',
              !shouldShowArrowIcon && 'hidden'
            )}
            aria-hidden="true"
            data-component-part="card-arrow"
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        )}
        {renderIcon}
        <div className="min-w-0 flex-1">
          <h2
            className={cn(
              'not-prose font-semibold text-base text-gray-800 dark:text-white break-words',
              icon !== null && icon !== undefined && !horizontal && 'mt-4'
            )}
            contentEditable={false}
            data-component-part="card-title"
          >
            {title}
          </h2>
          <div
            className={cn(
              'prose mt-1 font-normal text-base leading-6 break-words',
              title ? 'text-gray-600 dark:text-gray-400' : 'text-gray-700 dark:text-gray-300',
              horizontal && 'leading-6 mt-0'
            )}
            data-component-part="card-content"
          >
            {children}
          </div>
          {cta && (
            <div className="mt-8" data-component-part="card-cta">
              <span
                className={cn(
                  'text-left text-gray-600 gap-2 dark:text-gray-400 text-sm font-medium flex flex-row items-center',
                  !disabled &&
                    'group-hover:text-primary group-hover:dark:text-primary-light',
                  disabled && 'opacity-50'
                )}
              >
                {cta}
                <ArrowRightIcon className="h-6" />
              </span>
            </div>
          )}
        </div>
      </div>
    </Component>
  );
}
