import PropTypes from 'prop-types';
import { useCarousel } from '../../hooks/useCarousel';
import ProductCard from './ProductCard';
import styles from './Carousel.module.css';

function Chevron({ direction }) {
  const d =
    direction === 'prev' ? 'M20 12H4M10 6l-6 6 6 6' : 'M4 12h16M14 6l6 6-6 6';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

Chevron.propTypes = { direction: PropTypes.oneOf(['prev', 'next']).isRequired };


function Carousel({ products, config }) {
  const {
    itemsPerView = { mobile: 1, tablet: 2, desktop: 3 },
    showArrows = true,
    disableAtBoundaries = true,
    labels = { prev: 'Previous', next: 'Next' },
  } = config || {};

  const {
    index,
    perView,
    canPrev,
    canNext,
    offsetPercent,
    isDragging,
    prev,
    next,
    touchHandlers,
  } = useCarousel(products.length, { itemsPerView });

  const prevDisabled = disableAtBoundaries && !canPrev;
  const nextDisabled = disableAtBoundaries && !canNext;

 
  const total = products.length;
  const fillWidthPct = Math.min(100, (perView / total) * 100);
  const fillShiftPct = perView > 0 ? (index / perView) * 100 : 0;

  return (
    <div className={styles.carousel}>
      <div
        className={styles.progress}
        role="progressbar"
        aria-label="Carousel progress"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={index + perView}
      >
        <span
          className={styles.progressFill}
          style={{ '--fill-w': `${fillWidthPct}%`, '--fill-shift': `${fillShiftPct}%` }}
        />
      </div>

      <div
        className={styles.viewport}
        {...touchHandlers}
        role="group"
        aria-roledescription="carousel"
        aria-label="Products"
      >
        <ul
          className={`${styles.track} ${isDragging ? styles.dragging : ''}`}
          style={{ '--offset': `${offsetPercent}%`, '--per-view': perView }}
        >
          {products.map((product, i) => {
            const visible = i >= index && i < index + perView;
            return (
              <li
                key={product.id}
                className={styles.slide}
                aria-hidden={!visible}
              >
                <ProductCard product={product} />
              </li>
            );
          })}
        </ul>
      </div>

      {showArrows && (
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.arrow}
            onClick={prev}
            disabled={prevDisabled}
            aria-label={labels.prev}
          >
            <Chevron direction="prev" />
          </button>
          <button
            type="button"
            className={styles.arrow}
            onClick={next}
            disabled={nextDisabled}
            aria-label={labels.next}
          >
            <Chevron direction="next" />
          </button>
        </div>
      )}
    </div>
  );
}

Carousel.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.string.isRequired })
  ).isRequired,
  config: PropTypes.shape({
    itemsPerView: PropTypes.object,
    showArrows: PropTypes.bool,
    disableAtBoundaries: PropTypes.bool,
    labels: PropTypes.object,
  }),
};

export default Carousel;
