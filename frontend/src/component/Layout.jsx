// src/component/Layout.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Admin Navigation Component
const AdminNav = () => (
    <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">Admin Dashboard</Link>
            <div className="space-x-4">
                <Link to="/categories" className="hover:text-gray-300">Categories</Link>
                <Link to="/create-category" className="hover:text-gray-300">Create Category</Link>
                <Link to="/create-product" className="hover:text-gray-300">Create Product</Link>
                <Link to="/create-user" className="hover:text-gray-300">Create User</Link>
                <Link to="/stats" className="hover:text-gray-300">Stats</Link>
            </div>
        </div>
    </nav>
);

// User Navigation Component (for non-admin users)
const UserNav = () => (
    <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">User Dashboard</Link>
            <div className="space-x-4">
                <Link to="/categories" className="hover:text-gray-300">Categories</Link>
                <Link to="/products" className="hover:text-gray-300">Products</Link>
            </div>
        </div>
    </nav>
);

// Guest Navigation Component (for unauthenticated users)
const GuestNav = () => (
    <nav className="bg-gray-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-xl font-bold">My App</Link>
            <div className="space-x-4">
                <Link to="/login" className="hover:text-gray-300">Login</Link>
                <Link to="/register" className="hover:text-gray-300">Register</Link>
            </div>
        </div>
    </nav>
);

const Layout = ({ children }) => {
    const auth = useAuth();
    const navigate = useNavigate();

    // Handle loading state when auth context is not yet initialized
    if (!auth) {
        return <div>Loading...</div>;
    }

    const { user, logout } = auth;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Render the appropriate navbar based on user role
    const renderNav = () => {
        if (!user) {
            return <GuestNav />;
        }

        // Assuming 'admin' is the only role with special privileges
        // You can extend this logic for other roles if needed
        switch (user.role) {
            case 'admin':
                return <AdminNav />;
            default:
                return <UserNav />;
        }
    };

    return (
        <div>
            {renderNav()}
            {user && (
                <div className="absolute right-4 top-4">
                    <span className="text-white mr-4">
                        Welcome, {user.username} ({user.role})
                    </span>
                    <button
                        onClick={handleLogout}
                        className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
            <div className="container mx-auto p-4">
                {children}
            </div>
        </div>
    );
};

export default Layout;