import clsx from 'clsx';
import isAbsoluteUrl from 'is-absolute-url';
import React, { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react';

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
   * If provided, will render an image to the top of the card.
   */
  image?: string;
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
}

/**
 * Props for the `Card` component
 * @typeParam T - Type of the Element rendered by the card.
 */
export type CardProps<T extends ElementType> = CardPropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardPropsBase<T>>;

export function Card<T extends ElementType = 'div'>({
  title,
  icon,
  image,
  className,
  children,
  as,
  mRef,
  ...props
}: CardProps<T>) {
  /**
   * If provided, use `as` or an `a` tag if linking to things with href.
   * Defaults to `div`.
   */
  const Component = as || props.href != undefined ? 'a' : 'div';

  const openLinksInNewTab = isAbsoluteUrl(props.href ?? '');
  const newTabProps = openLinksInNewTab ? { target: '_blank', rel: 'noreferrer' } : {};

  const isImageSrc: boolean = typeof icon === 'string';

  const renderIcon: JSX.Element = (
    <>
      {icon ? (
        isImageSrc ? (
          <img src={icon as string} alt={title} className="h-6 w-6 object-cover object-center" />
        ) : (
          <div className="h-6 w-6 fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100">
            {icon}
          </div>
        )
      ) : null}
    </>
  );

  return (
    <Component
      className={clsx(
        'block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden w-full',
        props.href && 'cursor-pointer',
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<never>}
    >
      {image && <img src={image} alt={image} className="w-full h-64 object-cover object-center" />}
      <div className="px-6 py-5">
        {renderIcon}
        <h2
          className={clsx(
            'font-semibold text-base text-slate-800 dark:text-white',
            icon !== null && icon !== undefined && 'mt-4'
          )}
        >
          {title}
        </h2>
        <span
          className={clsx(
            'mt-1 font-normal',
            title ? 'text-slate-600 dark:text-slate-400' : 'text-slate-700 dark:text-slate-300'
          )}
        >
          {children}
        </span>
      </div>
    </Component>
  );
}
