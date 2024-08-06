import { useRef, useEffect, useCallback, useState } from 'react';

interface ScrollFadeInOptions {
  direction?: 'up' | 'down' | 'left' | 'right' | 'stop';
  duration?: number;
  delay?: number;
}

const useScrollFadeIn = ({
  direction = 'stop',
  duration = 2.5,
  delay = 0,
}: ScrollFadeInOptions = {}) => {
  const element = useRef<HTMLDivElement | any>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleDirection = (name: string) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 50%, 0)';
      case 'down':
        return 'translate3d(0, -50%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      case 'stop':
        return 'translate3d(0, 0, 0)';
      default:
        return '';
    }
  };

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = element;

      if (entry.isIntersecting) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = `${duration}s`;
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = `${delay}`;
        current.style.opacity = '1';
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [delay, duration]
  );

  const handleScrollEvent = useCallback(() => {
    if (element.current) {
      const { top, bottom } = element.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      setIsVisible(top < windowHeight && bottom > 0);
    }
  }, []);

  useEffect(() => {
    let observer: IntersectionObserver;

    if (element.current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(element.current);
    }

    window.addEventListener('scroll', handleScrollEvent, { passive: true });

    return () => {
      observer && observer.disconnect();
      window.removeEventListener('scroll', handleScrollEvent);
    };
  }, [handleScroll, handleScrollEvent]);

  return {
    ref: element,
    style: {
      opacity: isVisible ? 1 : 0,
      transform: handleDirection(direction),
      transition: `opacity ${duration}s ease-in-out, transform ${duration}s ease-in-out`,
      transitionDelay: `${delay}s`,
    },
  };
};

export default useScrollFadeIn;
