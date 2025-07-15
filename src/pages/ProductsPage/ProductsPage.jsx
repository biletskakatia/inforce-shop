import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "../../redux/productsOps";
import ProductModal from '../../components/ProductModal/ProductModal.jsx';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal.jsx';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import css from './ProductsPage.module.css';


const ProductsPage = () => {
    const dispatch = useDispatch()
    const { items, isLoading, error } = useSelector(state => state.products)

    const [editingProduct, setEditingProduct] = useState(null);
    const [addingMode, setAddingMode] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null)
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    const openEditModal = product => {
        setEditingProduct(product);
        setAddingMode(false)
    }

    const openAddModal = () => {
        setAddingMode(true);
        setEditingProduct(null)
    }
    const closeModal = () => {
        setAddingMode(false)
        setEditingProduct(null)
    };

    const openDeleteModal = product => {
        setProductToDelete(product)
    }

    const closeDeleteModal = () => {
        setProductToDelete(null)
    }

    const handleConfirmDelete = () => {
        dispatch(deleteProduct(productToDelete.id))
        closeDeleteModal()
    }

    return (
        <div className={css.container}>
            <h1 className={css.heading}>Product list</h1>
            <button className={css.addButton} onClick={openAddModal}>Add Product</button>

            {isLoading && <p>Loading...</p>}
            {error && <p className={css.error}>{error}</p>}

            <ul className={css.list} style={{ listStyle: 'none', padding: 0 }}>
                {items.map(product => (
                    <li key={product.id}>
                        <ProductCard
                            product={product}
                            onEdit={() => openEditModal(product)}
                            onDelete={() => openDeleteModal(product)}
                        />
                    </li>
                ))}
            </ul>

            {(editingProduct || addingMode) && (
                <ProductModal
                    product={editingProduct}
                    isEdit={!!editingProduct}
                    onClose={closeModal}
                />
            )}

            {productToDelete && (
                <ConfirmModal
                    message={`Are you sure you want to delete "${productToDelete.name}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={closeDeleteModal}
                />
            )}
        </div>
    )
}
export default ProductsPage