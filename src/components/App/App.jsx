import { Routes, Route } from 'react-router-dom';
import ProductsPage from '../../pages/ProductsPage/ProductsPage.jsx';
import ProductPage from '../../pages/ProductPage/ProductPage.jsx';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<NotFoundPage/>} />
    </Routes>
  )
}

export default App
