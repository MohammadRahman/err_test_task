import { useState, useRef, useEffect } from "react";
import { TbLibraryPlus } from "react-icons/tb";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import styles from './card.module.scss';

interface CardProps {
  items: {
    id: number;
    verticalPhotos: { photoUrlBase: string }[];
  }[][];
}

const Card = ({ items }: CardProps) => {

  const itemsToRender = items[0] || [];

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
        {itemsToRender.map((el) => (
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
