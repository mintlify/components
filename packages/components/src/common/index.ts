// @mintlify/common

export const CHILD_TAB_IDS_ATTRIBUTE = 'data-child-tab-ids';
export const CHILD_HEADING_IDS_ATTRIBUTE = 'data-child-heading-ids';

type Protocol = 'http' | 'https' | 'ftp' | 'ftps' | 'file' | 'data' | 'mailto' | 'tel' | 'sms' | 'ws' | 'wss';
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

/**
 * Simple slugify function that converts a string into a URL-friendly slug.
 */
export function slugify(str: string): string {
    return str
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
