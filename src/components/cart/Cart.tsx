import React from 'react';
import './Cart.css'; 

export const Cart: React.FC = () => {
  return (
    <div className="cart-page-container">
      <h1>Your Shopping Cart</h1>
      <div className="cart-items-list">
        <p>Your cart is currently empty. Start shopping to add items!</p>

      </div>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <p>Subtotal: $0.00</p> 
        <p>Shipping: $0.00</p> 
        <p>Total: $0.00</p> 
        <button className="checkout-button">Proceed to Checkout</button>
      </div>
    </div>
  );
};