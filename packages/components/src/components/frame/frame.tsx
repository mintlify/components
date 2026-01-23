import type { CSSProperties, ReactNode } from "react";

import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import { enhanceVideoProps } from "@/utils/enhance-video-props";

type FrameProps = {
  as: "div";
  style: CSSProperties;
  className: string;
  children: ReactNode;
  title?: string;
  description?: string;
  renderDescription?: (description: string) => ReactNode;
};

const Frame = ({
  as: Component = "div",
  title,
  description,
  renderDescription = (text) => <p>{text}</p>,
  style,
  className,
  children,
}: FrameProps) => {
  const enhancedChildren = enhanceVideoProps(children);

  return (
    <div className={className} data-component-part="frame-container">
      {title && (
        <div className="not-prose mb-4 flex items-center space-x-2">
          <svg
            aria-hidden="true"
            className="size-4 flex-none fill-gray-400 dark:fill-gray-300"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z" />
          </svg>
          <p className="font-medium text-gray-700 text-sm dark:text-gray-200">
            {title}
          </p>
        </div>
      )}
      <Component
        className={cn(
          Classes.Frame,
          "not-prose relative overflow-hidden rounded-2xl bg-gray-50/50 p-2 dark:bg-gray-800/25"
        )}
        data-component-part="frame"
        data-name="frame"
        style={style}
      >
        <div
          aria-hidden="true"
          className="mask-[linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:mask-[linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))] absolute inset-0 bg-grid-neutral-200/20 dark:bg-grid-white/5"
          data-component-part="frame-background-pattern"
          style={{ backgroundPosition: "10px 10px" }}
        />
        <div
          className="relative flex w-full justify-center overflow-hidden rounded-xl bg-white dark:bg-gray-800"
          data-component-part="frame-content"
        >
          {enhancedChildren}
        </div>

        {description && (
          <div
            className="relative mt-3 flex w-full justify-center rounded-2xl bg-white px-8 pt-0 pb-2 text-gray-700 text-sm dark:bg-gray-800 dark:text-gray-400"
            contentEditable={false}
            data-component-part="frame-description"
          >
            {renderDescription(description)}
          </div>
        )}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl border border-black/5 dark:border-white/5"
          )}
          data-component-part="frame-border"
        />
      </Component>
    </div>
  );
};

export { Frame };
export type { FrameProps };
