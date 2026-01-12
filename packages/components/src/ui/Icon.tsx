import { isAbsoluteUrl } from '@/common';
import { IconLibrary, IconType, iconTypes, PageType } from '@/models';
import { CSSProperties } from 'react';

import { MINTLIFY_ICONS_CDN_URL } from '@/constants';
import { FONT_AWESOME_BRANDS } from '@/constants/icons/font-awesome/v7.1.0/brands';
import { cn } from '@/utils/cn';

type IconProps = {
    icon: string;
    iconType?: IconType;
    className?: string;
    color?: string;
    overrideColor?: boolean;
    style?: CSSProperties;
    iconLibrary?: IconLibrary;
    pageType?: PageType;
    // from NEXT_PUBLIC.BASE_PATH
    basePath?: string;
};

export function getIconUrl(icon: string, iconType?: IconType, iconLibrary?: IconLibrary) {
    if (isBrandsIcon(icon)) {
        return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/brands/${icon}.svg`;
    }
    if (iconLibrary === 'lucide') {
        return `${MINTLIFY_ICONS_CDN_URL}/lucide/v0.545.0/${icon}.svg`;
    }
    const type = iconType ?? 'regular';
    return `${MINTLIFY_ICONS_CDN_URL}/v7.1.0/${type}/${icon}.svg`;
}

export default function Icon({ style, icon, iconType, iconLibrary, className, color, pageType }: IconProps) {
    const isPdf = pageType === 'pdf';
    const url = getIconUrl(icon, iconType, iconLibrary);

    if (isPdf) {
        return (
            <img
                src={url}
                className={className}
                style={{
                    backgroundColor: 'transparent',
                    ...style,
                }}
                alt={icon}
            />
        );
    }

    return (
        <svg
            className={className}
            style={{
                WebkitMaskImage: `url(${url})`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: `url(${url})`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: iconLibrary == 'lucide' ? '100%' : undefined,
                backgroundColor: color,
                ...style,
            }}
        ></svg>
    );
}

export function ComponentIcon({
    icon,
    iconType,
    className,
    style,
    color,
    overrideColor,
    iconLibrary = 'fontawesome',
    basePath
}: IconProps) {
    // Validate the types
    if (iconType && !iconTypes.includes(iconType)) {
        console.log(
            `Invalid iconType ${iconType} expected a string equal to one of: brands, duotone, light, regular, sharp-solid, solid, thin`
        );
        return null;
    }

    if (typeof icon === 'string' && (isAbsoluteUrl(icon) || icon.startsWith('/'))) {
        if (icon.startsWith(MINTLIFY_ICONS_CDN_URL) || icon.startsWith('https://mintlify.b-cdn.net')) {
            return (
                <svg
                    className={className}
                    style={{
                        WebkitMaskImage: `url(${icon})`,
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url(${icon})`,
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center',
                        maskSize: '100%',
                        backgroundColor: 'currentColor',
                        ...style,
                    }}
                ></svg>
            );
        }

        let iconUrl = icon;
        if (icon.startsWith('/') && basePath) {
            iconUrl = `${basePath}${icon}`;
        }

        // because s3 urls are missing CORS headers, we will default it to an img tag
        return (
            <img
                src={iconUrl}
                alt={icon}
                className={cn(className, 'bg-transparent dark:bg-transparent')}
                style={style}
            />
        );
    }

    return (
        <Icon
            icon={icon.toLowerCase()}
            iconType={iconType}
            iconLibrary={iconLibrary}
            className={cn(className, !color && !overrideColor && 'bg-gray-800 dark:bg-gray-100')}
            style={style}
            color={color}
        />
    );
}

function isBrandsIcon(icon?: string): boolean {
    if (!icon) return false;
    return FONT_AWESOME_BRANDS.includes(icon.toLowerCase());
}
