import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GradientButton from './GradientButton';
import Skeleton from './Skeleton';
import styles from './Navbar.module.css';

export function NavbarSkeleton() {
  return (
    <header className={styles.navbar}>
      <div className={`container ${styles.inner}`}>
        <Skeleton width="132px" height="30px" radius="8px" />
        <div className={styles.linksSkeleton}>
          <Skeleton width="70px" height="16px" variant="text" />
          <Skeleton width="70px" height="16px" variant="text" />
          <Skeleton width="120px" height="42px" radius="999px" />
        </div>
      </div>
    </header>
  );
}

function Navbar({ navigation }) {
  const [scrolled, setScrolled] = useState(false);
  const { logo, links, cta } = navigation;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={`container ${styles.inner}`} aria-label="Primary">
        <a className={styles.brand} href="#top">
          <img src={logo.src} alt={logo.alt} className={styles.logo} width="150" height="34" />
        </a>

        <ul className={styles.links}>
          {links.map((link) => (
            <li key={link.href}>
              <a className={styles.link} href={link.href}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <GradientButton href={cta.href} size="md">
          {cta.label}
        </GradientButton>
      </nav>
    </header>
  );
}

Navbar.propTypes = {
  navigation: PropTypes.shape({
    logo: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }).isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      })
    ).isRequired,
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Navbar;
