import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const ProductList = ({ subcategoryId }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        fetch(`https://localhost:7253/api/Products/by-subcategory/${subcategoryId}`)
            .then(res => res.json())
            .then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, [subcategoryId]);
    if (loading)
        return _jsx("div", { className: "text-center mt-10 text-gray-500", children: "Bet\u00F6lt\u00E9s..." });
    return (_jsxs("div", { className: "bg-white p-5 rounded-xl shadow-md", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Tal\u00E1latok" }), _jsx("ul", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6", children: products.map(product => (_jsxs("li", { className: "border p-4 rounded-lg shadow-sm", children: [_jsx("img", { src: product.imageUrl, alt: product.name, className: "h-40 object-cover w-full mb-2 rounded-md" }), _jsx("h3", { className: "font-semibold text-lg", children: product.name }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Elad\u00F3: ", product.seller.user.name] }), _jsxs("p", { className: "text-sm text-gray-500", children: ["Kateg\u00F3ria: ", product.subCategory.category.name] }), _jsxs("p", { className: "font-bold", children: [product.price, " Ft / ", product.unit] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["K\u00E9szleten: ", product.quantity, " db"] }), _jsx("button", { className: "mt-2 bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded", children: "Kos\u00E1rba" })] }, product.id))) })] }));
};
export default ProductList;
