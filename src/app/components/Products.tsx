
import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Card from "./Card";

const Products = async () => {
  const products = await client.fetch(groq`*[_type == "product"]`);
  return (
    <div className="bg-[#f8f8f8] w-full py-12 mt-[125px] ">
      <div className="container">
        <div className="py-4">
          <h1 className="text-3xl font-bold">Best Selling Products</h1>
          <h1>Enjoy upto 50% off</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6 gap-4">
          {products.map((product: any, index: number) => (
            <Card product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
