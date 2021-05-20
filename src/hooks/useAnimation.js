/* eslint-disable consistent-return */
import React from 'react';

export default function useAnimation({ animation, delay, duration, prefix = 'animate__' }) {
  const animationName = `${prefix}${animation}`;
  const ref = React.useRef(null);
  const [isAnimationEnded, setAnimationEnded] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;

    if (node) {
      const handleAnimationEnd = event => {
        event.stopPropagation();
        node.classList.remove(`${prefix}animated`, animationName);
        setAnimationEnded(true);
      };

      if (delay) {
        node.style.setProperty('--animate-delay', `${delay}ms`);
        node.classList.add('animate__delay-1s');
      }

      if (duration) {
        node.style.setProperty('--animate-duration', `${duration}ms`);
      }

      if (animation) node.classList.add(`${prefix}animated`, animationName);

      node.addEventListener('animationend', handleAnimationEnd, { once: true });

      return () => {
        node.removeEventListener('animationend', handleAnimationEnd);
      };
    }
  }, [animation, animationName, delay, duration, prefix]);

  return { ref, isAnimationEnded };
}
