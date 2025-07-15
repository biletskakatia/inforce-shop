import { Link } from 'react-router-dom';
import css from './ProductCard.module.css';

const ProductCard = ({ product, onEdit, onDelete }) => {
const { id, name, imageUrl, count, weight, size } = product

return (
    <div className={css.card}>
        <img src={imageUrl} alt={name} className={css.image} />

        <div className={css.details}>
            <h3>{name}</h3>
            <p><strong>Count:</strong> {count}</p>
            <p><strong>Weight:</strong> {weight}</p>
            <p><strong>Size:</strong> {size.width}×{size.height}</p>
        </div>

        <div className={css.actions}>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
            <Link to={`/product/${id}`} className={css.viewLink}>View</Link>
        </div>
    </div>
)
}

export default ProductCard;