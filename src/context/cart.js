import React from "react";
// import localCart from "../utils/localCart";
import reducer from "./reducer";
import { REMOVE, INCREASE, DECREASE, ADD_TO_CART, CLEAR_CART } from "./actions";
function getCartFromLocalStorage() {
  return localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
}

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = React.useReducer(reducer, getCartFromLocalStorage());
  const [total, setTotal] = React.useState(0);
  const [cartItems, setCartItems] = React.useState(0);

  React.useEffect(() => {
    // local storage
    localStorage.setItem("cart", JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);
    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount * cartItem.price);
    }, 0);
    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);
  }, [cart]);

  // remove item
  const removeItem = id => {
    dispatch({ type: REMOVE, payload: id });
  };
  // increase amount
  const increaseAmount = id => {
    dispatch({ type: INCREASE, payload: id });
  };
  // decrease amount
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      dispatch({ type: REMOVE, payload: id });
      return;
    } else {
      dispatch({ type: DECREASE, payload: id });
    }
  };
  // add to cart
  const addToCart = product => {
    let item = [...cart].find(item => item.id === product.id);
    if (item) {
      dispatch({ type: INCREASE, payload: product.id });
    } else {
      dispatch({ type: ADD_TO_CART, payload: product });
    }
  };
  // clear cart
  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        total,
        cartItems,
        removeItem,
        increaseAmount,
        decreaseAmount,
        addToCart,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartProvider };
