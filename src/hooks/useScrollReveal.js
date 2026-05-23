import { useEffect } from 'react';

/**
 * Attaches IntersectionObserver to all elements with
 * class fade-up / fade-left / fade-right / fade-in.
 * Adds "visible" class when they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const targets = document.querySelectorAll('.fade-up, .fade-left, .fade-right, .fade-in');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
