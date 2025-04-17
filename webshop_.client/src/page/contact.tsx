import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { useSeller } from "../context/UserContext";

export default function About() {
    const { user, setUser } = useUser();
    const { seller, setSeller } = useSeller();

    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [address, setAddress] = useState(seller?.address || "");
    const [phoneNumber, setPhoneNumber] = useState(seller?.phoneNumber || "");
    const [openingHours, setOpeningHours] = useState(seller?.openingHours || "");
    const [description, setDescription] = useState(seller?.description || "");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !seller) return;

        try {
            const res = await fetch(`https://localhost:7253/api/Users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    address,
                    phoneNumber,
                    openingHours,
                    description,
                }),
            });

            if (res.ok) {
                alert("Sikeresen frissítve!");

                const updatedUser = { ...user, name, email };
                const updatedSeller = {
                    userId: seller.userId, // ⬅️ ez volt eddig a hiányzó mező
                    address,
                    phoneNumber,
                    openingHours,
                    description,
                };

                localStorage.setItem("user", JSON.stringify(updatedUser));
                localStorage.setItem("seller", JSON.stringify(updatedSeller));
                setUser(updatedUser);
                setSeller(updatedSeller);
            } else {
                const msg = await res.text();
                alert("Hiba: " + msg);
            }
        } catch (err) {
            alert("Hálózati hiba: " + err);
        }
    };

    if (!user || !seller) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-semibold text-red-500">Nem vagy bejelentkezve eladóként!</h1>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-2xl font-bold mb-4">Adataim szerkesztése</h1>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label className="block text-sm font-semibold mb-1">Név</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Cím</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Leírás</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                        rows={3}
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Nyitvatartás</label>
                    <input
                        type="text"
                        value={openingHours}
                        onChange={(e) => setOpeningHours(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Telefonszám</label>
                    <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Emailcím</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border px-3 py-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    Mentés
                </button>
            </form>
        </div>
    );
}
