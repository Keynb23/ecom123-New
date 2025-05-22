import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/types';

interface ProductState {
  products: Product[]; 
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ProductState = {
  products: [], 
  status: 'idle',
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
      state.status = 'succeeded';
      state.error = null;
    },
    setStatus: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
      state.status = action.payload;
      if (action.payload === 'loading') {
        state.error = null;
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { setProducts, setStatus, setError } = productSlice.actions;
export default productSlice.reducer;