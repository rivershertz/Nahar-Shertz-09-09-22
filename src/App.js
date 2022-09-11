import { Routes, Route, Link } from "react-router-dom";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Main from "./Main";
import Favorites from "./Favorites";

function App() {
  return (
    <div className="h-screen  bg-slate-100">
      <header className="h-12 w-full bg-slate-300">
        <nav className="h-full box-border p-2 flex justify-center">
          <ul className="sm:w-1/2 md:w-2/5 h-full p-2 flex items-center box-border">
            <Link className="mr-auto hover:text-slate-500" to="/">
              Home
            </Link>
            <Link className="hover:text-slate-500" to="/favorites">Favorites</Link>
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
