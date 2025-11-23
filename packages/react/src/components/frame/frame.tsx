import { ReactNode, CSSProperties, HTMLAttributes } from "react";
import { useRender } from "@base-ui-components/react/use-render";
import { cn } from "../../utils/cn";
import "./frame.css";
import { IconProp } from "../../types/icon";
import { Icon } from "../icon/icon";

interface FrameProps extends HTMLAttributes<HTMLElement> {
  /**
   * Frame caption, at the bottom of the frame.
   */
  caption?: string;
  /**
   * Frame hint text, at the top of the frame.
   */
  hint?: string;
  /**
   * Frame hint icon, at the top of the frame.
   * @see {@link IconProp}
   */
  hintIcon?: IconProp;
  className?: string;
  containerClassName?: string;
  style?: CSSProperties;
  children: ReactNode;
  render?: React.ReactElement;
}

function FrameComponent({
  children,
  caption,
  hint,
  hintIcon,
  className,
  containerClassName,
  style,
  render = <div />,
  ...props
}: FrameProps) {
  return (
    <FrameRoot className={containerClassName}>
      {hint && <FrameHint icon={hintIcon}>{hint}</FrameHint>}

      <FrameWrapper {...props}>
        <FrameBackground />
        <FrameContent>{children}</FrameContent>
        {caption && (
          <FrameCaption>
            <p>{caption}</p>
          </FrameCaption>
        )}
        <FrameBorder />
      </FrameWrapper>
    </FrameRoot>
  );
}

interface FrameRootProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode;
}

function FrameRoot({ children, className, ...props }: FrameRootProps) {
  return (
    <div
      data-slot="frame-container"
      className={cn("mt-frame-container", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface FrameWrapperProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  render?: React.ReactElement;
}

function FrameWrapper({
  children,
  className,
  style,
  render = <div />,
  ...props
}: FrameWrapperProps) {
  const frameElement = useRender({
    defaultTagName: "div",
    render,
    props: {
      ...props,
      style,
      className: cn("mt-frame", className),
      "data-slot": "frame",
    },
  });

  return (
    <frameElement.type {...frameElement.props}>{children}</frameElement.type>
  );
}

function FrameBackground({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="frame-background"
      className={cn("mt-frame-background", className)}
      {...props}
    />
  );
}

function FrameBorder({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="frame-border"
      className={cn("mt-frame-border", className)}
      {...props}
    />
  );
}

interface FrameContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function FrameContent({ children, className, ...props }: FrameContentProps) {
  return (
    <div
      data-slot="frame-content"
      className={cn("mt-frame-content", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface FrameCaptionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

function FrameCaption({ children, className, ...props }: FrameCaptionProps) {
  return (
    <div
      data-slot="frame-caption"
      className={cn("mt-frame-caption", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface FrameHintProps extends HTMLAttributes<HTMLDivElement> {
  icon?: IconProp;
  children: ReactNode;
  className?: string;
}

function FrameHint({ children, className, icon, ...props }: FrameHintProps) {
  const IconComponent =
    typeof icon === "string" ? (
      <Icon icon={icon} className="mt-frame-hint-icon" size={16} />
    ) : icon && typeof icon === "object" && "icon" in icon ? (
      <Icon {...icon} className="mt-frame-hint-icon" size={16} />
    ) : icon ? (
      icon
    ) : null;

  return (
    <div
      data-slot="frame-hint"
      className={cn("mt-frame-hint", className)}
      {...props}
    >
      {IconComponent ? IconComponent : null}
      {children && <p className="mt-frame-hint-text">{children}</p>}
    </div>
  );
}

const Frame = Object.assign(FrameComponent, {
  Root: FrameRoot,
  Wrapper: FrameWrapper,
  Background: FrameBackground,
  Border: FrameBorder,
  Content: FrameContent,
  Caption: FrameCaption,
  Hint: FrameHint,
});

export {
  Frame,
  FrameRoot,
  FrameWrapper,
  FrameBackground,
  FrameBorder,
  FrameContent,
  FrameCaption,
  FrameHint,
};

export type {
  FrameProps,
  FrameRootProps,
  FrameWrapperProps,
  FrameContentProps,
  FrameCaptionProps,
  FrameHintProps,
};
