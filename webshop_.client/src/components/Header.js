import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
export default function Header() {
    const { user, setUser } = useUser();
    return (_jsx("header", { className: "w-full bg-white shadow sticky top-0 z-50", children: _jsxs("nav", { className: "max-w-7xl mx-auto flex flex-wrap justify-between items-center py-4 px-6", children: [_jsx(Link, { to: "/", className: "text-xl font-bold text-blue-600 flex items-center gap-2", children: "\uD83C\uDFE0 WebShop Log\u00F3" }), _jsxs("div", { className: "flex gap-6 text-sm sm:text-base", children: [_jsx(Link, { to: "/categories", className: "hover:text-green-600 transition-colors", children: "Term\u00E9keink" }), _jsx(Link, { to: "/search", className: "hover:text-green-600 transition-colors", children: "Keres\u00E9s" }), _jsx(Link, { to: "/contact", className: "hover:text-green-600 transition-colors", children: "Kapcsolat" })] }), _jsx("div", { className: "flex gap-3 items-center", children: user ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: "text-sm text-gray-700 font-medium", children: ["\uD83D\uDC64 ", user.name] }), _jsx("button", { onClick: () => {
                                    localStorage.removeItem("user");
                                    setUser(null);
                                }, className: "px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition", children: "Kijelentkez\u00E9s" })] })) : (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/login", className: "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition", children: "Bejelentkez\u00E9s" }), _jsx(Link, { to: "/regisztracio", className: "px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition", children: "Regisztr\u00E1ci\u00F3" })] })) })] }) }));
}
