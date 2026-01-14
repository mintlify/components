import { useEffect, useState } from 'react';

/**
 * Detects if the device supports hover interactions.
 * Returns true for devices with a primary pointer that can hover (e.g., mouse),
 * and false for touch-only devices.
 *
 * Uses useEffect to avoid SSR hydration mismatches - always returns true during
 * SSR and initial render, then updates on the client if hover is not supported.
 */
export function useHasHover(): boolean {
  const [hasHover, setHasHover] = useState(true);

  useEffect(() => {
    try {
      const mediaQuery = matchMedia('(hover: hover)');
      setHasHover(mediaQuery.matches);

      // Listen for changes (e.g., when a user connects/disconnects a mouse)
      const handleChange = (e: MediaQueryListEvent) => setHasHover(e.matches);
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch {
      // Browser doesn't support matchMedia, assume hover is supported
      setHasHover(true);
    }
  }, []);

  return hasHover;
}
