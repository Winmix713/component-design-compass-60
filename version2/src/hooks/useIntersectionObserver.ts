import React from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
  freezeOnceVisible?: boolean;
}

/**
 * A hook that observes when an element intersects with the viewport
 */
export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = '0%',
  freezeOnceVisible = false,
}: UseIntersectionObserverProps = {}): [
  (node: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined
] {
  const [ref, setRef] = React.useState<Element | null>(null);
  const [entry, setEntry] = React.useState<IntersectionObserverEntry>();
  const frozen = React.useRef(false);

  const isIntersecting = entry?.isIntersecting;

  React.useEffect(() => {
    if (freezeOnceVisible && frozen.current && entry?.isIntersecting) {
      return;
    }

    if (isIntersecting && freezeOnceVisible) {
      frozen.current = true;
    }

    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setEntry(entry);
      },
      { threshold, root, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, root, rootMargin, freezeOnceVisible, isIntersecting]);

  return [setRef, !!isIntersecting, entry];
}
