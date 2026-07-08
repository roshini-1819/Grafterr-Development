import PropTypes from 'prop-types';
import styles from './FloatingShape.module.css';


function FloatingShape({ type, color, size, top, left, right, delay = 0 }) {
  const classes = [styles.shape, styles[type], styles[color]].join(' ');

  const style = {
    '--size': `${size}px`,
    '--delay': `${delay}s`,
    top,
    left,
    right,
  };

  return <span aria-hidden="true" className={classes} style={style} />;
}

FloatingShape.propTypes = {
  type: PropTypes.oneOf(['circle', 'rectangle']).isRequired,
  color: PropTypes.oneOf(['teal', 'coral']).isRequired,
  size: PropTypes.number.isRequired,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  delay: PropTypes.number,
};

export default FloatingShape;
