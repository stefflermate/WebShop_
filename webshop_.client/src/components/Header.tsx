import React from "react";
import { Link } from "react-router-dom";
import "../styles/index.css";

export default function Header() {
    return (
        <header className="custom-header">
            <nav className="nav-bar">
                {/* Logó */}
                <Link to="/" className="logo">
                    🏠 WebShop Logó
                </Link>

                {/* Menü – középső rész */}
                <div className="nav-menu">
                    <Link to="/categories">Termékeink</Link>
                    <Link to="/search">Keresés</Link>
                    <Link to="/contact">Kapcsolat</Link>
                </div>

                {/* Gombok – jobb oldal */}
                <div className="nav-actions">
                    <a href="/login.html" className="btn blue">Bejelentkezés</a>
                    <Link to="/regisztracio" className="btn green">Regisztráció</Link>
                </div>
            </nav>
        </header>
    );
}