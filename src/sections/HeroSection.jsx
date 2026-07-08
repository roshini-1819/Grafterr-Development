import PropTypes from 'prop-types';
import GradientText from '../components/ui/GradientText';
import GradientButton from '../components/ui/GradientButton';
import Skeleton from '../components/ui/Skeleton';
import styles from './HeroSection.module.css';


export function HeroSkeleton() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.headlineSkeleton}>
          <Skeleton
            width="min(660px, 80%)"
            height="clamp(2.4rem, 1.3rem + 4.4vw, 4.1rem)"
            radius="12px"
          />
          <Skeleton
            width="min(800px, 94%)"
            height="clamp(2.4rem, 1.3rem + 4.4vw, 4.1rem)"
            radius="12px"
          />
        </div>
        <div className={styles.subSkeleton}>
          <Skeleton width="min(620px, 88%)" height="1.05rem" variant="text" />
          <Skeleton width="min(430px, 62%)" height="1.05rem" variant="text" />
        </div>
        <Skeleton width="318px" height="60px" radius="60px" />
      </div>
    </section>
  );
}

function HeroSection({ hero }) {
  const { headlinePrefix, headlineGradient, subheadline, cta } = hero;

  return (
    <section className={`${styles.hero} fade-in`} id="top">
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.headline}>
          {headlinePrefix}
          <br />
          <GradientText>{headlineGradient}</GradientText>
        </h1>

        <p className={styles.subheadline}>
          {subheadline.prefix}
          <strong className={styles.emphasis}>{subheadline.emphasis}</strong>
          {subheadline.suffix}
        </p>

        <GradientButton href={cta.href} size="md" className={styles.cta}>
          {cta.label}
        </GradientButton>
      </div>
    </section>
  );
}

HeroSection.propTypes = {
  hero: PropTypes.shape({
    headlinePrefix: PropTypes.string.isRequired,
    headlineGradient: PropTypes.string.isRequired,
    subheadline: PropTypes.shape({
      prefix: PropTypes.string,
      emphasis: PropTypes.string.isRequired,
      suffix: PropTypes.string,
    }).isRequired,
    cta: PropTypes.object.isRequired,
  }).isRequired,
};

export default HeroSection;
