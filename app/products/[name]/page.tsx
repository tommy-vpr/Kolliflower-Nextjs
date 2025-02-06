"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProductByName } from "@/lib/fetchProduct";

export default function ProductPage() {
  const params = useParams(); // Get URL params
  const nameParam = params.name; // Get the product name from URL

  const [product, setProduct] = useState<any | null>(null);

  useEffect(() => {
    if (typeof nameParam === "string") {
      const decodedName = decodeURIComponent(nameParam); // Fix URL encoding
      const foundProduct = fetchProductByName(decodedName);
      setProduct(foundProduct);
    }
  }, [nameParam]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold text-gray-500">
          Loading or product not found...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-[1100px] mx-auto p-6 flex my-72 justify-center">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Product Image */}
        <div className="w-full">
          <img
            src={"/images/wee-blog-3.jpeg"}
            alt={product.name}
            className="w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-[5rem] font-bold">{product.name}</h1>
          <p className="text-[2rem] text-gray-600">
            Type: <span className="">{product.strainType}</span>
          </p>

          {/* Feelings */}
          <div className="space-y-2">
            <h2 className="text-[2rem] font-semibold">Effects</h2>
            <div className="flex flex-wrap gap-2">
              {product.feeling?.map((effect: string) => (
                <span
                  key={effect}
                  className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-[1.4rem] font-medium"
                >
                  {effect}
                </span>
              ))}
            </div>
          </div>

          {/* Flavors */}
          <div className="space-y-2">
            <h2 className="text-[2rem] font-semibold">Flavors</h2>
            <div className="flex flex-wrap gap-2">
              {product.flavor?.map((flavor: string) => (
                <span
                  key={flavor}
                  className="px-3 py-1 bg-yellow-100 text-yellow-600 rounded-full text-[1.4rem] font-medium"
                >
                  {flavor}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="pt-12">
            <p className="text-gray-700 text-[1.6rem]">{product.description}</p>
          </div>

          {/* CTA Button */}
          <button className="mt-4 text-[1.8rem] bg-[#111] text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </main>
  );
}
