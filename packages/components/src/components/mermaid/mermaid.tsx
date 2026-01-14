'use client';

import mermaid, { MermaidConfig } from 'mermaid';
import { ReactElement, useEffect, useId, useRef, useState } from 'react';

import { cn } from '@/utils/cn';
import { ZoomControls } from './ZoomControls';
import { usePanZoom } from './usePanZoom';

const MIN_HEIGHT_FOR_CONTROLS = 120;

const getIsDarkTheme = () => document.documentElement.classList.contains('dark');

export type MermaidProps = {
  /** The mermaid chart definition string */
  chart: string;
  /** Additional CSS classes for the root element */
  className?: string;
};

export function Mermaid({ chart, className }: MermaidProps): ReactElement {
  const id = useId();
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { style, zoomIn, zoomOut, reset, pan, panStep } = usePanZoom();

  useEffect(() => {
    setIsDarkTheme(getIsDarkTheme());

    const mutationObserver = new MutationObserver(() => {
      setIsDarkTheme(getIsDarkTheme());
    });

    mutationObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  // Reset transform state and error when chart changes
  useEffect(() => {
    reset();
    setError(null);
  }, [chart, reset]);

  useEffect(() => {
    let cancelled = false;

    const renderChart = async () => {
      const mermaidConfig: MermaidConfig = {
        startOnLoad: false,
        fontFamily: 'inherit',
        theme: isDarkTheme ? 'dark' : 'default',
      };

      // create a temporary container for mermaid to render into
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '-9999px';
      document.body.appendChild(tempContainer);

      try {
        mermaid.initialize(mermaidConfig);

        const uniqueId = `mermaid-${id.replace(/:/g, '')}-${Date.now()}`;

        const { svg } = await mermaid.render(uniqueId, chart, tempContainer);

        if (!cancelled) {
          setSvg(svg);
          setError(null);
        }
      } catch (err) {
        console.error('Error while rendering mermaid', err);
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Failed to render diagram';
          setError(message);
          setSvg('');
        }
      } finally {
        document.body.removeChild(tempContainer);
      }
    };

    renderChart().catch(console.error);

    return () => {
      cancelled = true;
    };
  }, [chart, id, isDarkTheme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const height = entry.contentRect.height;
        setShowControls(height >= MIN_HEIGHT_FOR_CONTROLS);
      }
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, [svg]);

  if (error) {
    return (
      <div
        className={cn(
          'rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400',
          className
        )}
        role="alert"
      >
        <p className="font-medium">Failed to render diagram</p>
        <p className="mt-1 text-xs opacity-80">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn('group relative overflow-hidden', className)}>
      {showControls && (
        <ZoomControls
          onZoomIn={zoomIn}
          onZoomOut={zoomOut}
          onReset={reset}
          onPan={pan}
          panStep={panStep}
        />
      )}
      <div
        ref={containerRef}
        dangerouslySetInnerHTML={{ __html: svg }}
        className="mermaid"
        data-component-part="diagram"
        style={style}
        role="img"
        aria-label="Mermaid diagram"
      />
    </div>
  );
}
