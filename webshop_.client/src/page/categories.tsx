import React, { useState } from "react";
import CategoryMenu from "../components/CategoryMenu";
import ProductList from "../components/ProductList";

const SearchPage = () => {
    const [subcategoryId, setSubcategoryId] = useState<number | null>(null);

    return (
        <div className="flex">
            <div className="w-64">
                <CategoryMenu onSelectSubCategory={id => setSubcategoryId(id)} />
            </div>
            <div className="flex-1 p-4">
                {subcategoryId ? (
                    <ProductList subcategoryId={subcategoryId} />
                ) : (
                    <p className="text-gray-500">Válassz alkategóriát bal oldalt a termékek megtekintéséhez.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
