import PropTypes from 'prop-types';
import GradientButton from './GradientButton';
import styles from './ErrorState.module.css';

function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.icon} aria-hidden="true">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 8.5v4m0 3.5h.01M10.3 3.9 2.4 17.6A1.9 1.9 0 0 0 4 20.5h16a1.9 1.9 0 0 0 1.6-2.9L13.7 3.9a1.9 1.9 0 0 0-3.4 0Z"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <h2 className={styles.title}>Something went wrong</h2>
      <p className={styles.message}>{message}</p>
      <GradientButton onClick={onRetry} size="md">
        Retry
      </GradientButton>
    </div>
  );
}

ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

ErrorState.defaultProps = {
  message: 'We couldn’t load this content. Please try again.',
};

export default ErrorState;
