import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
const CategoryMenu = ({ onSelectSubCategory }) => {
    const [categories, setCategories] = useState([]);
    const [openCategoryId, setOpenCategoryId] = useState(null);
    useEffect(() => {
        fetch("/api/users/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);
    return (_jsx("div", { className: "w-64 bg-white p-4 border rounded-md shadow-sm", children: categories.map(category => (_jsxs("div", { className: "mb-2", children: [_jsx("button", { className: "font-semibold w-full text-left", onClick: () => setOpenCategoryId(openCategoryId === category.id ? null : category.id), children: category.name }), openCategoryId === category.id && (_jsx("ul", { className: "ml-4 mt-1 list-disc text-sm text-gray-700", children: category.subCategories.map(sub => (_jsx("li", { className: "cursor-pointer hover:underline", onClick: () => onSelectSubCategory(sub.id), children: sub.name }, sub.id))) }))] }, category.id))) }));
};
export default CategoryMenu;
