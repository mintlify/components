import { CSSProperties, useCallback, useMemo, useState } from 'react';

const MIN_SCALE = 0.25;
const MAX_SCALE = 4;
const ZOOM_STEP = 0.15;
const PAN_STEP = 50;

type Transform = {
  scale: number;
  x: number;
  y: number;
};

export type UsePanZoomReturn = {
  style: CSSProperties;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;
  pan: (dx: number, dy: number) => void;
  panStep: number;
};

const DEFAULT_TRANSFORM: Transform = { scale: 1, x: 0, y: 0 };

export const usePanZoom = (): UsePanZoomReturn => {
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM);

  const zoomIn = useCallback(() => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.min(prev.scale + ZOOM_STEP, MAX_SCALE),
    }));
  }, []);

  const zoomOut = useCallback(() => {
    setTransform((prev) => ({
      ...prev,
      scale: Math.max(prev.scale - ZOOM_STEP, MIN_SCALE),
    }));
  }, []);

  const reset = useCallback(() => {
    setTransform(DEFAULT_TRANSFORM);
  }, []);

  const pan = useCallback((dx: number, dy: number) => {
    setTransform((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  }, []);

  const style = useMemo<CSSProperties>(
    () => ({
      transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
      transformOrigin: 'center center',
      transition: 'transform 0.15s ease-out',
    }),
    [transform.scale, transform.x, transform.y]
  );

  return {
    style,
    zoomIn,
    zoomOut,
    reset,
    pan,
    panStep: PAN_STEP,
  };
};
