import slugify from "@sindresorhus/slugify";
import { useCallback, useEffect, useRef, useState } from "react";
import { LinkIcon } from "@/icons";
import { cn } from "@/utils/cn";
import { copyToClipboard } from "@/utils/copy-to-clipboard";
import { DeprecatedPill, InfoPill, RequiredPill } from "./pills";
import type { PropertyProps } from "./property";

type ParamHeadProps = Omit<PropertyProps, "children">;

const ParamHead = ({
  name,
  type,
  location,
  required,
  deprecated,
  default: defaultValue,
  id,
  pre,
  post,
  onMount,
  navigateToHeaderAriaLabel,
  defaultLabel,
  requiredLabel,
  deprecatedLabel,
}: ParamHeadProps) => {
  const pillsRef = useRef<HTMLDivElement>(null);
  const [isMultiLine, setIsMultiLine] = useState(false);
  const paramId = id ?? slugify(name ?? "", { decamelize: true });

  const copyAnchorLink = useCallback(() => {
    if (paramId) {
      copyToClipboard(`${window.location.href.split("#")[0]}#${paramId}`);
      window.location.hash = paramId;
    }
  }, [paramId]);

  useEffect(() => {
    const ref = pillsRef.current;

    if (!ref) {
      return;
    }

    const checkHeight = () => {
      const height = ref?.offsetHeight ?? 0;
      setIsMultiLine(height > 28);
    };

    checkHeight();

    const resizeObserver = new ResizeObserver(checkHeight);
    resizeObserver.observe(ref);

    return () => {
      resizeObserver.unobserve(ref);
    };
  }, []);

  useEffect(() => {
    onMount?.();
  }, [onMount]);

  if (name == null) {
    return null;
  }

  return (
    <div
      className={cn(
        "group/param-head param-head relative flex break-all font-mono text-sm"
      )}
      id={paramId}
      key={paramId}
    >
      <div className="mr-5 flex flex-1 flex-col content-start py-0.5">
        <div className="flex flex-wrap items-center gap-2">
          {paramId && (
            <div className="absolute -top-1.5 -left-9">
              <a
                aria-label={navigateToHeaderAriaLabel}
                className="group/link flex items-center border-0 py-2 opacity-0 focus:opacity-100 focus:outline-0 group-hover/param-head:opacity-100"
                href={`#${paramId}`}
                onClick={copyAnchorLink}
              >
                &#8203;
                <div className="flex size-6 items-center justify-center rounded-md bg-white text-stone-400 shadow-sm ring-1 ring-stone-400/30 hover:ring-stone-400/60 group-focus/link:border-2 group-focus/link:border-primary dark:bg-background-dark dark:text-white/50 dark:ring-1 dark:ring-stone-700/25 dark:brightness-[1.35] dark:group-focus/link:border-primary-light dark:hover:ring-white/20 dark:hover:brightness-150">
                  <LinkIcon />
                </div>
              </a>
            </div>
          )}
          {pre?.map((item, i) => (
            <div
              className="rounded-md bg-stone-100/50 px-2 py-0.5 text-stone-600 dark:bg-white/5 dark:text-stone-200"
              data-component-part="field-meta-pre"
              // biome-ignore lint/suspicious/noArrayIndexKey: TODO
              key={i}
            >
              {item}
            </div>
          ))}
          {/** biome-ignore lint/a11y/noNoninteractiveElementInteractions: TODO */}
          {/** biome-ignore lint/a11y/noStaticElementInteractions: TODO */}
          {/** biome-ignore lint/a11y/useKeyWithClickEvents: TODO */}
          <div
            className="overflow-wrap-anywhere cursor-pointer font-semibold text-primary dark:text-primary-light"
            data-component-part="field-name"
            onClick={copyAnchorLink}
          >
            {name}
          </div>
          <div
            className={cn(
              "inline items-center gap-2 font-medium text-xs [&_div]:mr-2 [&_div]:inline",
              isMultiLine ? "[&_div]:leading-6" : "[&_div]:leading-5"
            )}
            data-component-part="field-meta"
            ref={pillsRef}
          >
            {type && <InfoPill>{type}</InfoPill>}
            {location && <InfoPill>{location}</InfoPill>}
            {defaultValue != null && (
              <InfoPill prefix={defaultLabel}>
                {typeof defaultValue === "string"
                  ? // biome-ignore lint/style/noNestedTernary: TODO
                    defaultValue === ""
                    ? '""'
                    : defaultValue
                  : JSON.stringify(defaultValue)}
              </InfoPill>
            )}
            {required && <RequiredPill label={requiredLabel} />}
            {deprecated && <DeprecatedPill label={deprecatedLabel} />}
            {post?.map((item, i) => (
              <div
                className="rounded-md bg-stone-100/50 px-2 py-0.5 text-stone-600 dark:bg-white/5 dark:text-stone-200"
                data-component-part="field-meta-post"
                // biome-ignore lint/suspicious/noArrayIndexKey: TODO
                key={i}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ParamHead };
