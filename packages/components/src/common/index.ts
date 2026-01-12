// @mintlify/common

const protocols = [
    'http',
    'https',
    'ftp',
    'ftps',
    'file',
    'data',
    'mailto',
    'tel',
    'sms',
    'ws',
    'wss',
] as const;
type Protocol = (typeof protocols)[number];
type AbsoluteUrl = `${Protocol}://${string}` | `${Protocol}:${string}`;

/**
 * Check if a URL is absolute
 * @param url - The URL to check
 * @returns True if the URL is absolute, false otherwise
 */
export const isAbsoluteUrl = (url: unknown): url is AbsoluteUrl => {
    if (!url || typeof url !== 'string') return false;
    try {
        return URL.canParse(url);
    } catch {
        return false;
    }
};
