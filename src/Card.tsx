import { ReactNode } from "react";
import clsx from "clsx";
import isAbsoluteUrl from "is-absolute-url";

export function Card({
  title,
  icon,
  className,
  href,
  onClick,
  children,
}: {
  /** Large title above children */
  title?: string;

  /** Icon to the top-left of the title */
  icon?: ReactNode;

  /** Additional classes */
  className?: string;

  /** Link to make the entire card clickable */
  href?: string;

  /** Function to trigger when the card is clicked */
  onClick?: any;

  children?: ReactNode;
}) {
  return (
    <div
      className={clsx(
        "block not-prose font-normal group relative my-2 ring-2 ring-transparent rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden w-full",
        href && "cursor-pointer",
        !href && "px-6 py-5", // Padding is set in OptionalLink when we have a link so the entire Card is clickable
        className
      )}
      onClick={onClick}
    >
      <OptionalLink href={href}>
        {icon ? <div className="h-6 w-6">{icon}</div> : null}
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
      </OptionalLink>
    </div>
  );
}

function OptionalLink({
  href,
  children,
}: {
  href: string | undefined;
  children: any;
}) {
  if (!href) {
    return children;
  }

  const openLinksInNewTab = isAbsoluteUrl(href ?? "");
  const newTabProps = openLinksInNewTab
    ? { target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <a href={href} {...newTabProps} className="block px-6 py-5">
      {children}
    </a>
  );
}
