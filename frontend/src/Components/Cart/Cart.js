// Pages/Cart/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import MainHeader from '../../Common/mainHeader';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const api = process.env.REACT_APP_BASE_URL; // Assuming you have your API base URL here

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleQuantityChange = (itemId, newQuantity) => {
    updateQuantity(itemId, newQuantity);
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div>
      <MainHeader />
      <div className="sc-cart-container">
        <h2 className="sc-cart-title">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p className="sc-cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="sc-cart-items-list">
              {cartItems.map((item) => (
                <li key={item._id} className="sc-cart-item">
                  <div className="sc-item-image-container">
                    {item.images && item.images.length > 0 && (
                      <img
                        src={`${api}/uploads/${item.images[0]}`}
                        alt={`${item.brand} ${item.model}`}
                        className="sc-item-image"
                      />
                    )}
                  </div>
                  <div className="sc-item-details">
                    <h3 className="sc-item-name">{item.brand} {item.model}</h3>
                    <p className="sc-item-price">
                      Price: LKR {item.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <p className="sc-item-quantity">
                      Quantity:
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                        className="sc-quantity-input"
                      />
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="sc-remove-button"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="sc-cart-total">
              <strong>Total:</strong> LKR {calculateTotal()}
            </div>
            <button className="sc-checkout-button">Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;