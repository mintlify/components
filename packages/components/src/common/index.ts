// @mintlify/common

const CHILD_TAB_IDS_ATTRIBUTE = "data-child-tab-ids";
const CHILD_HEADING_IDS_ATTRIBUTE = "data-child-heading-ids";

type Protocol =
  | "http"
  | "https"
  | "ftp"
  | "ftps"
  | "file"
  | "data"
  | "mailto"
  | "tel"
  | "sms"
  | "ws"
  | "wss";
type AbsoluteUrl = `${Protocol}://${string}` | `${Protocol}:${string}`;

const isAbsoluteUrl = (url: unknown): url is AbsoluteUrl => {
  if (!url || typeof url !== "string") {
    return false;
  }

  try {
    return URL.canParse(url);
  } catch {
    return false;
  }
};

const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export {
  CHILD_TAB_IDS_ATTRIBUTE,
  CHILD_HEADING_IDS_ATTRIBUTE,
  isAbsoluteUrl,
  slugify,
};
