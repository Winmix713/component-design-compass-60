import React from 'react';
import { cn } from '../../utils/cn';

type TransitionProps = {
  children: React.ReactNode;
  show?: boolean;
  appear?: boolean;
  className?: string;
  enter?: string;
  enterFrom?: string;
  enterTo?: string;
  leave?: string;
  leaveFrom?: string;
  leaveTo?: string;
  beforeEnter?: () => void;
  afterEnter?: () => void;
  beforeLeave?: () => void;
  afterLeave?: () => void;
};

/**
 * A component for adding transitions to elements
 */
export const Transition: React.FC<TransitionProps> = ({
  children,
  show = true,
  appear = false,
  className = '',
  enter = 'transition-opacity duration-300',
  enterFrom = 'opacity-0',
  enterTo = 'opacity-100',
  leave = 'transition-opacity duration-300',
  leaveFrom = 'opacity-100',
  leaveTo = 'opacity-0',
  beforeEnter,
  afterEnter,
  beforeLeave,
  afterLeave,
}) => {
  const [state, setState] = React.useState<'enter' | 'leave' | 'entered' | 'left'>(
    show ? (appear ? 'enter' : 'entered') : 'left'
  );

  const elementRef = React.useRef<HTMLDivElement>(null);
  const transitionEndRef = React.useRef<(() => void) | null>(null);

  React.useEffect(() => {
    if (show && state === 'left') {
      beforeEnter?.();
      setState('enter');
    } else if (!show && state === 'entered') {
      beforeLeave?.();
      setState('leave');
    }
  }, [show, state, beforeEnter, beforeLeave]);

  React.useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleTransitionEnd = () => {
      if (transitionEndRef.current) {
        transitionEndRef.current();
        transitionEndRef.current = null;
      }
    };

    element.addEventListener('transitionend', handleTransitionEnd);
    return () => {
      element.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, []);

  React.useEffect(() => {
    if (state === 'enter') {
      const frame = requestAnimationFrame(() => {
        setState('entered');
        transitionEndRef.current = () => {
          afterEnter?.();
        };
      });
      return () => cancelAnimationFrame(frame);
    } else if (state === 'leave') {
      const frame = requestAnimationFrame(() => {
        setState('left');
        transitionEndRef.current = () => {
          afterLeave?.();
        };
      });
      return () => cancelAnimationFrame(frame);
    }
  }, [state, afterEnter, afterLeave]);

  if (state === 'left') return null;

  const transitionClasses = cn(
    className,
    state === 'enter' ? cn(enter, enterFrom) : '',
    state === 'entered' ? cn(enter, enterTo) : '',
    state === 'leave' ? cn(leave, leaveFrom) : '',
    state === 'left' ? cn(leave, leaveTo) : ''
  );

  return (
    <div ref={elementRef} className={transitionClasses}>
      {children}
    </div>
  );
};
