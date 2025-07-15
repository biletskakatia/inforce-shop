import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
    const response = await axios.get('/products')
    return response.data
});

export const addProducts = createAsyncThunk('products/add', async newProduct => {
    const { data } = await axios.post('/products', newProduct);
    return data;
});

export const updateProduct = createAsyncThunk('products/update', async updatedProduct => {
    const { id, ...fields } = updatedProduct;
    const { data } = await axios.patch(`/products/${id}`, fields);
    return data;
});

export const deleteProduct = createAsyncThunk('products/delete', async productId => {
    await axios.delete(`/products/${productId}`);
    return productId;
});