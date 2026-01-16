import isEqual from 'lodash/isEqual';
import { copyToClipboard } from '@/utils/copyToClipboard';

export const CONNECTING_CHARACTER = ':';

export function getInitialOpenState() {
  return (id: string, parentIds: string[]): boolean => {
    const hash =
      typeof window !== 'undefined' ? window.location.hash.substring(1) : '';

    if (!hash) return false;

    const hashes = hash.split(CONNECTING_CHARACTER);
    if (hashes.length > parentIds.length) {
      return isEqual(parentIds, hashes.slice(0, parentIds.length)) && hashes[parentIds.length] === id;
    }
    return false;
  };
}

export function updateAndCopyUrl() {
  const buildHistoryUrl = (idsString: string) => {
    const url = new URL(window.location.href);
    url.hash = idsString;
    return url.toString();
  };

  function updateAndCopy(ids: string[]) {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !document.hasFocus()
    ) {
      return;
    }
    const idsString = ids.join(CONNECTING_CHARACTER);
    const newUrl = buildHistoryUrl(idsString);
    void copyToClipboard(newUrl);
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }

  return (isOpen: boolean, id: string | undefined, parentIds: string[]) => {
    if (isOpen) {
      if (id) {
        updateAndCopy([...parentIds, id]);
      }
    } else {
      if (parentIds.length > 0) {
        updateAndCopy(parentIds);
      } else {
        if (
          typeof window === 'undefined' ||
          typeof document === 'undefined' ||
          !document.hasFocus()
        ) {
          return;
        }
        const newUrl = buildHistoryUrl('');
        window.history.replaceState(
          { ...window.history.state, as: newUrl, url: newUrl },
          '',
          newUrl
        );
      }
    }
  };
}
