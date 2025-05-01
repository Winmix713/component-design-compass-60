import React from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: HTMLElement;
}

/**
 * Portal component for rendering content outside the normal DOM hierarchy
 */
export const Portal: React.FC<PortalProps> = ({ 
  children, 
  container = document.body 
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted ? createPortal(children, container) : null;
};
