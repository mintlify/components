import { cn } from "@/utils/cn";
import { getLanguageIconUrl } from "@/utils/icon-utils";

type LanguageIconProps = {
  language: string;
  className?: string;
};

const LanguageIcon = ({ language, className }: LanguageIconProps) => {
  const url = getLanguageIconUrl(language);

  if (!url) {
    return null;
  }

  return (
    <svg
      className={cn("size-3.5 shrink-0", className)}
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskImage: `url(${url})`,
        maskRepeat: "no-repeat",
        maskPosition: "center",
        maskSize: "100%",
        backgroundColor: "currentColor",
      }}
    />
  );
};

export { LanguageIcon };
