/** biome-ignore-all lint/complexity/noExcessiveCognitiveComplexity: TODO */
import { ArrowUpRight } from "lucide-react";
import type React from "react";
import type {
  ComponentPropsWithoutRef,
  ElementType,
  JSX,
  ReactNode,
  Ref,
} from "react";
import { Icon as ComponentIcon } from "@/components/icon";
import { ArrowRightIcon } from "@/icons";
import { Classes } from "@/lib/local/selectors";
import type { IconLibrary, IconType } from "@/models";
import { cn } from "@/utils/cn";
import { isRemoteUrl } from "@/utils/is-remote-url";

interface CardPropsBase<T> {
  title?: string;
  icon?: ReactNode;
  img?: string;
  horizontal?: boolean;
  as?: T;
  href?: string;
  mRef?: Ref<T | undefined>;
  cta?: string;
  arrow?: boolean;
  disabled?: boolean;
}

type CardProps<T extends ElementType> = CardPropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof CardPropsBase<T>>;

interface CardIconProps {
  iconType?: IconType;
  iconLibrary?: IconLibrary;
  color?: string;
}

type CardComponentProps = Pick<
  CardPropsBase<ElementType>,
  "title" | "horizontal" | "href" | "img" | "disabled" | "cta" | "arrow" | "as"
> &
  CardIconProps & {
    icon?: ReactNode | string;
    children?: React.ReactNode;
    className?: string;
  };

const Card = ({
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
}: CardComponentProps) => {
  const Icon =
    typeof icon === "string" ? (
      <ComponentIcon
        className="m-0! h-6 w-6 shrink-0"
        color={color}
        icon={icon}
        iconLibrary={iconLibrary}
        iconType={iconType}
        overrideColor={!!color}
      />
    ) : (
      icon
    );

  const resolvedHref = disabled ? undefined : href;

  return (
    <GenericCard
      arrow={arrow}
      as={as}
      className={cn(
        resolvedHref &&
          "hover:border-primary! dark:hover:border-primary-light!",
        className
      )}
      cta={cta}
      disabled={disabled}
      horizontal={horizontal}
      href={resolvedHref}
      icon={Icon}
      img={img}
      title={title}
    >
      {children}
    </GenericCard>
  );
};

const GenericCard = <T extends ElementType = "div">({
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
}: CardProps<T>) => {
  const Component = disabled
    ? "div"
    : as || (props.href !== undefined ? "a" : "div");

  const isExternalLink = isRemoteUrl(props.href ?? "");
  const newTabProps = isExternalLink
    ? { target: "_blank", rel: "noreferrer" }
    : {};
  const shouldShowArrowIcon = arrow ?? isExternalLink;

  const isImageSrc: boolean = typeof icon === "string";

  // biome-ignore lint/performance/useTopLevelRegex: TODO
  const imageAlt = img ? (img.match(/\/([^/]+)\.[^.]+$/)?.[1] ?? "") : "";

  const renderIcon: JSX.Element = (
    <>
      {icon ? (
        // biome-ignore lint/style/noNestedTernary: TODO
        isImageSrc ? (
          // biome-ignore lint/correctness/useImageSize: TODO
          <img
            alt={title}
            className="h-6 w-6 object-cover object-center"
            data-component-part="card-icon"
            src={icon as string}
          />
        ) : (
          <div
            className="h-6 w-6 fill-gray-800 text-gray-800 dark:fill-gray-100 dark:text-gray-100"
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
        "group relative my-2 block w-full overflow-hidden rounded-2xl border border-gray-950/10 bg-white font-normal ring-2 ring-transparent dark:border-white/10 dark:bg-background-dark",
        props.href && "cursor-pointer",
        props.href &&
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary dark:focus-visible:ring-primary-light",
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<never>}
    >
      {img && (
        // biome-ignore lint/correctness/useImageSize: TODO
        <img
          alt={imageAlt}
          className="not-prose w-full object-cover object-center"
          data-component-part="card-image"
          src={img}
        />
      )}
      <div
        className={cn(
          "relative px-6 py-5",
          horizontal && "flex items-center gap-x-4"
        )}
        data-component-part="card-content-container"
      >
        {props.href && (
          <div
            aria-hidden="true"
            className={cn(
              "absolute top-5 right-5 text-gray-400 group-hover:text-primary dark:text-gray-500 dark:group-hover:text-primary-light",
              !shouldShowArrowIcon && "hidden"
            )}
            data-component-part="card-arrow"
          >
            <ArrowUpRight className="h-4 w-4" />
          </div>
        )}
        {renderIcon}
        <div className="min-w-0 flex-1">
          {title && (
            <h2
              className={cn(
                "not-prose wrap-break-word font-semibold text-base text-gray-800 dark:text-white",
                icon !== null && icon !== undefined && !horizontal && "mt-4"
              )}
              contentEditable={false}
              data-component-part="card-title"
            >
              {title}
            </h2>
          )}
          <div
            className={cn(
              "prose wrap-break-word mt-1 font-normal text-base leading-6",
              title
                ? "text-gray-600 dark:text-gray-400"
                : "text-gray-700 dark:text-gray-300",
              horizontal && "mt-0 leading-6"
            )}
            data-component-part="card-content"
          >
            {children}
          </div>
          {cta && (
            <div className="mt-8" data-component-part="card-cta">
              <span
                className={cn(
                  "flex flex-row items-center gap-2 text-left font-medium text-gray-600 text-sm dark:text-gray-400",
                  !disabled &&
                    "group-hover:text-primary group-hover:dark:text-primary-light",
                  disabled && "opacity-50"
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
};

export { Card, GenericCard };
export type { CardProps, CardPropsBase, CardComponentProps, CardIconProps };
