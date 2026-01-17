import mermaid, { MermaidConfig } from 'mermaid';
import { ReactElement, useEffect, useId, useRef, useState } from 'react';

import { Classes } from '@/lib/local/selectors';
import { cn } from '@/utils/cn';
import { ZoomControls } from './ZoomControls';
import { usePanZoom } from './usePanZoom';
import { useIsDarkTheme } from '@/hooks/useIsDarkTheme';

const MIN_HEIGHT_FOR_CONTROLS = 120;

export type MermaidProps = {
  chart: string;
  className?: string;
  ariaLabel?: string;
};

export function Mermaid({ chart, className, ariaLabel = 'Mermaid diagram' }: MermaidProps): ReactElement {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showControls, setShowControls] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const id = useId();

  const { isDarkTheme } = useIsDarkTheme();

  const { style, zoomIn, zoomOut, reset, pan, panStep } = usePanZoom();

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
          Classes.Mermaid,
          'rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400',
          className
        )}
        role="alert"
        data-component-part="mermaid-error"
      >
        <p className="font-medium" data-component-part="mermaid-error-title">Failed to render diagram</p>
        <p className="mt-1 text-xs" data-component-part="mermaid-error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className={cn(Classes.Mermaid, 'group relative overflow-hidden', className)}>
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
        data-component-part="mermaid-diagram"
        style={style}
        role="img"
        aria-label={ariaLabel}
      />
    </div>
  );
}
