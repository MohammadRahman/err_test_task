// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-unsafe-function-type */
// // hooks/useScrollGradient.ts

import { useEffect, useState } from 'react';

// hooks/useScrollGradient.ts
export const useScrollGradient = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const categories = document.querySelectorAll('[data-category]');
      const triggerPosition = 100; // 100px from top

      categories.forEach((category) => {
        const rect = category.getBoundingClientRect();
        // Trigger when top is between 100px and 200px from viewport top
        if (rect.top <= triggerPosition && rect.top > -rect.height + triggerPosition) {
          setActiveCategory(category.id);
        } else if (activeCategory === category.id) {
          setActiveCategory(null);
        }
      });
    };

    const handleScrollWithRAF = () => requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', handleScrollWithRAF);
    return () => window.removeEventListener('scroll', handleScrollWithRAF);
  }, [activeCategory]);

  return activeCategory;
};

// export const useScrollGradient = () => {
//   const [activeCategory, setActiveCategory] = useState<string | null>(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       const categories = document.querySelectorAll('[data-category]');
//       const triggerPosition = 100; // 100px from top

//       categories.forEach((category) => {
//         const rect = category.getBoundingClientRect();
//         const categoryTop = rect.top;
//         const categoryBottom = rect.bottom;

//         if (categoryTop <= triggerPosition && categoryBottom >= triggerPosition) {
//           setActiveCategory(category.id);
//         }
//       });
//     };

//     const debouncedScroll = debounce(handleScroll, 16);
//     window.addEventListener('scroll', debouncedScroll);
//     return () => window.removeEventListener('scroll', debouncedScroll);
//   }, []);

//   return activeCategory;
// };

// function debounce(func: Function, wait: number) {
//   let timeout: number;
//   return function(this: any, ...args: any[]) {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => func.apply(this, args), wait);
//   };
// }