import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productsOps";

const ProductsPage = () => {
    const dispatch = useDispatch()
    const { items, isLoading, error } = useSelector(state => state.products)
    
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])
    
    return (
        <div>
            <h1>Products</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {items.map(product => (
                    <li key={product.id}>
                        <p>{product.name}</p>
                        <p>Count: {product.count}</p>
                        <p>Weight: {product.weight}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductsPage