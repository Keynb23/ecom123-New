import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/types'; 

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  total: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cartItems: [],
  total: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;