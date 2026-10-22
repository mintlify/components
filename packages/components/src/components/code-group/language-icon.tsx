import { cn } from "cn";
import { useContext } from "react";
import { IconUrlContext } from "@/components/icon/icon-url-context";
import { getLanguageIconUrl } from "@/utils/icon-utils";

type LanguageIconProps = {
  language: string;
  className?: string;
};

const LanguageIcon = ({ language, className }: LanguageIconProps) => {
  const resolveUrl = useContext(IconUrlContext);
  const languageIconUrl = getLanguageIconUrl(language);

  if (!languageIconUrl) {
    return null;
  }

  const url = resolveUrl(languageIconUrl);

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
