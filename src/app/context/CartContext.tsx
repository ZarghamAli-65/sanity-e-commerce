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

  const onRemove = (product:any) => {
      let foundProduct = cartItems.find((item) => item._id === product._id);
      const newCartItems = cartItems.filter((item) => item._id !== product._id);

      setCartItems(newCartItems);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity) ;
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity);
    }

  const toggleCartItemQty = (id: any, value: any) => {
    let foundProduct = cartItems.find((item) => item._id === id);
    const otherProducts = cartItems.filter((item) => item._id !== id);
    const index = cartItems.findIndex((product) => product._id === id);
    const updatedCartItems = [...cartItems];

    if (value === "plus") {
      updatedCartItems[index] = {
        ...updatedCartItems[index],
        quantity: updatedCartItems[index].quantity + 1,
      };
      setCartItems([...updatedCartItems]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantity((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "minus") {
      if (foundProduct.quantity > 1) {
        updatedCartItems[index] = {
          ...updatedCartItems[index],
          quantity: updatedCartItems[index].quantity - 1,
        };
        setCartItems([...updatedCartItems]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantity((prevTotalQuantity) => prevTotalQuantity - 1);
      
      
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
        onRemove,
      }}
    >
      <div>{children}</div>
    </CartContext.Provider>
  );
};
