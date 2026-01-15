import { ReactNode, CSSProperties } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';
import { enhanceVideoProps } from '@/utils/enhanceVideoProps';

export interface FrameProps {
  hint?: string;
  as: 'div';
  style: CSSProperties;
  p: string;
  className: string;
  containerClassName: string;
  children: ReactNode;
  title?: string;
  description?: string;
}

/**
 * Frame component displays content within a stylized container with optional
 * title and description. Commonly used to showcase images, videos, or other
 * visual content with a decorative border and background pattern.
 *
 * @example
 * ```tsx
 * <Frame title="Preview" description="Screenshot of the dashboard">
 *   <img src="/dashboard.png" alt="Dashboard preview" />
 * </Frame>
 * ```
 */
export function Frame({
  as: Component = 'div',
  title,
  description,
  style,
  className,
  containerClassName,
  children,
}: FrameProps) {
  const enhancedChildren = enhanceVideoProps(children);

  return (
    <div className={containerClassName} data-component-part="frame-container">
      {title && (
        <div className="not-prose mb-4 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="flex-none w-4 h-4 fill-gray-400 dark:fill-gray-300"
          >
            <path d="M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z" />
          </svg>
          <p className="text-gray-700 text-sm font-medium dark:text-gray-200">{title}</p>
        </div>
      )}
      <Component
        style={style}
        data-name="frame"
        data-component-part="frame"
        className={cn(
          Classes.Frame,
          'p-2 not-prose relative bg-gray-50/50 rounded-2xl overflow-hidden dark:bg-gray-800/25'
        )}
      >
        <div
          style={{ backgroundPosition: '10px 10px' }}
          className="absolute inset-0 bg-grid-neutral-200/20 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-white/5 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
          aria-hidden="true"
          data-component-part="frame-background-pattern"
        />
        <div
          className={cn('relative rounded-xl overflow-hidden flex justify-center', className)}
          data-component-part="frame-content"
        >
          {enhancedChildren}
        </div>

        {description && (
          <div
            className={cn(
              'relative rounded-2xl flex justify-center mt-3 pt-0 px-8 pb-2 text-sm text-gray-700 dark:text-gray-400',
              className
            )}
            contentEditable={false}
            data-component-part="frame-description"
          >
            <p>{description}</p>
          </div>
        )}
        <div
          className={cn(
            'absolute inset-0 pointer-events-none border border-black/5 rounded-2xl dark:border-white/5'
          )}
          aria-hidden="true"
          data-component-part="frame-border"
        />
      </Component>
    </div>
  );
}
