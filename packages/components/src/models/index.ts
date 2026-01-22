// @mintlify/models

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

export { ICON_TYPES };
export type { IconLibrary, IconType, MultiViewItemType, PageType };
