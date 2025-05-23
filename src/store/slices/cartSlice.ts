import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/types';

export interface CartItem extends Product {
  quantity: number;
}

// session storage in this file

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
    addToCart: (state: CartState, action: PayloadAction<Product>) => {
      const existingItem = state.cartItems.find((item: CartItem) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    removeFromCart: (state: CartState, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
    clearCart: (state: CartState) => {
      state.cartItems = [];
      state.total = 0;
    },
    increaseQuantity: (state: CartState, action: PayloadAction<number>) => {
      const item = state.cartItems.find(item => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
    decreaseQuantity: (state: CartState, action: PayloadAction<number>) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload);
      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
        state.total = state.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;