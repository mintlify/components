import { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from "react";
import clsx from "clsx";
import isAbsoluteUrl from "is-absolute-url";

export interface CardPropsBase<T> {
  /**
   * Large title above children.
   */
  title?: string;
  /**
   * Icon to the top-left of the title.
   */
  icon?: ReactNode;
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
  mRef?: Ref<T>;
}

/**
 * Props for the `Card` component
 * @typeParam T - Type of the Element rendered by the card.
 */
export type CardProps<T extends ElementType> = CardPropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardPropsBase<T>>;

export function Card<T extends ElementType = "div">({
  title,
  icon,
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
  const Component = as || props.href != undefined ? "a" : "div";

  const openLinksInNewTab = isAbsoluteUrl(props.href ?? "");
  const newTabProps = openLinksInNewTab
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Component
      className={clsx(
        "block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden px-6 py-5 w-full",
        props.href && "cursor-pointer",
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<any>}
    >
      {icon ? (
        <div className="h-6 w-6 fill-slate-800 dark:fill-slate-100 text-slate-800 dark:text-slate-100">
          {icon}
        </div>
      ) : null}
      <h2
        className={clsx(
          "font-semibold text-base text-slate-800 dark:text-white",
          icon !== null && icon !== undefined && "mt-4"
        )}
      >
        {title}
      </h2>
      <span
        className={clsx(
          "mt-1 font-normal",
          title
            ? "text-slate-600 dark:text-slate-400"
            : "text-slate-700 dark:text-slate-300"
        )}
      >
        {children}
      </span>
    </Component>
  );
}
