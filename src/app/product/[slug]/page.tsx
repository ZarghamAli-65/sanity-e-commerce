import ProductDetails from "../../components/ProductDetails";
import Navbar from "../../components/Navbar";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // Fetch products from Sanity
  const products = await client.fetch(groq`*[_type == "product"]`);
  const product = products.find((product: any) => product.slug.current === slug);

  if (!product) {
    // You can return a custom 404 component here
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Navbar />
      <ProductDetails product={product} />
    </div>
  );
}
