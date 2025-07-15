import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const fetchComments = createAsyncThunk('comments/fetchByProduct',async productId => {
      const { data } = await axios.get(`/comments?productId=${productId}`);
      return { productId, comments: data };
    }
);
  
export const addComment = createAsyncThunk('comments/add', async newComment => {
  const { data } = await axios.post('/comments', newComment);
  return data;
});

export const deleteComment = createAsyncThunk('comments/delete', async commentId => {
  await axios.delete(`/comments/${commentId}`);
  return commentId;
});