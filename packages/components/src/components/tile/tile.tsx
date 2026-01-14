import { ComponentPropsWithoutRef, ElementType, ReactNode, Ref } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';
import { isRemoteUrl } from '@/utils/isRemoteUrl';

const SIZE = 24;
const PLUS_SIZE = 10;
const CENTER = SIZE / 2;

const createPlusPattern = (color: string) => {
  const svg = `
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <line x1="${CENTER}" y1="${CENTER - PLUS_SIZE / 2}" x2="${CENTER}" y2="${CENTER + PLUS_SIZE / 2}"
              stroke="${color}" stroke-width="1" stroke-linecap="round"/>
        <line x1="${CENTER - PLUS_SIZE / 2}" y1="${CENTER}" x2="${CENTER + PLUS_SIZE / 2}" y2="${CENTER}"
              stroke="${color}" stroke-width="1" stroke-linecap="round"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const lightPattern = createPlusPattern('rgb(0 0 0 / 0.02)');
const darkPattern = createPlusPattern('rgb(255 255 255 / 0.05)');

export interface TilePropsBase<T> {
  /**
   * URL to navigate to when the tile is clicked.
   */
  href?: string;
  /**
   * Content to display in the tile's main area (typically an image, icon, or illustration).
   */
  children?: ReactNode;
  /**
   * Title text displayed below the tile content.
   */
  title?: string;
  /**
   * Description text displayed below the title.
   */
  description?: string;
  /**
   * Custom element type to render (e.g., a custom Link component).
   */
  as?: T;
  /**
   * Ref for the root element.
   */
  mRef?: Ref<T | undefined>;
}

/**
 * Props for the Tile component.
 * @typeParam T - Type of the element rendered by the tile.
 */
export type TileProps<T extends ElementType> = TilePropsBase<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TilePropsBase<T>>;

/**
 * A tile component that displays content in a decorative container with optional title and description.
 * Typically used for showcasing logos, icons, or illustrations in a grid layout.
 */
export function Tile<T extends ElementType = 'div'>({
  href,
  children,
  title,
  description,
  className,
  as,
  mRef,
  ...props
}: TileProps<T>) {
  /**
   * If href is provided, use `as` or an `a` tag for linking.
   * Defaults to `div` when no href.
   */
  const Component = as || (href != null ? 'a' : 'div');

  const isExternalLink = isRemoteUrl(href ?? '');
  const newTabProps = isExternalLink ? { target: '_blank', rel: 'noreferrer' } : {};

  const DEFAULT_BG_PATTERN_CLASSES = cn(
    'bg-repeat-round bg-center [grid-area:1/1] size-full pointer-events-none select-none',
    `bg-[size:${SIZE}px_${SIZE}px]`,
    "after:content-[''] after:left-0 after:absolute after:h-full after:w-[7px] dark:after:bg-gray-900 after:bg-gray-50",
    "before:content-[''] before:right-0 before:absolute before:h-full before:w-[7px] dark:before:bg-gray-900 before:bg-gray-50"
  );

  return (
    <Component
      href={href}
      className={cn(
        Classes.Tile,
        'flex items-center justify-center flex-col w-full min-w-0 gap-1 group not-prose',
        href && 'cursor-pointer',
        className
      )}
      {...newTabProps}
      {...props}
      ref={mRef as Ref<never>}
    >
      <div
        className="h-[170px] w-full relative bg-gray-50 dark:bg-gray-900 rounded-2xl py-1 grid place-items-center overflow-hidden"
        data-component-part="tile-content-container"
      >
        <div
          aria-hidden="true"
          className={cn(DEFAULT_BG_PATTERN_CLASSES, 'block dark:hidden')}
          style={{
            backgroundImage: `url("${lightPattern}")`,
          }}
          data-component-part="tile-background-light"
        />
        <div
          aria-hidden="true"
          className={cn(DEFAULT_BG_PATTERN_CLASSES, 'hidden dark:block')}
          style={{
            backgroundImage: `url("${darkPattern}")`,
          }}
          data-component-part="tile-background-dark"
        />
        <div
          className="size-full flex items-center justify-center p-8 [grid-area:1/1] [&_svg]:max-w-full [&_svg]:max-h-full [&_svg]:w-auto [&_svg]:h-auto"
          data-component-part="tile-content"
        >
          {children}
        </div>
      </div>
      {(!!title || !!description) && (
        <div
          className="flex flex-col gap-1 p-2 items-center justify-center w-full min-w-0"
          data-component-part="tile-text-container"
        >
          {!!title && (
            <p
              className="text-base font-medium [letter-spacing:-0.2px] text-gray-900 dark:text-gray-200 m-0 truncate max-w-full"
              title={title}
              data-component-part="tile-title"
            >
              {title}
            </p>
          )}
          {!!description && (
            <p
              className="text-sm [letter-spacing:-0.1px] text-gray-600 dark:text-gray-400 truncate m-0 font-normal max-w-full"
              title={description}
              data-component-part="tile-description"
            >
              {description}
            </p>
          )}
        </div>
      )}
    </Component>
  );
}
