import { MINTLIFY_ICONS_CDN_URL } from "@/constants";
import { FONT_AWESOME_BRANDS } from "@/constants/icons/font-awesome/v7.1.0/brands";
import type { IconLibrary, IconType } from "@/models";
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

export { getIconUrl, isBrandsIcon, getLanguageIconUrl };
