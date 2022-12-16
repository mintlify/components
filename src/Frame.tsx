import clsx from "clsx";

let paddingMap = { none: "", md: "p-8" };

export function Frame({
  as: Component = "div",
  style,
  className,
  containerClassName,
  html,
  children,
  hint,
  padding = "md",
  lightOnly = false,
}: {
  as: any;
  style: any;
  p: string;
  className: string;
  containerClassName: string;
  html: any;
  children: any;
  hint: string;
  padding: "none" | "md";
  lightOnly: boolean;
}) {
  let paddingClassName = paddingMap[padding];

  return (
    <div className={containerClassName}>
      {hint !== undefined && (
        <div className="not-prose mb-4 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="flex-none w-4 h-4 fill-slate-400 dark:fill-slate-300"
          >
            <path d="M224 320c0 17.69 14.33 32 32 32h64c17.67 0 32-14.31 32-32s-14.33-32-32-32h-64C238.3 288 224 302.3 224 320zM267.6 256H352c17.67 0 32-14.31 32-32s-14.33-32-32-32h-80v40C272 240.5 270.3 248.5 267.6 256zM272 160H480c17.67 0 32-14.31 32-32s-14.33-32-32-32h-208.8C271.5 98.66 272 101.3 272 104V160zM320 416c0-17.69-14.33-32-32-32H224c-17.67 0-32 14.31-32 32s14.33 32 32 32h64C305.7 448 320 433.7 320 416zM202.1 355.8C196 345.6 192 333.3 192 320c0-5.766 1.08-11.24 2.51-16.55C157.4 300.6 128 269.9 128 232V159.1C128 151.2 135.2 144 143.1 144S160 151.2 159.1 159.1l0 69.72C159.1 245.2 171.3 271.1 200 271.1C222.1 271.1 240 254.1 240 232v-128C240 81.91 222.1 64 200 64H136.6C103.5 64 72.03 80 52.47 106.8L26.02 143.2C9.107 166.5 0 194.5 0 223.3V312C0 387.1 60.89 448 136 448h32.88C163.4 438.6 160 427.7 160 416C160 388.1 178 364.6 202.1 355.8z" />
          </svg>
          <p className="text-slate-700 text-sm font-medium dark:text-slate-200">
            {hint}
          </p>
        </div>
      )}
      <Component
        style={style}
        className={clsx(
          "not-prose relative bg-slate-50 rounded-xl overflow-hidden",
          !lightOnly && "dark:bg-slate-800/25"
        )}
      >
        <div
          style={{ backgroundPosition: "10px 10px" }}
          className={clsx(
            "absolute inset-0 bg-grid-zinc-100 [mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.25))]",
            !lightOnly &&
              "dark:bg-grid-zinc-800 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,1))]"
          )}
        />
        <div
          className={clsx(
            "relative rounded-xl overflow-auto flex justify-center",
            paddingClassName,
            className
          )}
          {...(html
            ? { dangerouslySetInnerHTML: { __html: html } }
            : { children })}
        />
        <div
          className={clsx(
            "absolute inset-0 pointer-events-none border border-black/5 rounded-xl",
            !lightOnly && "dark:border-white/5"
          )}
        />
      </Component>
    </div>
  );
}
