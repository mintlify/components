const protocols = [
  "http",
  "https",
  "ftp",
  "ftps",
  "file",
  "data",
  "mailto",
  "tel",
  "sms",
  "ws",
  "wss",
] as const;
type Protocol = (typeof protocols)[number];
export type AbsoluteUrl = `${Protocol}://${string}` | `${Protocol}:${string}`;

export const isAbsoluteUrl = (url: unknown): url is AbsoluteUrl => {
  if (!url || typeof url !== "string") return false;
  try {
    return URL.canParse(url);
  } catch {
    return false;
  }
};
