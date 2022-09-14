import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Main from "./Main";
import Favorites from "./Favorites";
import { ReactComponent as SunIcon } from "./images/sun-icon.svg";
import { ReactComponent as MoonIcon } from "./images/moon-icon.svg";

function App() {
  const initialDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
  const [darkTheme, setDarkTheme] = useState(initialDarkTheme);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  useEffect(() => {
    localStorage.setItem('darkTheme', darkTheme)
  },[darkTheme])

 

  return (
    <div
      className={`h-screen font-josefin border-box ${darkTheme ? "dark" : ""} ${
        darkTheme ? "bg-slate-800" : "bg-slate-100"
      } ${darkTheme ? "text-white" : "text-black"}`}
    >
      <header className="h-12 w-full bg-slate-300 dark:bg-slate-600">
        <button
          className="absolute align-middle sm:top-4 md:top-3 left-5 w-10 h-5 md:w-12 md:h-6 rounded-2xl bg-white flex items-center transition duration-300 focus:outline-none shadow"
          onClick={toggleTheme}
        >
          <div
            className={`w-6 h-6 md:w-7 md:h-7 relative rounded-full transition duration-500 transform dark:bg-slate-800 bg-yellow-500 dark:translate-x-full -translate-x-2 p-1 text-white`}
          >
            {darkTheme ? <MoonIcon /> : <SunIcon />}
          </div>
        </button>
        <nav className="h-full box-border p-2 flex justify-center">
          <ul className="sm:w-1/2 md:w-2/5 h-full p-2 flex items-center box-border">
            <Link
              className="mr-auto hover:text-slate-500 dark:hover:text-slate-300"
              to="/"
            >
              Home
            </Link>
            <Link
              className="hover:text-slate-500 dark:hover:text-slate-300"
              to="/favorites"
            >
              Favorites
            </Link>
          </ul>
        </nav>
      </header>

      <FavoritesProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </FavoritesProvider>
    </div>
  );
}

export default App;
