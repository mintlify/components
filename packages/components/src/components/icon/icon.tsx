import { CSSProperties } from 'react';

import { isAbsoluteUrl } from '@/common';
import { MINTLIFY_ICONS_CDN_URL } from '@/constants';

import { IconLibrary, IconType, iconTypes, PageType } from '@/models';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';
import { getIconUrl } from '@/utils/iconUtils';

export type IconProps = {
  icon: string;
  iconType?: IconType;
  className?: string;
  color?: string;
  colorLight?: string;
  colorDark?: string;
  overrideColor?: boolean;
  size?: number;
  // pass in from DocsConfigContext if specified in docs.json
  iconLibrary?: IconLibrary;
  // pass in from env.NEXT_PUBLIC.BASE_PATH
  basePath?: string;
  // pass in from PageContext, needed for different PDF icon styling
  pageType?: PageType;
}

export function Icon({
  icon,
  iconType,
  color,
  colorLight,
  colorDark,
  size,
  className,
  iconLibrary = "fontawesome",
  basePath,
  pageType,
  overrideColor,
}: IconProps) {
  const style: CSSProperties = {
    width: size || 16,
    height: size || 16,
    display: 'inline-block',
    verticalAlign: 'middle',
  }

  // Handle light/dark mode colors via CSS custom properties
  const hasLightDarkColors = colorLight && colorDark;
  const styleWithColors: CSSProperties = hasLightDarkColors
    ? ({
        ...style,
        '--color-light': colorLight,
        '--color-dark': colorDark,
      } as CSSProperties)
    : style;

  const classNames = cn(
    Classes.Icon,
    'inline',
    !color && !hasLightDarkColors && 'bg-primary dark:bg-primary-light',
    hasLightDarkColors && 'bg-[--color-light] dark:bg-[--color-dark]',
    className
  )
  const isPdf = pageType === 'pdf';
  const url = getIconUrl(icon.toLowerCase(), iconType, iconLibrary);

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
          className={classNames}
          data-component-part="icon-svg"
          style={{
            WebkitMaskImage: `url(${icon})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskImage: `url(${icon})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: '100%',
            backgroundColor: 'currentColor',
            ...styleWithColors,
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
        className={cn(classNames, 'bg-transparent dark:bg-transparent')}
        data-component-part="icon-image"
        style={styleWithColors}
      />
    );
  }

  if (isPdf) {
    return (
      <img
        src={url}
        className={cn(classNames, !color && !overrideColor && !hasLightDarkColors && 'bg-gray-800 dark:bg-gray-100')}
        data-component-part="icon-image"
        style={{
          backgroundColor: 'transparent',
          ...styleWithColors,
        }}
        alt={icon}
      />
    );
  }

  return (
    <svg
      className={cn(classNames, !color && !overrideColor && !hasLightDarkColors && 'bg-gray-800 dark:bg-gray-100')}
      data-component-part="icon-svg"
      style={{
        WebkitMaskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskImage: `url(${url})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: iconLibrary == 'lucide' ? '100%' : undefined,
        backgroundColor: color,
        ...styleWithColors,
      }}
    ></svg>
  );
}
