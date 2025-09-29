import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const ProductList = ({ addToCart, addToLiked, liked }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/maxsulotlar");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.tavsif.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Debug function calls
  const handleAddToCart = (product) => {
    console.log("Adding to cart:", product);
    if (addToCart) {
      addToCart(product);
    } else {
      console.error("addToCart function is not defined");
    }
  };

  const handleAddToLiked = (product) => {
    console.log("Toggling liked:", product);
    if (addToLiked) {
      addToLiked(product);
    } else {
      console.error("addToLiked function is not defined");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-white">
      {/* Search Input */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Maxsulot qidirish..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
      </div>

      {/* Loading and Error States */}
      {loading && <p className="text-center text-gray-600">Yuklanmoqda...</p>}
      {error && <p className="text-center text-red-600">Xatolik: {error}</p>}

      {/* Products Section */}
      {!loading && !error && filteredProducts.length === 0 && (
        <p className="text-center text-gray-600">Maxsulot topilmadi.</p>
      )}

      {/* Featured Products */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {filteredProducts.slice(0, 6).map((product) => (
          <div
            key={product.nom}
            className="w-[180px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 relative"
          >
            <img
              src={product.rasm}
              alt={product.nom}
              className="w-full h-40 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://watchdiana.fail/blog/wp-content/themes/koji/assets/images/default-fallback-image.png")
              }
            />
            <div className="p-2 text-center">
              <h3 className="text-sm font-medium text-gray-800 truncate">
                {product.nom}
              </h3>
              <p className="text-xs text-gray-600 mb-1">{product.tavsif}</p>
              <div className="flex justify-between items-center px-2 mb-2">
                <span className="text-sm font-semibold text-gray-900">
                  {product.narxi.toLocaleString()} сум
                </span>
                {product.chegirma && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                    {product.chegirma}
                  </span>
                )}
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-yellow-400 text-white text-sm py-1 rounded hover:bg-yellow-500 transition-colors duration-200"
              >
                В корзину
              </button>
              <div
                className="absolute top-2 left-2 cursor-pointer"
                onClick={() => handleAddToLiked(product)}
              >
                {liked.find((item) => item.nom === product.nom) ? (
                  <FaHeart className="text-red-500 hover:text-red-700" />
                ) : (
                  <FaRegHeart className="text-red-500 hover:text-red-700" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recommended Products */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Вам может быть интересно
      </h2>
      <div className=" flex justify-center">
        <div className="  flex flex-wrap w-[87%] justify-center gap-[16px]">
          {filteredProducts.slice(6, 18).map((product) => (
            <div
              key={product.nom}
              className="w-[180px] bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 relative"
            >
              <img
                src={product.rasm}
                alt={product.nom}
                className="w-full p-[30px] h-45 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://watchdiana.fail/blog/wp-content/themes/koji/assets/images/default-fallback-image.png")
                }
              />
              <div className="p-2 text-center">
                <h3 className="text-sm font-medium text-gray-800 truncate">
                  {product.nom}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{product.tavsif}</p>
                <div className="flex justify-between items-center px-2 mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {product.narxi.toLocaleString()} сум
                  </span>
                  {product.chegirma && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                      {product.chegirma}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-yellow-400 text-white text-sm py-1 rounded hover:bg-yellow-500 transition-colors duration-200"
                >
                  В корзину
                </button>
                <div
                  className="absolute top-2 left-2 cursor-pointer"
                  onClick={() => handleAddToLiked(product)}
                >
                  {liked.find((item) => item.nom === product.nom) ? (
                    <FaHeart className="text-red-500 hover:text-red-700" />
                  ) : (
                    <FaRegHeart className="text-red-500 hover:text-red-700" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
