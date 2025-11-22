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
   * Frame hint, at the top of the frame.
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
  const rootElement = useRender({
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
    <div className={cn("mt-frame-container", containerClassName)}>
      {hint && (
        <FrameHint
          icon={
            hintIcon || (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="mt-frame-hint-icon"
                aria-hidden="true"
              >
                <path d="M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z" />
              </svg>
            )
          }
        >
          {hint}
        </FrameHint>
      )}

      <rootElement.type {...rootElement.props}>
        <div className="mt-frame-background" />

        <FrameContent>{children}</FrameContent>

        {caption && (
          <FrameCaption>
            <p>{caption}</p>
          </FrameCaption>
        )}

        <div className="mt-frame-border" />
      </rootElement.type>
    </div>
  );
}

interface FrameRootProps extends HTMLAttributes<HTMLElement> {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  render?: React.ReactElement;
}

function FrameRoot({
  children,
  className,
  style,
  render = <div />,
  ...props
}: FrameRootProps) {
  const rootElement = useRender({
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
    <rootElement.type {...rootElement.props}>
      <div className="mt-frame-wrapper">
        <div className="mt-frame-background" />
        {children}
        <div className="mt-frame-border" />
      </div>
    </rootElement.type>
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
  Content: FrameContent,
  Caption: FrameCaption,
  Hint: FrameHint,
});

export { Frame, FrameRoot, FrameContent, FrameCaption, FrameHint };

export type {
  FrameProps,
  FrameRootProps,
  FrameContentProps,
  FrameCaptionProps,
  FrameHintProps,
};
