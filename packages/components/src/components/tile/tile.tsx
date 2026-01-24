import { Classes } from "@/constants/selectors";
import { cn } from "@/utils/cn";
import { isRemoteUrl } from "@/utils/is-remote-url";

const SIZE = 24;
const PLUS_SIZE = 10;
const CENTER = SIZE / 2;

const createPlusPattern = (color: string) => {
  const svg = `
    <svg width="${SIZE}" height="${SIZE}" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5">
        <line x1="${CENTER}" y1="${
          CENTER - PLUS_SIZE / 2
        }" x2="${CENTER}" y2="${CENTER + PLUS_SIZE / 2}" 
              stroke="${color}" stroke-width="1" stroke-linecap="round"/>
        <line x1="${CENTER - PLUS_SIZE / 2}" y1="${CENTER}" x2="${
          CENTER + PLUS_SIZE / 2
        }" y2="${CENTER}" 
              stroke="${color}" stroke-width="1" stroke-linecap="round"/>
      </g>
    </svg>
  `;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const LIGHT_PATTERN = createPlusPattern("#F0F0F0");
const DARK_PATTERN = createPlusPattern("#232323");

const BG_SIZE = `${SIZE}px ${SIZE}px`;

type TileProps = {
  href: string;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

const Tile = ({ href, children, title, description, className }: TileProps) => {
  const DEFAULT_BG_PATTERN_CLASSES = cn(
    "pointer-events-none size-full select-none bg-center bg-repeat-round [grid-area:1/1]",
    "after:absolute after:left-0 after:h-full after:w-[7px] after:bg-neutral-50 after:content-[''] dark:after:bg-neutral-900",
    "before:absolute before:right-0 before:h-full before:w-[7px] before:bg-neutral-50 before:content-[''] dark:before:bg-neutral-900"
  );

  return (
    <a
      href={href}
      {...(isRemoteUrl(href) ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        Classes.Tile,
        "group not-prose flex w-full min-w-0 cursor-pointer flex-col items-center justify-center gap-1",
        className
      )}
    >
      <div
        className="relative grid h-[170px] w-full place-items-center overflow-hidden rounded-2xl bg-neutral-50 py-1 dark:bg-neutral-900"
        data-component-part="tile-children-container"
      >
        <div
          aria-hidden="true"
          className={cn(DEFAULT_BG_PATTERN_CLASSES, "block dark:hidden")}
          data-component-part="tile-background-light"
          style={{
            backgroundImage: `url("${LIGHT_PATTERN}")`,
            backgroundSize: BG_SIZE,
          }}
        />
        <div
          aria-hidden="true"
          className={cn(DEFAULT_BG_PATTERN_CLASSES, "hidden dark:block")}
          data-component-part="tile-background-dark"
          style={{
            backgroundImage: `url("${DARK_PATTERN}")`,
            backgroundSize: BG_SIZE,
          }}
        />
        <div
          className="flex size-full items-center justify-center p-8 [grid-area:1/1] [&_svg]:h-auto [&_svg]:max-h-full [&_svg]:w-auto [&_svg]:max-w-full"
          data-component-part="tile-children-inner-container"
        >
          {children}
        </div>
      </div>
      {(!!title || !!description) && (
        <div
          className="flex w-full min-w-0 flex-col items-center justify-center gap-1 p-2"
          data-component-part="tile-text-container"
        >
          {!!title && (
            <p
              className="m-0 max-w-full truncate font-medium text-base text-neutral-900 tracking-[-0.2px] dark:text-neutral-200"
              data-component-part="tile-title"
              title={title}
            >
              {title}
            </p>
          )}
          {!!description && (
            <p
              className="m-0 max-w-full truncate font-normal text-neutral-600 text-sm tracking-[-0.1px] dark:text-neutral-400"
              data-component-part="tile-description"
              title={description}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </a>
  );
};

export { Tile };
export type { TileProps };
