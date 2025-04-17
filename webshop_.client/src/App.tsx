import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import GoogleMapComponent from "./components/GoogleMapComponent";
import Header from "./components/Header";
import Categories from "./page/categories";
import Search from "./page/search";
import Contact from "./page/contact";
import SellerProducts from "./page/sellerProducts"; // vagy ahol a fájlod van
import Login from "./page/Login";
import Regisztracio from "./page/regisztracio";
import "./styles/index.css"; // fontos!


function App() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Fejléc */}
            <Header />
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
                <Route path="/sellerProducts" element={<SellerProducts />} />
                <Route path="/regisztracio" element={<Regisztracio />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </div>
    );
}

export default App;
