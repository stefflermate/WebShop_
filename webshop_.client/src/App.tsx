import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import GoogleMapComponent from "./components/GoogleMapComponent";
import Header from "./components/Header";
import Categories from "./page/categories";
import Search from "./page/search";
import Contact from "./page/contact";
import Regisztracio from "./page/regisztracio";
import "../src/styles/index.css";

function App() {
    return (
        <div>
            <Header />
            <main className="page">
                <div className="bg-red-500 text-white p-4 text-center">
                    Ez piros háttér, ha működik a Tailwind!
                </div>
                <Routes>
                    <Route path="/" element={
                        <div>
                            <h2>📍 Jelenlegi helyzeted</h2>
                            <GoogleMapComponent />
                            <ProductList />
                        </div>
                    } />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/regisztracio" element={<Regisztracio />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;