import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        zipcode: '',
        address: '',
    });
    const [isCompany, setIsCompany] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            zipcode: formData.zipcode,
            address: isCompany ? formData.address : null,
            isCompany,
        };
        try {
            const res = await fetch("https://localhost:7253/api/Users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (res.ok) {
                alert("Sikeres regisztráció!");
            }
            else {
                const errorData = await res.json();
                alert("Hiba: " + errorData.message || "Ismeretlen hiba");
            }
        }
        catch (error) {
            alert("Hálózati hiba: " + error);
        }
    };
    return (_jsx("div", { className: "min-h-screen bg-gray-50 py-10 px-4", children: _jsxs("form", { onSubmit: handleSubmit, className: "max-w-lg mx-auto bg-white p-8 rounded shadow-md flex flex-col gap-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "Felhaszn\u00E1l\u00F3n\u00E9v" }), _jsx("input", { type: "text", name: "username", value: formData.username, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "Email" }), _jsx("input", { type: "email", name: "email", value: formData.email, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "Ir\u00E1ny\u00EDt\u00F3sz\u00E1m" }), _jsx("input", { type: "text", name: "zipcode", value: formData.zipcode, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded", required: true })] }), isCompany && (_jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "C\u00EDm" }), _jsx("input", { type: "text", name: "address", value: formData.address, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded", required: true })] })), _jsxs("div", { children: [_jsx("label", { className: "block font-semibold mb-1", children: "Jelsz\u00F3" }), _jsx("input", { type: "password", name: "password", value: formData.password, onChange: handleChange, className: "w-full border border-gray-300 p-2 rounded", required: true })] }), _jsx("div", { className: "flex flex-col items-center mb-4", children: _jsxs("div", { className: "flex items-center justify-between w-full mb-2", children: [_jsx("span", { className: `text-sm font-medium ${!isCompany ? "text-blue-600" : "text-gray-500"}`, children: "Vev\u0151" }), _jsxs("div", { className: "relative inline-block w-12 mr-2 align-middle select-none", children: [_jsx("input", { type: "checkbox", name: "userType", id: "userType", checked: isCompany, onChange: () => setIsCompany(!isCompany), className: "sr-only peer" }), _jsx("label", { htmlFor: "userType", className: "block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200", children: _jsx("span", { className: `absolute top-0 left-0 block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${isCompany ? 'translate-x-6' : 'translate-x-0'}` }) })] }), _jsx("span", { className: `text-sm font-medium ${isCompany ? "text-blue-600" : "text-gray-500"}`, children: "C\u00E9g" })] }) }), _jsx("button", { type: "submit", className: "bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold transition", children: "Regisztr\u00E1ci\u00F3" })] }) }));
};
export default RegisterForm;
