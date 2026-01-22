// @mintlify/models

export const iconTypes = [
  'brands',
  'duotone',
  'light',
  'regular',
  'sharp-duotone-solid',
  'sharp-light',
  'sharp-regular',
  'sharp-solid',
  'sharp-thin',
  'solid',
  'thin',
] as const;

export type IconType = (typeof iconTypes)[number];

export const iconLibraries = ['fontawesome', 'lucide'] as const;

export type IconLibrary = (typeof iconLibraries)[number];

export type PageType = 'default' | 'pdf' | 'minimal';

export type BaseMultiViewItemType = {
  title: string;
  content: string;
  icon?: string;
  iconType?: IconType;
};

export type MultiViewItemType = BaseMultiViewItemType & {
  active?: boolean;
};
