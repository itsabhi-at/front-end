import React, { createContext, useContext, useState } from "react";

const ShopContext = createContext();

export const StateContext = ({ children }) => {
  // adding states here
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);

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
    const exist = cartItems.find(
      (item) => item.attributes.slug === product.attributes.slug
    );
    if (exist) {
      console.log("its coming here");
      setCartItems(
        cartItems.map((item) =>
          item.attributes.slug === product.attributes.slug
            ? { ...exist, quantity: quantity }
            : item
        )
      );
    } else {
      console.log("its coming there");
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
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
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
