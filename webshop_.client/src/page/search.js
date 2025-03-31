import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";
const SearchPage = () => {
    const [subcategoryId, setSubcategoryId] = useState(null);
    return (_jsxs("div", { className: "flex", children: [_jsx("div", { className: "w-64", children: _jsx(CategoryMenu, { onSelectSubCategory: id => setSubcategoryId(id) }) }), _jsx("div", { className: "flex-1 p-4", children: subcategoryId ? (_jsx(ProductList, { subcategoryId: subcategoryId })) : (_jsx("p", { className: "text-gray-500", children: "V\u00E1lassz alkateg\u00F3ri\u00E1t bal oldalt a term\u00E9kek megtekint\u00E9s\u00E9hez." })) })] }));
};
export default SearchPage;
