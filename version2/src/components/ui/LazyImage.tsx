import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { Spinner } from '@heroui/react';
import { cn } from '../../utils/cn';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  loadingComponent?: React.ReactNode;
}

/**
 * Component for lazy loading images
 */
export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  imgClassName = '',
  loadingComponent = <Spinner size="sm" />,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true,
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setError(true);
    setIsLoaded(true);
  };

  return (
    <div
      ref={ref as (node: Element | null) => void}
      className={cn(
        'relative overflow-hidden',
        isLoaded ? '' : 'bg-default-100',
        className
      )}
      style={{ width, height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          {loadingComponent}
        </div>
      )}
      
      {isIntersecting && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            error ? 'bg-default-200' : '',
            imgClassName
          )}
        />
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-default-200 text-default-500">
          Failed to load image
        </div>
      )}
    </div>
  );
};
