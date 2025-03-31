import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import GoogleMapComponent from "./components/GoogleMapComponent";
import Header from "./components/Header";
import Categories from "./page/categories";
import Search from "./page/search";
import Contact from "./page/contact";
import Login from "./page/Login";
import Regisztracio from "./page/regisztracio";
import "./styles/index.css"; // fontos!


function App() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Fejléc */}
            <Header />
            <div className="bg-red-500 text-white p-4 text-center">
            Ez piros háttér, ha működik a Tailwind!
            </div>
            {/* Útvonalak kezelése */}
            <Routes>
                <Route path="/" element={
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">📍 Jelenlegi helyzeted</h2>
                        <GoogleMapComponent />
                    </div>
                } />
                <Route path="/categories" element={<Categories />} />
                <Route path="/search" element={<Search />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/regisztracio" element={<Regisztracio />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </div>
    );
}

export default App;
