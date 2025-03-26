import React, { useState } from "react";

type FormData = {
    username: string;
    email: string;
    password: string;
    zipcode: string;
    address?: string;
};

const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: '',
        email: '',
        password: '',
        zipcode: '',
        address: '',
    });

    const [isCompany, setIsCompany] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            } else {
                const errorData = await res.json();
                alert("Hiba: " + errorData.message || "Ismeretlen hiba");
            }
        } catch (error) {
            alert("Hálózati hiba: " + error);
        }
    };


    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 rounded shadow-md flex flex-col gap-5"
            >
                

                <div>
                    <label className="block font-semibold mb-1">Felhasználónév</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold mb-1">Irányítószám</label>
                    <input
                        type="text"
                        name="zipcode"
                        value={formData.zipcode}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                {isCompany && (
                    <div>
                        <label className="block font-semibold mb-1">Cím</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded"
                            required
                        />
                    </div>
                )}

                <div>
                    <label className="block font-semibold mb-1">Jelszó</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                        required
                    />
                </div>

                {/* Toggle kapcsoló Vevő/Cég között */}
                <div className="flex flex-col items-center mb-4">
                    <div className="flex items-center justify-between w-full mb-2">
                        <span className={`text-sm font-medium ${!isCompany ? "text-blue-600" : "text-gray-500"}`}>Vevő</span>
                        <div className="relative inline-block w-12 mr-2 align-middle select-none">
                            <input
                                type="checkbox"
                                name="userType"
                                id="userType"
                                checked={isCompany}
                                onChange={() => setIsCompany(!isCompany)}
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="userType"
                                className="block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-200"
                            >
                                <span
                                    className={`absolute top-0 left-0 block w-6 h-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${isCompany ? 'translate-x-6' : 'translate-x-0'}`}
                                ></span>
                            </label>
                        </div>
                        <span className={`text-sm font-medium ${isCompany ? "text-blue-600" : "text-gray-500"}`}>Cég</span>
                    </div>
                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white py-2 rounded hover:bg-green-600 font-semibold transition"
                >
                    Regisztráció
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;