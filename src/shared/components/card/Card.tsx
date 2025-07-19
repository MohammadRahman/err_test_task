import { useState, useRef, useEffect } from "react";
import { TbLibraryPlus } from "react-icons/tb";
import { TiChevronLeft, TiChevronRight } from "react-icons/ti";
import styles from "./card.module.scss";

interface CardProps {
  items: {
    id: number;
    verticalPhotos: { photoUrlBase: string }[];
  }[][];
}

const Card = ({ items }: CardProps) => {
  const itemsToRender = items[0] || [];

  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);
  const [showToolTip, setShowToolTip] = useState(false);
  const [showIcon, setShowIcon] = useState(true); // Initialize as true
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
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
      carousel.addEventListener("scroll", checkScrollPosition);
      return () => carousel.removeEventListener("scroll", checkScrollPosition);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -itemsPerScroll * itemWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: itemsPerScroll * itemWidth,
        behavior: "smooth",
      });
    }
  };

  function handleHoverIcon() {
    setShowToolTip(true);
    setShowIcon(true); // Keep icon visible initially
  }

  function handleTooltipMouseEnter() {
    setShowToolTip(true);
    setShowIcon(false); // Hide icon when hovering tooltip
  }

  function handleTooltipMouseLeave() {
    setShowToolTip(false);
    setShowIcon(true); // Show icon again when leaving tooltip
  }

  function handleMouseLeaveCard() {
    setHoveredCardId(null);
    setShowIcon(false);
    setShowToolTip(false);
  }

  return (
    <div className={styles.card}>
      {/* Left Navigation Button */}
      {showLeftArrow && (
        <div
          onClick={scrollLeft}
          className={`${styles.card__navButtonContainer} ${styles["card__navButtonContainer--left"]}`}
        >
          <button className={styles["card__navButton--left"]}>
            <TiChevronLeft size={24} />
          </button>
        </div>
      )}

      {/* Carousel Container */}
      <div ref={carouselRef} className={styles.card__carousel}>
        {itemsToRender.map((el) => (
          <div
            key={el.id}
            className={styles.card__item}
            onMouseEnter={() => {
              setHoveredCardId(el.id);
              setShowIcon(true);
            }}
            onMouseLeave={handleMouseLeaveCard}
          >
            <img src={el.verticalPhotos[0]?.photoUrlBase ?? ""} alt="" />
            {hoveredCardId === el.id && (
              <div className={styles.card__hoverIcon}>
                {showIcon && (
                  <div
                    ref={iconRef}
                  >
                    <TbLibraryPlus
                      size={25}
                      onMouseOver={handleHoverIcon}
                      onMouseLeave={() => {
                        if (!textRef.current?.matches(":hover")) {
                          setShowToolTip(false);
                        }
                      }}
                    />
                  </div>
                )}

                {showToolTip && (
                  <div
                    ref={textRef}
                    onMouseEnter={handleTooltipMouseEnter}
                    onMouseLeave={handleTooltipMouseLeave}
                    className={styles.card__tooltip}
                    // style={{
                    //   width: "fit-content",
                    //   height: "30px",
                    //   background: "black",
                    //   border: "1px solid white",
                    //   borderRadius: "4px",
                    //   opacity: "0.7",
                    //   padding: "5px",
                    //   marginTop: "-1px",
                    // }}
                  >
                    <p className={styles.card__tooltipText}>
                      Lisa lemmikuesse
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Navigation Button */}
      <div
        onClick={scrollRight}
        className={`${styles.card__navButtonContainer} ${styles["card__navButtonContainer--right"]}`}
      >
        <button className={styles["card__navButton--right"]}>
          <TiChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Card;
