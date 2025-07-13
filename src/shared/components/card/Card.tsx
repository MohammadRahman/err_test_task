import { useState, useRef, useEffect } from "react";
import { TbLibraryPlus } from "react-icons/tb";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import styles from './card.module.scss';

// import { useState, useRef, useEffect } from 'react';
// import { TiChevronLeft, TiChevronRight } from 'react-icons/ti';
// import { TbLibraryPlus } from 'react-icons/tb';
// import styles from './card.module.scss';

interface CardProps {
  items: {
    id: number;
    verticalPhotos: { photoUrlBase: string }[];
  }[];
}

const Card = ({ items }: CardProps) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const itemsPerScroll = 7;
  const itemWidth = 190;

  const checkScrollPosition = () => {
    if (carouselRef.current) {
      const { scrollLeft } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemsPerScroll * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemsPerScroll * itemWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className={styles.card}>
      {/* Left Navigation Button */}
      {showLeftArrow && (
        <div 
          onClick={scrollLeft} 
          className={`${styles.card__navButtonContainer} ${styles['card__navButtonContainer--left']}`}
        >
          <button className={styles['card__navButton--left']}>
            <TiChevronLeft size={24}/>
          </button>
        </div>
      )}
      
      {/* Carousel Container */}
      <div ref={carouselRef} className={styles.card__carousel}>
        {items[0].map((el) => (
          <div
            key={el.id}
            className={styles.card__item}
            onMouseEnter={() => setHoveredCardId(el.id)}
            onMouseLeave={() => setHoveredCardId(null)}
          >
            <img
              src={el.verticalPhotos[0]?.photoUrlBase ?? ''}
              alt=""
            />
            {hoveredCardId === el.id && (
              <div className={styles.card__hoverIcon}>
                <TbLibraryPlus size={25} />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Navigation Button */}
      <div 
        onClick={scrollRight} 
        className={`${styles.card__navButtonContainer} ${styles['card__navButtonContainer--right']}`}
      >
        <button className={styles['card__navButton--right']}>
          <TiChevronRight size={24}/>
        </button>
      </div>
    </div>
  );
};

export default Card;

// interface CardItem {
//   id: number;
//   verticalPhotos: { photoUrlBase: string }[];
// }

// interface CardProps {
//   items: CardItem[];
// }
// const Card = ({ items }: CardProps) => {
//   const [hoveredCardId, setHoveredCardId] = useState(null);
//   const [showLeftArrow, setShowLeftArrow] = useState(false);
//   const carouselRef = useRef<HTMLDivElement>(null);
//   const itemsPerScroll = 7;
//   const itemWidth = 190;
//   // const gap = 16;

//   const checkScrollPosition = () => {
//     if (carouselRef.current) {
//       const { scrollLeft } = carouselRef.current;
//       setShowLeftArrow(scrollLeft > 0);
//     }
//   }

//   useEffect(() => {
//     const carousel = carouselRef.current;
//     if (carousel) {
//       carousel.addEventListener('scroll', checkScrollPosition);
//       return () => carousel.removeEventListener('scroll', checkScrollPosition);
//     }
//   }, []);

//   const scrollLeft = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({
//         left: -itemsPerScroll * itemWidth,
//         behavior: 'smooth'
//       });
//     }
//   };

//   const scrollRight = () => {
//     if (carouselRef.current) {
//       carouselRef.current.scrollBy({
//         left: itemsPerScroll * itemWidth,
//         behavior: 'smooth'
//       });
//     }
//   };

//   return (
//     <div 
//     className="card">
//       {/* Left Navigation Button */}
//       {showLeftArrow && (
//         <div onClick={scrollLeft} 
//         style={{
//           position: 'absolute',
//           left: 0,
//           top: 0,
//           background: "linear-gradient(to right, rgba(32, 52, 67, .4)0%, rgba(32, 52, 67, .4) 15%, rgba(32, 52, 67, .8) 85%, rgba(32, 52, 67, .8) 100%)",
//           width: "50px",
//           height: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000,
//           borderBottomRightRadius: "50%",
//           borderTopRightRadius: "50%"
//         }}
//         >
//           <button
//             style={{
//               position: 'absolute',
//               left: 0,
//               top: '50%',
//               transform: 'translateY(-50%)',
//               zIndex: 2,
//               background: 'white',
//               border: 'none',
//               borderRadius: '50%',
//               width: '30px',
//               height: '30px',
//               color: 'black',
//               cursor: 'pointer',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//           >
//             <TiChevronLeft size={24}/>
//           </button>
//         </div>
//       )}
      
//       {/* Carousel Container */}
//       <div 
//         ref={carouselRef}
//         className="card__carousel"
  
//       >
//         {items[0].map((el) => {
//           return(
//           <div
//             key={el.id}
//             className="card__item"

//             onMouseEnter={() => setHoveredCardId(el.id)}
//             onMouseLeave={() => setHoveredCardId(null)}
//           >
//             <img
//               src={el.verticalPhotos[0]?.photoUrlBase ?? ''}
//               alt=""

//             />
//             {hoveredCardId === el.id && (
//               <div 
//               className="card__hoverIcon"
//               >
//                 <TbLibraryPlus size={25} />
//               </div>
//             )}
//           </div>
//         )})}
//       </div>

//       {/* Right Navigation Button */}
//       <div onClick={scrollRight} 
//         style={{
//           position: 'absolute',
//           right: 0,
//           top: 0,
//           background: "linear-gradient(to right, rgba(32, 52, 67, .4)0%, rgba(32, 52, 67, .4) 15%, rgba(32, 52, 67, .8) 85%, rgba(32, 52, 67, .8) 100%)",
//           width: "50px",
//           height: "100%",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 1000,
//           borderBottomLeftRadius: "50%",
//           borderTopLeftRadius: "50%"
//         }}
//       >
//         <button
//           style={{
//             position: 'absolute',
//             right: 0,
//             top: '50%',
//             transform: 'translateY(-50%)',
//             zIndex: 2,
//             background: 'white',
//             border: 'none',
//             borderRadius: '50%',
//             width: '40px',
//             height: '40px',
//             color: 'black',
//             cursor: 'pointer',
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center'
//           }}
//         >
//           <TiChevronRight size={24}/>
//         </button>
//       </div>
//     </div>
//   );
// };
// export default Card;