import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FolderOpen, AlertCircle, Loader2, Search, Plus } from 'lucide-react';

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories/all', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                setCategories(response.data.categories || []);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[200px]">
                <div className="flex items-center gap-2 text-base-content/60">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Loading categories...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-error">
                <AlertCircle className="w-5 h-5" />
                <span>{error}</span>
            </div>
        );
    }

    return (
        <div className="bg-base-100 rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <FolderOpen className="w-6 h-6 text-primary" />
                    <h2 className="text-2xl font-semibold text-base-content">Categories</h2>
                </div>
                <button className="btn btn-primary btn-sm gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                    type="text"
                    placeholder="Search categories..."
                    className="input input-bordered w-full pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {/* Categories Grid */}
            {filteredCategories.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCategories.map((category) => (
                        <div
                            key={category.id}
                            className={`
                                p-4 rounded-lg border cursor-pointer transition-all
                                hover:border-primary hover:shadow-md
                                ${selectedCategory?.id === category.id
                                ? 'border-primary bg-primary/5'
                                : 'border-base-300 bg-base-100'}
                            `}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="font-medium text-base-content">
                                    {category.name}
                                </h3>
                                <span className="text-sm text-base-content/60">
                                    {/* Assuming category has a count property */}
                                    {category.count || 0} items
                                </span>
                            </div>
                            {/* You can add more category details here */}
                            {category.description && (
                                <p className="text-sm text-base-content/60 mt-2 line-clamp-2">
                                    {category.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    {searchTerm ? (
                        <div className="text-base-content/60">
                            <p>No categories found matching "{searchTerm}"</p>
                            <button
                                className="btn btn-ghost btn-sm mt-2"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear search
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 text-base-content/60">
                            <FolderOpen className="w-12 h-12" />
                            <p>No categories available.</p>
                            <p className="text-sm">Start by adding your first category!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoryList;