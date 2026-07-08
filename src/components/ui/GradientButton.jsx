import PropTypes from 'prop-types';
import styles from './GradientButton.module.css';


function GradientButton({
  children,
  href,
  onClick,
  variant = 'solid',
  size = 'md',
  type = 'button',
  className = '',
  ...rest
}) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick} {...rest}>
        <span className={styles.label}>{children}</span>
      </a>
    );
  }

  return (
    <button className={classes} type={type} onClick={onClick} {...rest}>
      <span className={styles.label}>{children}</span>
    </button>
  );
}

GradientButton.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['solid', 'outline']),
  size: PropTypes.oneOf(['md', 'lg']),
  type: PropTypes.string,
  className: PropTypes.string,
};

export default GradientButton;
