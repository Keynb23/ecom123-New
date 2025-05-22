import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { Product } from '../../types/types';
import { addToCart, increaseQuantity, decreaseQuantity, type CartItem } from '../../store/slices/cartSlice'; 
import type { RootState } from '../../main';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.cartItems.find((item: CartItem) => item.id === product.id)
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(product.id));
  };

  const handleDecrease = () => {
    dispatch(decreaseQuantity(product.id));
  };

  return (
    <div className="add-to-cart-wrapper">
      {quantityInCart === 0 ? (
        <button
          onClick={handleAddToCart}
          className="add-to-cart-btn"
        >
          Add to Cart
        </button>
      ) : (
        <div className="quantity-selector">
          <button onClick={handleDecrease} className="quantity-btn decrease">-</button>
          <span className="quantity-display">{quantityInCart}</span>
          <button onClick={handleIncrease} className="quantity-btn increase">+</button>
        </div>
      )}
    </div>
  );
};

export default AddToCartButton;