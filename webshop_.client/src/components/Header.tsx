import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full bg-white shadow sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-6">
                {/* Logó */}
                <Link to="/" className="text-xl font-bold text-blue-600 flex items-center gap-2">
                    🏠 WebShop Logó
                </Link>

                {/* Menü – középső rész */}
                <div className="flex gap-6 text-sm sm:text-base">
                    <Link to="/categories" className="hover:text-green-600 transition-colors">Termékeink</Link>
                    <Link to="/search" className="hover:text-green-600 transition-colors">Keresés</Link>
                    <Link to="/contact" className="hover:text-green-600 transition-colors">Kapcsolat</Link>
                </div>

                {/* Gombok – jobb oldal */}
                <div className="flex gap-3">
                    <a
                        href="/login.html"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Bejelentkezés
                    </a>
                    <Link
                        to="/regisztracio"
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                        Regisztráció
                    </Link>
                </div>
            </nav>
        </header>
    );
}
