import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  // adding states here
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // increase product func
  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  // decrease product func
  const decreaseQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  // add product to cart
  const onAdd = (product, quantity) => {
    // total price
    setTotalPrice(
      (prevTotal) => prevTotal + product.attributes.price * quantity
    );
    // increase total quantity
    setTotalQuantities((prevTotal) => prevTotal + quantity);
    // check if product is already in cart
    const exist = cartItems.find(
      (item) => item.attributes.slug === product.attributes.slug
    );
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.attributes.slug === product.attributes.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
    }
  };
  // remove product to cart
  const onRemove = (product) => {
    // total price
    setTotalPrice((prevTotal) => prevTotal - product.attributes.price);
    // decrease total quantity
    setTotalQuantities((prevTotal) => prevTotal - 1);
    // check
    const exist = cartItems.find(
      (item) => item.attributes.slug === product.attributes.slug
    );
    if (exist.quantity === 1) {
      setCartItems(
        cartItems.filter(
          (item) => item.attributes.slug !== product.attributes.slug
        )
      );
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.attributes.slug === product.attributes.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalQuantities,
        totalPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);