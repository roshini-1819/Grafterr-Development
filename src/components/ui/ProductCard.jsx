import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';


function ProductCard({ product }) {
  const { name, image } = product;

  return (
    <article className={styles.card}>
      <h3 className={styles.name}>{name}</h3>
      <div className={styles.media}>
        <img
          className={styles.image}
          src={image}
          alt={`${name} — Grafterr product`}
          width="440"
          height="600"
        />
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
