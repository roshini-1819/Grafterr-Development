import PropTypes from 'prop-types';
import styles from './Skeleton.module.css';


function Skeleton({
  width = '100%',
  height = '1rem',
  radius = 'var(--radius-sm)',
  variant = 'block',
  className = '',
}) {
  const style = { '--sk-w': width, '--sk-h': height, '--sk-r': radius };
  return (
    <span
      aria-hidden="true"
      className={`${styles.skeleton} ${styles[variant]} ${className}`.trim()}
      style={style}
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  radius: PropTypes.string,
  variant: PropTypes.oneOf(['block', 'circle', 'text']),
  className: PropTypes.string,
};

export default Skeleton;
