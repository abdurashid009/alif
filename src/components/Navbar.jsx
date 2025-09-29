import React, { useState, useEffect } from "react";
import Logo from "../assets/Logo.png";
import { BiListCheck } from "react-icons/bi";
import { IoSearchSharp } from "react-icons/io5";
import { MdShoppingCart } from "react-icons/md";
import { GiAirplaneDeparture } from "react-icons/gi";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Navbar = ({ cart, liked, addToCart, addToLiked }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products
  useEffect(() => {
    fetch("http://localhost:5000/maxsulotlar")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Xatolik:", error));
  }, []);

  // Filter products based on search query
  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tavsif.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleLogin = () => {
    alert("Вход выполнен!");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* NAVBAR */}
      <nav className="w-[80%] flex justify-between items-center py-[30px]">
        <img className="cursor-pointer" src={Logo} alt="Logo" />

        {/* Catalog */}
        <div>
          <button
            className="btn cursor-pointer bg-[#FFBE1F] rounded-xl"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <BiListCheck /> Каталог товаров
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Каталог</h3>
              <p className="py-4">Бу ерда категориялар chiqadi</p>
            </div>
          </dialog>
        </div>

        {/* Search Input */}
        <div className="join cursor-pointer flex justify-center items-center relative">
          <input
            type="text"
            placeholder="Искать товары"
            className="w-[333px] border-2 border-[#FFBE1F] rounded-l-lg p-2 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn rounded-r-lg h-[41px] bg-[#FFBE1F] join-item">
            <IoSearchSharp />
          </button>

          {/* Search Results */}
          {searchQuery && (
            <div className="absolute top-14 left-0 w-[400px] max-h-[400px] overflow-y-auto bg-white p-4 shadow-lg rounded z-10">
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.nom}
                      className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 relative"
                    >
                      <img
                        src={product.rasm}
                        alt={product.nom}
                        className="w-full h-32 object-cover"
                        onError={(e) => (e.target.src = "/fallback-image.jpg")}
                      />
                      <div className="p-2 text-center">
                        <h3 className="text-sm font-medium text-gray-800 truncate">
                          {product.nom}
                        </h3>
                        <p className="text-xs text-gray-600 mb-1">
                          {product.tavsif}
                        </p>
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
                          onClick={() => addToCart(product)}
                          className="w-full bg-yellow-400 text-white text-sm py-1 rounded hover:bg-yellow-500 transition-colors duration-200"
                        >
                          В корзину
                        </button>
                        <div
                          className="absolute top-2 left-2 cursor-pointer"
                          onClick={() => addToLiked(product)}
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
              ) : (
                <p className="text-gray-600">Ничего не найдено</p>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <button
          className="cursor-pointer flex flex-col justify-center items-center rounded-xl border-2 border-transparent hover:scale-[1.1] duration-300 px-3 py-1 hover:border-[#FFBE1F]"
          onClick={() => document.getElementById("cart_modal").showModal()}
        >
          <MdShoppingCart className="text-xl" /> Корзина ({cart.length})
        </button>
        <dialog id="cart_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Корзина</h3>
            {cart.length > 0 ? (
              <ul>
                {cart.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 border-b flex justify-between items-center"
                  >
                    <span>
                      {item.nom} - {item.narxi.toLocaleString()} сум
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() => addToLiked(item)}
                    >
                      {liked.find((likedItem) => likedItem.nom === item.nom) ? (
                        <FaHeart className="text-red-500 hover:text-red-700" />
                      ) : (
                        <FaRegHeart className="text-red-500 hover:text-red-700" />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4">Корзина бош</p>
            )}
          </div>
        </dialog>

        {/* Liked */}
        <button
          className="cursor-pointer flex flex-col justify-center items-center rounded-xl border-2 border-transparent hover:scale-[1.1] duration-300 px-3 py-1 hover:border-[#FFBE1F]"
          onClick={() => document.getElementById("liked_modal").showModal()}
        >
          <FaRegHeart className="text-xl" /> Избранное ({liked.length})
        </button>
        <dialog id="liked_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Избранное</h3>
            {liked.length > 0 ? (
              <ul>
                {liked.map((item, index) => (
                  <li
                    key={index}
                    className="py-2 border-b flex justify-between items-center"
                  >
                    <span>
                      {item.nom} - {item.narxi.toLocaleString()} сум
                    </span>
                    <div
                      className="cursor-pointer"
                      onClick={() => addToLiked(item)}
                    >
                      <FaHeart className="text-red-500 hover:text-red-700" />
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-4">Избранное бош</p>
            )}
          </div>
        </dialog>
        <button className="cursor-pointer flex flex-col justify-center items-center rounded-xl border-2 border-transparent hover:scale-[1.1] duration-300 px-3 py-1 hover:border-[#FFBE1F]">
          <GiAirplaneDeparture className="text-xl" /> Авиабилеты
        </button>
        {/* Login */}
        <button
          className="cursor-pointer flex flex-col justify-center items-center rounded-xl border-2 hover:scale-[1.1] duration-300 px-[30px] py-[15px] border-[#FFBE1F]"
          onClick={() => document.getElementById("login_modal").showModal()}
        >
          <span>Войти</span>
        </button>
        <dialog id="login_modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Вход</h3>
            <input
              type="text"
              placeholder="Логин"
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              type="password"
              placeholder="Пароль"
              className="border p-2 mb-2 w-full rounded"
            />
            <button
              onClick={handleLogin}
              className="btn bg-[#FFBE1F] w-full rounded-xl"
            >
              Войти
            </button>
          </div>
        </dialog>
      </nav>
    </div>
  );
};

export default Navbar;
