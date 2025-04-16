import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// src/pages/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const apiBase = import.meta.env.VITE_API_BASE_URL;
            const res = await fetch(`${apiBase}/Users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            if (!res.ok) {
                const msg = await res.text();
                setError(msg);
                return;
            }
            const user = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            setUser(user); // context frissítése
            navigate("/"); // vissza főoldalra
        }
        catch (err) {
            setError("Hiba történt a bejelentkezés során.");
        }
    };
    return (_jsxs("div", { className: "max-w-md mx-auto mt-10 p-6 border rounded shadow bg-white", children: [_jsx("h2", { className: "text-2xl font-bold mb-4", children: "Bejelentkez\u00E9s" }), error && _jsx("p", { className: "text-red-600 mb-2", children: error }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("input", { type: "email", placeholder: "Email", value: email, onChange: (e) => setEmail(e.target.value), required: true, className: "w-full border px-3 py-2 rounded" }), _jsx("input", { type: "password", placeholder: "Jelsz\u00F3", value: password, onChange: (e) => setPassword(e.target.value), required: true, className: "w-full border px-3 py-2 rounded" }), _jsx("button", { type: "submit", className: "w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition", children: "Bejelentkez\u00E9s" })] })] }));
}
