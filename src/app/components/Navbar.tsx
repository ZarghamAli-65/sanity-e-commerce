"use client";

import Link from "next/link";
import React, { useContext } from "react";
import { FiShoppingBag } from "react-icons/fi";
import Cart from "./Cart";
import { CartContext } from "../context/CartContext";

const Navbar = () => {
  const { totalQuantity, showCart, setShowCart }: any = useContext(CartContext);

  const handleClick = () => {
    setShowCart(!showCart);
  };
  return (
    <>
      <div className="w-full h-[80px] bg-white ">
        <div className="container w-full h-full flex justify-between">
          <Link href="/" className="logo">
            Shop
          </Link>
          <button className="relative text-[25px]" onClick={handleClick}>
            <FiShoppingBag />
            <span className="absolute text-[12px] top-6 right-[-5px] bg-red-500 w-[18px] h-[18px] rounded-3xl text-center text-white font-urbanist  font-black">
              {totalQuantity}
            </span>
          </button>
        </div>
      </div>

      
      {showCart && <Cart />}
    </>
  );
};

export default Navbar;
