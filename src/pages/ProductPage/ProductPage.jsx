import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../../redux/productsOps';
import { fetchComments } from '../../redux/commentsOps';
import ProductModal from '../../components/ProductModal/ProductModal';
import CommentBlock from '../../components/CommentBlock/CommentBlock';
import css from './ProductPage.module.css';

const ProductPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false);

    const { items, isLoading } = useSelector(state => state.products);
    const product = items.find(p => String(p.id) === id);

    useEffect(() => {
        if (!items.length) {
            dispatch(fetchProducts());
        }
    }, [dispatch, items.length]);

    useEffect(() => {
        if (product) {
            dispatch(fetchComments(id));
        }
    }, [dispatch, id, product]);

    const closeModal = () => setIsEdit(false);

    if (isLoading || !items.length) return <p>Loading product...</p>;
    if (!product) return <p style={{ color: 'red' }}>Product not found.</p>;

    return (
        <div className={css.container}>
            <Link to="/" className={css.backLink}>← Back to Products</Link>

            <h1 className={css.title}>{product.name}</h1>
            <img src={product.imageUrl} alt={product.name} className={css.image} />
            <p className={css.info}><strong>Weight:</strong> {product.weight}</p>
            <p className={css.info}><strong>Count:</strong> {product.count}</p>
            <p className={css.info}><strong>Size:</strong> {product.size.width}×{product.size.height}</p>

            <button className={css.editBtn} onClick={() => setIsEdit(true)}>Edit Product</button>

            <h2>Comments</h2>
            <CommentBlock productId={id} />

            {isEdit && (
                <ProductModal
                    product={product}
                    isEdit={true}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default ProductPage;