import React, { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    quantity: number;
    category: { name: string };
    seller: { user: { name: string } };
}

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://localhost:7253/api/Users/products")
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="text-center mt-10 text-gray-500">Betöltés...</div>;

    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Terméklista</h2>
            <ul className="divide-y divide-gray-300">
                {products.map(product => (
                    <li key={product.id} className="py-4 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="text-sm text-gray-600">Kategória: {product.category.name}</p>
                            <p className="text-sm text-gray-600">Eladó: {product.seller.user.name}</p>
                            <p className="font-bold">Raktáron: {product.quantity} db</p>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg">
                            Kosárba
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
