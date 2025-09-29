import React, { useState } from "react";
import Navbar from "./components/Navbar";
import ProductList from "./components/Cart";
import Header from "./components/Header";

const App = () => {
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState([]);

  // Add to cart function
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // Toggle like function
  const toggleLiked = (product) => {
    setLiked((prevLiked) => {
      // Check if product is already liked
      if (prevLiked.find((item) => item.nom === product.nom)) {
        // Remove from liked
        return prevLiked.filter((item) => item.nom !== product.nom);
      }
      // Add to liked
      return [...prevLiked, product];
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cart={cart}
        liked={liked}
        addToCart={addToCart}
        addToLiked={toggleLiked}
      />
      <Header/>
      <ProductList
        addToCart={addToCart}
        addToLiked={toggleLiked}
        liked={liked}
      />
    </div>
  );
};

export default App;
