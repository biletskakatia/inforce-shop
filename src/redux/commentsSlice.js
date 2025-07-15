import { createSlice } from "@reduxjs/toolkit";
import { fetchComments, addComment, deleteComment } from "./commentsOps";

const initialState = {
    byProduct: {},
    isLoading: false,
    error: null,
};
const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    extraReducers: builder => {
        builder
            //fetch
            .addCase(fetchComments.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchComments.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.byProduct[payload.productId] = payload.comments;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            
            //add
            .addCase(addComment.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addComment.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                const pid = payload.productId;
                if (!state.byProduct[pid]) state.byProduct[pid] = [];
                state.byProduct[pid].push(payload);
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            
            //delete
            .addCase(deleteComment.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteComment.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                for (const pid in state.byProduct) {
                    state.byProduct[pid] = state.byProduct[pid].filter(c => c.id !== payload);
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default commentsSlice.reducer;