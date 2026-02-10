"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch products
  useEffect(() => {
    fetch("/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Get image URL helper
  const getImageUrl = (img) => {
    if (!img) return "/placeholder.jpg";
    if (img.startsWith("http") || img.startsWith("/")) return img;
    return `/${img}`.replace(/^\/\//, "/");
  };

  // Open product details
  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setSelectedImageIndex(0);
  };

  // Close product details
  const closeProductDetails = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };

  // Change image in details
  const nextImage = () => {
    if (selectedProduct?.images) {
      setSelectedImageIndex((prev) => 
        prev === selectedProduct.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProduct?.images) {
      setSelectedImageIndex((prev) => 
        prev === 0 ? selectedProduct.images.length - 1 : prev - 1
      );
    }
  };

  // Buy Now function
  const handleBuyNow = (productName, price) => {
    alert(`Order placed for "${productName}" at $${price}!`);
    // In real app: redirect to checkout
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-slate-400">Discover our collection</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20 animate-pulse">
                <div className="w-full h-64 bg-slate-700/50 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-700/50 rounded w-3/4 mb-3"></div>
                <div className="h-8 bg-slate-700/50 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-slate-700/50 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-cyan-300 to-purple-300 bg-clip-text text-transparent">
            Product Collection
          </h1>
          <p className="text-slate-400">Browse our wide range of products</p>
          <div className="mt-3 text-sm text-slate-500">
            {products.length} products available
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 text-slate-500">📦</div>
            <p className="text-slate-400 text-lg">No products available yet</p>
            <p className="text-slate-500">Check back soon for new arrivals</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300"
              >
                {/* Product Image */}
                <div 
                  className="h-64 bg-slate-700/30 cursor-pointer"
                  onClick={() => openProductDetails(product)}
                >
                  {product.images?.[0] ? (
                    <img
                      src={getImageUrl(product.images[0])}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    {product.images?.length > 1 && (
                      <button
                        onClick={() => openProductDetails(product)}
                        className="text-sm text-cyan-300 hover:text-cyan-200"
                      >
                        View {product.images.length} photos
                      </button>
                    )}
                  </div>

                  {product.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Category Badge */}
                  {product.category && (
                    <div className="mb-4">
                      <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 text-xs font-medium px-3 py-1.5 rounded-full border border-cyan-500/30">
                        {product.category}
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => openProductDetails(product)}
                      className="flex-1 border border-cyan-500/30 text-cyan-300 py-2.5 rounded-xl hover:bg-cyan-500/10 transition font-medium"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBuyNow(product.name, product.price)}
                      className="flex-1 bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-2.5 rounded-xl hover:scale-105 transition-all font-medium"
                    >
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Product Details Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-slate-800 via-purple-900/80 to-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto border border-cyan-500/30">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-cyan-500/20">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProduct.name}
                  </h2>
                  {selectedProduct.category && (
                    <p className="text-cyan-300 font-medium">{selectedProduct.category}</p>
                  )}
                </div>
                <button
                  onClick={closeProductDetails}
                  className="text-slate-400 hover:text-white text-2xl"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Image Gallery */}
                {selectedProduct.images && selectedProduct.images.length > 0 ? (
                  <div className="mb-6">
                    <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-slate-700/30 mb-4 border border-cyan-500/20">
                      <img
                        src={getImageUrl(selectedProduct.images[selectedImageIndex])}
                        alt={selectedProduct.name}
                        className="w-full h-full object-contain"
                      />
                      
                      {/* Navigation Arrows */}
                      {selectedProduct.images.length > 1 && (
                        <>
                          <button
                            onClick={prevImage}
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-full border border-cyan-500/30 text-cyan-300"
                          >
                            ←
                          </button>
                          <button
                            onClick={nextImage}
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-slate-800/80 hover:bg-slate-800 p-3 rounded-full border border-cyan-500/30 text-cyan-300"
                          >
                            →
                          </button>
                        </>
                      )}
                      
                      {/* Image Counter */}
                      {selectedProduct.images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-slate-900/80 text-cyan-300 px-4 py-2 rounded-full text-sm border border-cyan-500/30">
                          {selectedImageIndex + 1} / {selectedProduct.images.length}
                        </div>
                      )}
                    </div>

                    {/* Thumbnails */}
                    {selectedProduct.images.length > 1 && (
                      <div className="flex gap-2 overflow-x-auto py-2">
                        {selectedProduct.images.map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 ${
                              index === selectedImageIndex
                                ? "border-cyan-400"
                                : "border-transparent"
                            }`}
                          >
                            <img
                              src={getImageUrl(img)}
                              alt={`${selectedProduct.name} ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-80 bg-slate-700/30 rounded-xl flex items-center justify-center mb-6 border border-cyan-500/20">
                    <span className="text-slate-400">No images available</span>
                  </div>
                )}

                {/* Product Info */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      ${selectedProduct.price}
                    </span>
                    {selectedProduct.category && (
                      <span className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-4 py-2 rounded-full font-medium border border-cyan-500/30">
                        {selectedProduct.category}
                      </span>
                    )}
                  </div>

                  {selectedProduct.description && (
                    <div>
                      <h3 className="font-semibold text-white mb-2">Description</h3>
                      <p className="text-slate-300">{selectedProduct.description}</p>
                    </div>
                  )}

                  {/* Order Button */}
                  <button
                    onClick={() => {
                      handleBuyNow(selectedProduct.name, selectedProduct.price);
                      closeProductDetails();
                    }}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white py-4 rounded-xl text-lg font-semibold transition-all hover:scale-105 border border-cyan-400/30"
                  >
                    Order This Product - ${selectedProduct.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}