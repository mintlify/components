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

export { isAbsoluteUrl };
