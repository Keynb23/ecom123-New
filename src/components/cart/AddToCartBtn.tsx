import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Product } from '../../types/types';
import { addToCart, type CartItem } from '../../store/slices/cartSlice';
import type { RootState } from '../../main';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const isAdded = useSelector((state: RootState) =>
    state.cart.cartItems.some((item: CartItem) => item.id === product.id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdded}
      className={`add-to-cart-btn ${isAdded ? 'added' : ''}`}
    >
      {isAdded ? 'Added to Cart' : 'Add to Cart'}
    </button>
  );
};

export default AddToCartButton;