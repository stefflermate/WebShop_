import React, { useState, useEffect } from "react";

interface SubCategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subCategories: SubCategory[];
}

interface Props {
    onSelectSubCategory: (subcategoryId: number) => void;
}

const CategoryMenu: React.FC<Props> = ({ onSelectSubCategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

    useEffect(() => {
        fetch("/api/users/categories")
            .then(res => res.json())
            .then(data => setCategories(data));
    }, []);

    return (
        <div className="w-64 bg-white p-4 border rounded-md shadow-sm">
            {categories.map(category => (
                <div key={category.id} className="mb-2">
                    <button
                        className="font-semibold w-full text-left"
                        onClick={() =>
                            setOpenCategoryId(openCategoryId === category.id ? null : category.id)
                        }
                    >
                        {category.name}
                    </button>
                    {openCategoryId === category.id && (
                        <ul className="ml-4 mt-1 list-disc text-sm text-gray-700">
                            {category.subCategories.map(sub => (
                                <li key={sub.id} className="cursor-pointer hover:underline"
                                    onClick={() => onSelectSubCategory(sub.id)}>
                                    {sub.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CategoryMenu;
