import { IconLibrary, IconType } from '@/models';
import { MINTLIFY_ICONS_CDN_URL } from '@/constants';
import { FONT_AWESOME_BRANDS } from '@/constants/icons/font-awesome/v7.1.0/brands';
import { getIconKey } from '@/utils/shiki/snippetPresets';

export function getIconUrl(icon: string, iconType?: IconType, iconLibrary?: IconLibrary) {
    if (iconLibrary === 'lucide') {
        return `${MINTLIFY_ICONS_CDN_URL}/lucide/v0.545.0/${icon}.svg`;
    }
    const languageIconUrl = getLanguageIconUrl(icon);
    if (languageIconUrl) {
        return languageIconUrl;
    }
    if (isBrandsIcon(icon)) {
        return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/brands/${icon}.svg`;
    }
    const type = iconType ?? 'regular';
    return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/${type}/${icon}.svg`;
}

export function isBrandsIcon(icon?: string): boolean {
    if (!icon) return false;
    return FONT_AWESOME_BRANDS.includes(icon.toLowerCase());
}

export const getLanguageIconUrl = (language: string): string | null => {
    const iconKey = getIconKey(language);
    if (!iconKey) return null;
    return `${MINTLIFY_ICONS_CDN_URL}/devicon/${iconKey}.svg`;
};
