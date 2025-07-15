import { Routes, Route } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage/ProductsPage.jsx';
import ProductPage from '../../pages/ProductPage/ProductPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<p>Not found</p>} />
    </Routes>
  )
}

export default App
