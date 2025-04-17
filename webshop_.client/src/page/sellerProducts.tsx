import React, { useEffect, useState } from "react";
import { useSeller, useUser } from "../context/UserContext";

type Product = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    unit: string;
    imageUrl: string;
    subCategoryId: number;
};

type SubCategory = {
    id: number;
    name: string;
    categoryId: number;
};

type Category = {
    id: number;
    name: string;
};

export default function SellerProducts() {
    const { seller } = useSeller();
    const { user } = useUser(); // ➕ új: fallback ha seller nem elérhető

    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(null);

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        quantity: "",
        unit: "",
        imageUrl: "",
    });

    useEffect(() => {
        const sellerId = seller?.userId || user?.id;
        if (!sellerId) return;

        fetch(`https://localhost:7253/api/Products/by-seller/${sellerId}`)
            .then(res => res.json())
            .then(setProducts)
            .catch(err => console.error("Termék betöltési hiba:", err));
    }, [seller, user]);

    useEffect(() => {
        fetch("https://localhost:7253/api/Categories")
            .then(res => res.json())
            .then(setCategories)
            .catch(err => console.error("Kategória betöltési hiba:", err));
    }, []);

    useEffect(() => {
        if (!selectedCategory) {
            setSubCategories([]);
            setSelectedSubCategory(null);
            return;
        }

        fetch(`https://localhost:7253/api/SubCategories/by-category/${selectedCategory}`)
            .then(res => res.json())
            .then(setSubCategories)
            .catch(err => console.error("Alkategória betöltési hiba:", err));
    }, [selectedCategory]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();

        const sellerId = seller?.userId || user?.id;
        const subCategoryId = selectedSubCategory;

        if (!sellerId || !subCategoryId) {
            alert("Hiányzó eladó vagy alkategória!");
            return;
        }

        const payload = {
            name: newProduct.name.trim(),
            price: parseFloat(newProduct.price),
            quantity: parseInt(newProduct.quantity),
            unit: newProduct.unit.trim(),
            imageUrl: newProduct.imageUrl.trim(),
            sellerId,
            subCategoryId,
        };

        console.log("📦 Küldött termék:", payload);

        try {
            const res = await fetch("https://localhost:7253/api/Products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                const created = await res.json();
                setProducts(prev => [...prev, created]);
                setNewProduct({ name: "", price: "", quantity: "", unit: "", imageUrl: "" });
                setSelectedCategory(null);
                setSelectedSubCategory(null);
            } else {
                const errText = await res.text();
                alert("❌ Hiba történt: " + errText);
            }
        } catch (err) {
            alert("❌ Hálózati hiba: " + err);
        }
    };

    if (!user?.id) return <p className="p-4 text-red-500">Nem vagy bejelentkezve!</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Saját termékeim</h1>

            <form onSubmit={handleCreate} className="mb-8 space-y-4 border p-4 rounded shadow">
                <h2 className="text-xl font-semibold">Új termék hozzáadása</h2>

                <input type="text" placeholder="Terméknév" value={newProduct.name}
                    onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                    className="w-full border px-3 py-2 rounded" required />

                <input type="number" placeholder="Ár" value={newProduct.price}
                    onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                    className="w-full border px-3 py-2 rounded" required />

                <input type="number" placeholder="Mennyiség" value={newProduct.quantity}
                    onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })}
                    className="w-full border px-3 py-2 rounded" required />

                <input type="text" placeholder="Egység (pl. db, kg)" value={newProduct.unit}
                    onChange={e => setNewProduct({ ...newProduct, unit: e.target.value })}
                    className="w-full border px-3 py-2 rounded" required />

                <input type="text" placeholder="Kép URL" value={newProduct.imageUrl}
                    onChange={e => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                    className="w-full border px-3 py-2 rounded" required />

                <div className="flex gap-4">
                    <select value={selectedCategory ?? ""}
                        onChange={(e) => setSelectedCategory(Number(e.target.value))}
                        className="border px-2 py-2 rounded w-1/2" required>
                        <option value="">Válassz kategóriát</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <select value={selectedSubCategory ?? ""}
                        onChange={(e) => setSelectedSubCategory(Number(e.target.value))}
                        className="border px-2 py-2 rounded w-1/2" required>
                        <option value="">Válassz alkategóriát</option>
                        {subCategories.map(sc => (
                            <option key={sc.id} value={sc.id}>{sc.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Termék létrehozása
                </button>
            </form>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map(p => (
                        <div key={p.id} className="border rounded p-4 shadow space-y-2">
                            <h3 className="text-lg font-semibold">{p.name}</h3>
                            <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover my-2" />
                            <p><strong>{p.price} Ft / {p.unit}</strong></p>
                            <p>Mennyiség: {p.quantity}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-500">Még nincs terméked.</p>
            )}
        </div>
    );
}
