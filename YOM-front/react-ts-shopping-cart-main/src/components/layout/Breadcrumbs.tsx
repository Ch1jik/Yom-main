import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbsProps {
    category?: string;
    subcategory?: string;
}

interface Category {
    id: number;
    name: string;
    // ... any other fields you might have for Category
}

interface SubCategory {
    id: number;
    name: string;
    categoryId: number;
    // ... any other fields you might have for SubCategory
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ category, subcategory }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
    const location = useLocation();

    useEffect(() => {
        // Fetch all categories when component mounts
        fetch("https://localhost:7014/api/Category/AllCategories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error("Error fetching categories:", error));
    }, []);

    useEffect(() => {
        // Fetch subcategories for the selected category
        if (category) {
            fetch(`https://localhost:7014/api/SubCategory/AllSubCategories/${category}`)
                .then(response => response.json())
                .then(data => setSubCategories(data))
                .catch(error => console.error("Error fetching subcategories:", error));
        }
    }, [category]);

    let breadcrumbs: JSX.Element[] = [];

    // Always add Home breadcrumb
    breadcrumbs.push(
        <div className="crumb" key="home">
            <Link to="/">Home</Link>
        </div>
    );

    // Find category name by its ID and add to breadcrumbs
    const categoryName = category && categories.find(cat => cat.id.toString() === category)?.name;

    if (categoryName) {
        breadcrumbs.push(
            <div className="crumb" key="category">
                <Link to={`/ads/bycategoryselect?categoryId=${category}`}>{categoryName}</Link>
            </div>
        );
    }

    // Find subcategory name by its ID and add to breadcrumbs
    const subCategoryName = subcategory && subCategories.find(sub => sub.id.toString() === subcategory)?.name;
    if (subCategoryName) {
        breadcrumbs.push(
            <div className="crumb" key="subcategory">
                <Link to={`/ads/bycategoryselect?categoryId=${category}&subCategoryId=${subcategory}`}>{subCategoryName}</Link>
            </div>
        );
    }

    return <div className='breadcrumbs'>{breadcrumbs}</div>;
}

export default Breadcrumbs;
