/**
 * Detects if the device supports hover interactions.
 * Returns true for devices with a primary pointer that can hover (e.g., mouse),
 * and false for touch-only devices.
 */
export function useHasHover(): boolean {
  try {
    return matchMedia('(hover: hover)').matches;
  } catch {
    // Assume that if browser is too old to support matchMedia it's likely not a touch device
    return true;
  }
}
