import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch("https://localhost:7253/api/Users/products")
            .then(res => res.json())
            .then((data) => {
            setProducts(data);
            setLoading(false);
        });
    }, []);
    if (loading)
        return _jsx("div", { className: "text-center mt-10 text-gray-500", children: "Bet\uFFFDlt\uFFFDs..." });
    return (_jsxs("div", { className: "bg-white p-5 rounded-xl shadow-md", children: [_jsx("h2", { className: "text-xl font-semibold mb-4", children: "Term\uFFFDklista" }), _jsx("ul", { className: "divide-y divide-gray-300", children: products.map(product => (_jsxs("li", { className: "py-4 flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: product.name }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Kateg\uFFFDria: ", product.category.name] }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Elad\uFFFD: ", product.seller.user.name] }), _jsxs("p", { className: "font-bold", children: ["Rakt\uFFFDron: ", product.quantity, " db"] })] }), _jsx("button", { className: "bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg", children: "Kos\uFFFDrba" })] }, product.id))) })] }));
};
export default ProductList;
