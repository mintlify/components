import clsx from 'clsx';
import mermaid from 'mermaid';
import React, { useEffect } from 'react';

mermaid.initialize({
  startOnLoad: true,
});

const Mermaid = ({ children, className }: { children: string; className?: string }) => {
  useEffect(() => {
    mermaid.contentLoaded();
  }, [children]);

  return <div className={clsx('mermaid', className)}>{children}</div>;
};

export default Mermaid;
