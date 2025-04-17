import React, { useEffect, useState } from "react";

interface Product {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    price: number;
    imageUrl?: string;
    subCategory: { category: { name: string } };
    seller: { user: { name: string } };
}

interface Props {
    subcategoryId: number;
}

const ProductList: React.FC<Props> = ({ subcategoryId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://localhost:7253/api/Products/by-subcategory/${subcategoryId}`)
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            });
    }, [subcategoryId]);

    if (loading) return <div className="text-center mt-10 text-gray-500">Betöltés...</div>;

    return (
        <div className="bg-white p-5 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Találatok</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product.id} className="border p-4 rounded-lg shadow-sm">
                        <img src={product.imageUrl} alt={product.name} className="h-40 object-cover w-full mb-2 rounded-md" />
                        <h3 className="font-semibold text-lg">{product.name}</h3>
                        <p className="text-sm text-gray-500">Eladó: {product.seller.user.name}</p>
                        <p className="text-sm text-gray-500">Kategória: {product.subCategory.category.name}</p>
                        <p className="font-bold">{product.price} Ft / {product.unit}</p>
                        <p className="text-sm text-gray-600">Készleten: {product.quantity} db</p>
                        <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded">
                            Kosárba
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
