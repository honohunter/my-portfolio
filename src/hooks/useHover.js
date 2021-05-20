import React from 'react';

export default function useHover() {
  const [isHovered, setHovered] = React.useState(false);
  const [isHoveredOnce, setHoveredOnce] = React.useState(false);
  const ref = React.useRef(null);

  const handleMouseOver = () => setHovered(true);
  const handleMouseOut = () => setHovered(false);

  React.useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseenter', handleMouseOver);
        node.addEventListener('mouseleave', handleMouseOut);
        return () => {
          node.removeEventListener('mouseenter', handleMouseOver);
          node.removeEventListener('mouseleave', handleMouseOut);
        };
      }
    },
    [], // Recall only if ref changes
  );

  React.useEffect(() => {
    if (isHovered) setHoveredOnce(true);
  }, [isHovered]);

  return { ref, isHovered, isHoveredOnce };
}
