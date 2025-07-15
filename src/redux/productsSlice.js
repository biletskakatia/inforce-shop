import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, addProducts, deleteProduct, updateProduct } from './productsOps.js';

const initialState = {
    items: [],
    isLoading: false,
    error: null,
}

const productsSlice = createSlice({
    name: 'products',
    initialState,
    extraReducers: builder => {
        builder
            //fatch
            .addCase(fetchProducts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            //add
            .addCase(addProducts.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(addProducts.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items.push(payload)
            })
            .addCase(addProducts.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            //update
            .addCase(updateProduct.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(updateProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const idx = state.items.findIndex(p => p.id === payload.id);
                if (idx !== -1) state.items[idx] = payload;
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })

            //delete
            .addCase(deleteProduct.pending, state => {
                state.isLoading = true
                state.error = null
            })
            .addCase(deleteProduct.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.items = state.items.filter(p => p.id !== payload);
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.error.message
            })
    },
})
export default productsSlice.reducer