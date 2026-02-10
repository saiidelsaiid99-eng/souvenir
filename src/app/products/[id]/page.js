"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

      {/* Show all images in a horizontal scroll container */}
      <div className="flex overflow-x-auto gap-4 mb-6">
        {product.images && product.images.length > 0 ? (
          product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${product.name} image ${idx + 1}`}
              className="h-64 w-auto object-contain rounded flex-shrink-0"
            />
          ))
        ) : (
          <div className="h-64 w-64 bg-gray-200 flex items-center justify-center rounded text-gray-400">
            No Images
          </div>
        )}
      </div>

      <p className="text-pink-600 font-bold text-xl mb-4">${product.price}</p>
      <p className="text-gray-700">{product.description || "No description"}</p>
    </div>
  );
}
