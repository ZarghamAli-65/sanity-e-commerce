import React from "react";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";

export default async function page() {
  const products = await client.fetch(groq`*[_type == "product"]`);
  return (
    <div>
      <Navbar />
      <Hero />
      <Products />
    </div>
  );
}
