import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import GoogleMapComponent from "./components/GoogleMapComponent";
import Header from "./components/Header";
import Categories from "./page/categories";
import Search from "./page/search";
import Contact from "./page/contact";
import Login from "./page/login";
import Regisztracio from "./page/regisztracio";
import "./styles/index.css"; // fontos!
function App() {
    return (_jsxs("div", { className: "bg-gray-50 min-h-screen", children: [_jsx(Header, {}), _jsx("div", { className: "bg-red-500 text-white p-4 text-center", children: "Ez piros h\u00E1tt\u00E9r, ha m\u0171k\u00F6dik a Tailwind!" }), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold mb-4", children: "\uD83D\uDCCD Jelenlegi helyzeted" }), _jsx(GoogleMapComponent, {}), _jsx(ProductList, {})] }) }), _jsx(Route, { path: "/categories", element: _jsx(Categories, {}) }), _jsx(Route, { path: "/search", element: _jsx(Search, {}) }), _jsx(Route, { path: "/contact", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/regisztracio", element: _jsx(Regisztracio, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) })] })] }));
}
export default App;
