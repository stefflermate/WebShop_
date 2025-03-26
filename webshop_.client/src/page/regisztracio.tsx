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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Regisztrációs adatok:", { ...formData, szerep: isCompany ? "Cég" : "Vevõ" });
    };

    return (

        <div className="min-h-screen bg-gray-50 py-10 px-4">
            

            <form
                onSubmit={handleSubmit}
                className="max-w-lg mx-auto bg-white p-8 rounded shadow-md flex flex-col gap-5"
            >
                {/* Vevõ / Cég választó */}
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        type="button"
                        onClick={() => setIsCompany(false)}
                        className={`w-1/2 py-2 rounded font-semibold ${!isCompany ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Vevõ
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsCompany(true)}
                        className={`w-1/2 py-2 rounded font-semibold ${isCompany ? "bg-blue-500 text-white" : "bg-gray-200"
                            }`}
                    >
                        Cég
                    </button>
                </div>

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
