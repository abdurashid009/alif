import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Oddiy autentifikatsiya logikasi (masalan, hardcoded)
    if (username === "admin" && password === "12345") {
      setIsLoggedIn(true);
    } else {
      alert("Неверный логин или пароль!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      {!isLoggedIn ? (
        <>
          <input
            type="text"
            placeholder="Логин"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 mb-2 rounded"
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-2 rounded"
          />
          <button
            className="px-6 py-3 bg-[#FFBE1F] rounded-xl"
            onClick={handleLogin}
          >
            Войти
          </button>
        </>
      ) : (
        <button
          className="px-6 py-3 bg-gray-500 text-white rounded-xl"
          onClick={() => setIsLoggedIn(false)}
        >
          Выход
        </button>
      )}
    </div>
  );
};

export default Login;
