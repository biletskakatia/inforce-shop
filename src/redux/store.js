import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './productsSlice.js';
import commentsReducer from './commentsSlice.js';

export const store = configureStore({
    reducer: {
        products: productsReducer,
        comments: commentsReducer,
    },
});

