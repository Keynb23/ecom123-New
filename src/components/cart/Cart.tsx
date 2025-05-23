import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../main';
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity, type CartItem } from '../../store/slices/cartSlice'; 
import './Cart.css';

// use react queries to fetch products for categories 

export const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const [selectedItemImage, setSelectedItemImage] = useState<string | null>(null);

  const getBrandFirstWord = (title: string | undefined) => {
    if (!title) {
      return 'N/A';
    }
    const words = title.split(' ');
    return words.length > 0 ? words[0] : 'N/A';
  };

  const calculateDerivedTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }, [cartItems]);

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      alert('Proceeding to checkout! (Cart will now clear)');
      dispatch(clearCart());
      setSelectedItemImage(null);
    } else {
      alert('Your cart is empty!');
    }
  };

  const handleRowClick = (item: CartItem) => {
    setSelectedItemImage(item.image);
  };

  return (
    <div className="cart-page-container">
      <h1>Your Shopping Cart</h1>

      <div className="cart-content-layout">
        <div className="cart-image-preview">
          {selectedItemImage ? (
            <img src={selectedItemImage} alt="Selected item" className="selected-cart-item-image" />
          ) : (
            <p>Click a row to preview image</p>
          )}
        </div>

        <div className="cart-table-container">
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is currently empty. Start shopping to add items!</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Quantity</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <tr key={item.id} className="cart-table-row" onClick={() => handleRowClick(item)}>
                    <td>
                      <div className="quantity-selector-in-cart">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(decreaseQuantity(item.id));
                            if (item.quantity === 1 && selectedItemImage === item.image) {
                                setSelectedItemImage(null);
                            }
                          }}
                          className="quantity-btn decrease"
                        >
                          -
                        </button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); 
                            dispatch(increaseQuantity(item.id));
                          }}
                          className="quantity-btn increase"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>{getBrandFirstWord(item.title)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); 
                          dispatch(removeFromCart(item.id));
                          if (selectedItemImage === item.image) {
                            setSelectedItemImage(null);
                          }
                        }}
                        className="remove-from-cart-btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: ${calculateDerivedTotal.toFixed(2)}</p>
        <p>Shipping: $0.00</p>
        <p>Total: ${calculateDerivedTotal.toFixed(2)}</p>
        <button
          className="checkout-button"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};