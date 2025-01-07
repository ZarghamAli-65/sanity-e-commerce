"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ProductDetails = ({ product }: any) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full md:py-16">
      <div
        className="gap-8 md:max-w-[1024px] m-auto max-w-[600px] px-4 md:px-0  grid md:grid-cols-2 grid-cols-1 ;
"
      >
        {/* Left */}
        <div>
          {/* TOP */}
          <div className="h-[450px] flex items-center mb-[25px]">
            <Image
              src={urlFor(product.images[index]).url()}
              alt={product.images[index]}
              width={350}
              height={350}
              className="object-cover mx-auto"
            />
          </div>

          {/* BOTTOM */}
          <div className="flex gap-[5px] justify-center;">
            {product.images?.map((item: any, i: number) => (
              <Image
                key={i}
                src={urlFor(product.images[i]).url()}
                alt={product.images[0]}
                width={220}
                height={100}
                className="object-cover h-32 mx-auto border rounded-xl hover:cursor-pointer"
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        <div className="flex flex-col gap-8 md:pt-32 pt-0">
          <div className="flex flex-col gap-4">
            <div className="text-3xl font-bold">{product.name}</div>
            <div className="text-xl font-medium">{product.priice}</div>
          </div>

          <div className="flex gap-2 items-center ">
            <h3>Quantity</h3>
            <p className="p-[6px] flex items-center border border-black">
              <span className="minus">
                <AiOutlineMinus />
              </span>
              <span className="num">1</span>
              <span className="plus">
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <button className="btn add-to-cart">
                Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
