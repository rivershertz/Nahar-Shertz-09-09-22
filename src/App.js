import { Routes, Route, Link } from "react-router-dom";
import { useState } from 'react';
import Main from "./Main";
import Favorites from "./Favorites";

function App() {
  
  return (
    <div className="h-screen  bg-slate-100">
      <header className="h-12 w-full bg-slate-300">
        <nav className="h-full box-border p-2 flex flex-row justify-center items-center">
          <button className="mr-auto">Dark Mode</button>
          <ul className="w-1/5 h-full p-2 flex flex-row items-center box-border">
            <Link className="mr-auto hover:text-slate-600" to="/">
              Home
            </Link>
            <Link to="/favorites">Favorites</Link>
          </ul>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
