export function getUnicodeId(title: string): string {
    return encodeURIComponent(title.toLowerCase().trim().replace(/\s+/g, '-'));
}
