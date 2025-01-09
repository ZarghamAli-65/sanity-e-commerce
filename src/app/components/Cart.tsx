import React, { useContext } from "react";
import { AiOutlineLeft, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { CartContext } from "../context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { TiDeleteOutline } from "react-icons/ti";

const Cart = () => {
  const { showCart, setShowCart, cartItems, totalQuantity, totalPrice, toggleCartItemQty , onRemove }: any =
    useContext(CartContext);

  const handleClose = () => {
    setShowCart(!showCart);
  };
  return (
    <div className="w-[100vw] bg-black bg-opacity-50  fixed right-0 top-0 z-10">
      <div className="border h-[100vh]  w-[600px] bg-white  float-right px-[40px] py-[50px] relative">
        <button
          onClick={handleClose}
          className="flex items-center text-[18px] font-[500] cursor-pointer gap-[2px] ml-[10px] border-none bg-[transparent]"
        >
          <AiOutlineLeft />
          <span className=" ml-2">Your Cart</span>
          <span className="ml-2 text-red-500">{totalQuantity}</span>
        </button>

        <div className=" mt-[15px] overflow-auto max-h-[70vh] px-[20px] py-[10px]">
          {cartItems.map((product: any) => (
            <div className="flex gap-[15px] p-[20px]" key={product._id}>
              <Image
               
                src={urlFor(product.images[0]).url()}
                width={200}
                height={200}
                alt={product.images[0]}
                className="object-cover"
              />

              <div className="flex justify-between text-gray-500 w-[300px]">
                <div className="flex flex-wrap gap-[10px]">
                  <h5>{product.name}</h5>
                  <h4>{product.price}</h4>
                </div>
                <div className="flex justify-between mt-[60px]">
                  <div className="quantity-desc">
                    <span className="minus text-red-500 " onClick={() => toggleCartItemQty(product._id, "minus")}>
                      <AiOutlineMinus />
                    </span>
                    <span className="text-[20px]">{product.quantity}</span>
                    <span className="plus text-green-500" onClick={() => toggleCartItemQty(product._id, "plus")}>
                      <AiOutlinePlus />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(product)}
                    className="font-[24px] text-[#f02d34] cursor-pointer transparent border-none"
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-1 w-full py-7 px-16">
        <div className="flex w-full justify-between py-3">
          <h3>Subtotal</h3>
          <h3>Rs {totalPrice}</h3>
        </div>

        {cartItems.length > 0 &&
          <div className="m-auto">
          <button
            type="button"
            className="checkout-btn text-black p-5 text-xl font-bold w-full border-4 border-black hover:text-white hover:bg-black"
          >
            Pay with stripe
          </button>
        </div>
        }
      </div>
    </div>
  );
};

export default Cart;
