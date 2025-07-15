import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

export const fetchComments = createAsyncThunk('comments/fetchByProduct',async productId => {
      const { data } = await axios.get(`/comments?productId=${productId}`);
      return { productId, comments: data };
    }
);
  