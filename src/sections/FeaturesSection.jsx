import PropTypes from 'prop-types';
import FloatingShape from '../components/ui/FloatingShape';
import Carousel from '../components/ui/Carousel';
import Skeleton from '../components/ui/Skeleton';
import styles from './FeaturesSection.module.css';


export function FeaturesSkeleton() {
  return (
    <section className={styles.features}>
      <div className={styles.inner}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.titleSkeleton}>
              <Skeleton
                width="min(760px, 92%)"
                height="clamp(1.8rem, 1.1rem + 2.6vw, 3rem)"
                radius="10px"
              />
              <Skeleton
                width="min(500px, 62%)"
                height="clamp(1.8rem, 1.1rem + 2.6vw, 3rem)"
                radius="10px"
              />
            </div>
            <div className={styles.subTextSkeleton}>
              <Skeleton width="min(640px, 95%)" height="0.9rem" variant="text" />
              <Skeleton width="min(420px, 62%)" height="0.9rem" variant="text" />
            </div>
          </div>
          <Skeleton
            className={styles.dividerSkeleton}
            width="319px"
            height="4px"
            radius="8px"
          />
        </div>

        <div className={styles.carouselWrap}>
          <div className={styles.cardsSkeleton}>
            {[0, 1, 2].map((i) => (
              <div key={i} className={styles.cardSkeleton}>
                <Skeleton
                  width="55%"
                  height="clamp(1.4rem, 1rem + 1.2vw, 2.125rem)"
                  radius="8px"
                />
                <Skeleton
                  className={styles.cardImageSkeleton}
                  width="100%"
                  height="auto"
                  radius="16px"
                />
              </div>
            ))}
          </div>
          <div className={styles.controlsSkeleton}>
            <Skeleton width="60px" height="60px" variant="circle" />
            <Skeleton width="60px" height="60px" variant="circle" />
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection({ features }) {
  const {
    titlePrefix,
    titleAccent,
    titleSuffix,
    subtitle,
    products,
    carousel,
    shapes = [],
  } = features;

  return (
    <section className={`${styles.features} fade-in`} id="products">
      <div className={styles.shapes} aria-hidden="true">
        {shapes.map((shape, i) => (
          <FloatingShape key={i} {...shape} />
        ))}
      </div>

      <div className={styles.inner}>
        <div className="container">
          <header className={styles.header}>
            <h2 className={styles.title}>
              {titlePrefix} <span className={styles.accent}>{titleAccent}</span>{' '}
              {titleSuffix}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </header>
        </div>

       
        <div className={styles.carouselWrap}>
          <Carousel products={products} config={carousel} />
        </div>
      </div>
    </section>
  );
}

FeaturesSection.propTypes = {
  features: PropTypes.shape({
    titlePrefix: PropTypes.string.isRequired,
    titleAccent: PropTypes.string.isRequired,
    titleSuffix: PropTypes.string,
    subtitle: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    carousel: PropTypes.object,
    shapes: PropTypes.array,
  }).isRequired,
};

export default FeaturesSection;
