import { isEqual } from 'lodash';
import { copyToClipboard } from '@/utils/copyToClipboard';

const connectingCharacter = ':';

export function getInitialOpenState() {
  return (id: string, parentIds: string[]): boolean => {
    const hashes =
      typeof window !== 'undefined'
        ? window.location.hash.substring(1).split(connectingCharacter)
        : undefined;

    if (!hashes || hashes.length === 0) return false;
    if (isEqual(parentIds, hashes.slice(0, hashes.indexOf(id)))) {
      return hashes.indexOf(id) === parentIds.length;
    }
    return false;
  };
}

export function updateAndCopyUrl() {
  const buildHistoryUrl = (idsString: string) => {
    return `${window.location.pathname}${idsString ? `#${idsString}` : ''}`;
  };

  function updateAndCopy(ids: string[]) {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !document.hasFocus()
    ) {
      return;
    }
    const idsString = ids.join(connectingCharacter);
    const newUrl = buildHistoryUrl(idsString);
    void copyToClipboard(newUrl);
    window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, '', newUrl);
  }

  return (isOpen: boolean, id: string | undefined, parentIds: string[]) => {
    if (isOpen && id) {
      updateAndCopy([...parentIds, id]);
    } else {
      if (parentIds.length > 0) {
        updateAndCopy(parentIds);
      } else {
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
