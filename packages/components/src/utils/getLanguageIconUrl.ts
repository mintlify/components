import { MINTLIFY_ICONS_CDN_URL } from '@/constants';
import { getIconKey } from '@/constants/snippetPresets';

export const getLanguageIconUrl = (language: string): string | null => {
    const iconKey = getIconKey(language);
    if (!iconKey) return null;
    return `${MINTLIFY_ICONS_CDN_URL}/devicon/${iconKey}.svg`;
};
