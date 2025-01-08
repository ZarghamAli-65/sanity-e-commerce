"use client";

import { createContext, useState, ReactNode } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const incQuantity = () => {
    setQuantity((prevQuantity: any) => prevQuantity + 1);
  };
  const decQuantity = () => {
    setQuantity((prevQuantity: any) => {
      if (prevQuantity - 1 < 1) return 1;
      return prevQuantity - 1;
    });
  };

  const addProduct = (product: any, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );
    setTotalQuantity((prev) => prev + quantity);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct: any) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return cartProduct;
        }
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
  };

  const toggleCartItemQty = (id: any, value: any) => {
    let foundProduct = cartItems.find((item) => item._id === id);
    const otherProducts = cartItems.filter((item) => item._id !== id);

    if (value === "plus") {

      setCartItems([
        ...otherProducts,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price * quantity);
    } else if (value === "minus") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...otherProducts,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
      } else {
        setCartItems([...otherProducts]);
      }
    }
  };

  return (
    <CartContext.Provider
      value={{
        showCart,
        setShowCart,
        quantity,
        setQuantity,
        incQuantity,
        decQuantity,
        cartItems,
        setCartItems,
        addProduct,
        totalQuantity,
        totalPrice,
        toggleCartItemQty,
      }}
    >
      <div>{children}</div>
    </CartContext.Provider>
  );
};
