import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/productsOps';
import css from './ProductModal.module.css';

const ProductModal = ({ product, onClose, isEdit }) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        count: 0,
        weight: '',
        imageUrl: '',
        size: {
            width: 0,
            height: 0,
        },
    })

    useEffect(() => {
        if (isEdit && product) {
            setFormData(product)
        } else {
        setFormData({
            name: '',
            count: 0,
            weight: '',
            imageUrl: '',
            size: { width: 0, height: 0 },
            })
        }
    }, [isEdit, product])

    const handleChange = e => {
        const { name, value } = e.target
        
        if (name === 'width' || name === 'height') {
            setFormData(prev => ({
                ...prev,
                size: {
                    ...prev.size,
                    [name]: Number(value),
                },
            }))
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: name === 'count' ? Number(value) : value,
            }))
        }
    }

    const handleSubmit = e => {
        e.preventDefault()

        if (isEdit) {
            dispatch(updateProduct(formData))
        } else {
            dispatch(addProduct(formData))
        }
        onClose()
    }

    return (
        <div className={css.overlay}>
            <div className={css.modal}>
                <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
                <form onSubmit={handleSubmit} className={css.form}>
                <div className={css.inputGroup}>
                    <label htmlFor="name">Product name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="e.g. iPhone"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.inputGroup}>
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            id="imageUrl"
                            type="text"
                            name="imageUrl"
                            placeholder="https://example.com/image.jpg"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.inputGroup}>
                        <label htmlFor="count">Count</label>
                        <input
                            id="count"
                            type="number"
                            name="count"
                            min="0"
                            placeholder="e.g. 5"
                            value={formData.count}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.inputGroup}>
                            <label htmlFor="weight">Weight</label>
                        <input
                            id="weight"
                            type="text"
                            name="weight"
                            placeholder="e.g. 200g"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.inputGroup}>
                        <label htmlFor="width">Size (width)</label>
                        <input
                            id="width"
                            min="0"
                            type="number"
                            name="width"
                            placeholder="e.g. 100"
                            value={formData.size.width}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={css.inputGroup}>
                        <label htmlFor="height">Size (height)</label>
                        <input
                            id="height"
                            min="0"
                            type="number"
                            name="height"
                            placeholder="e.g. 200"
                            value={formData.size.height}
                            onChange={handleChange}
                            required
                        />
                    </div>

                <div className={css.buttons}>
                    <button type="submit">{isEdit ? 'Save Changes' : 'Add Product'}</button>
                    <button type="button" onClick={onClose}>Cancel</button>
                </div>
                </form>
            </div>
        </div>
    )
}
export default ProductModal;