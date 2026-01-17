export function useHasHover() {
  try {
    return matchMedia('(hover: hover)').matches;
  } catch {
    // assume that if browser too old to support matchMedia it's likely not a touch device
    return true;
  }
}
