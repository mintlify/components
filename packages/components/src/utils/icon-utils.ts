import { MINTLIFY_ICONS_CDN_URL } from "@/constants";
import { FONT_AWESOME_BRANDS } from "@/constants/brands";
import { getIconKey } from "@/utils/shiki/snippet-presets";

const getIconUrl = (
  icon: string,
  iconType?: IconType,
  iconLibrary?: IconLibrary
): string => {
  if (iconLibrary === "lucide") {
    return `${MINTLIFY_ICONS_CDN_URL}/lucide/v0.545.0/${icon}.svg`;
  }

  const languageIconUrl = getLanguageIconUrl(icon);
  if (languageIconUrl) {
    return languageIconUrl;
  }

  if (isBrandsIcon(icon)) {
    return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/brands/${icon}.svg`;
  }

  const type = iconType ?? "regular";

  return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/${type}/${icon}.svg`;
};

const isBrandsIcon = (icon?: string): boolean => {
  if (!icon) {
    return false;
  }

  return FONT_AWESOME_BRANDS.includes(icon.toLowerCase());
};

const getLanguageIconUrl = (language: string): string | null => {
  const iconKey = getIconKey(language);
  if (!iconKey) {
    return null;
  }
  return `${MINTLIFY_ICONS_CDN_URL}/devicon/${iconKey}.svg`;
};

const ICON_TYPES = [
  "brands",
  "duotone",
  "light",
  "regular",
  "sharp-duotone-solid",
  "sharp-light",
  "sharp-regular",
  "sharp-solid",
  "sharp-thin",
  "solid",
  "thin",
] as const;

type IconType = (typeof ICON_TYPES)[number];

const ICON_LIBRARIES = ["fontawesome", "lucide"] as const;

type IconLibrary = (typeof ICON_LIBRARIES)[number];

type PageType = "default" | "pdf" | "minimal";

type BaseMultiViewItemType = {
  title: string;
  content: string;
  icon?: string;
  iconType?: IconType;
};

type MultiViewItemType = BaseMultiViewItemType & {
  active?: boolean;
};

export {
  getIconUrl,
  isBrandsIcon,
  getLanguageIconUrl,
  ICON_TYPES,
  type IconType,
  type IconLibrary,
  type MultiViewItemType,
  type PageType,
};
