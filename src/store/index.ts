import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
// Import other reducers here if you add more slices (e.g., authReducer)

export const store = configureStore({
  reducer: {
    products: productReducer,
    // auth: authReducer, // Example for another slice
  },
  // You can add middleware, devTools, etc. here
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {products: ProductState, auth: AuthState}
export type AppDispatch = typeof store.dispatch;