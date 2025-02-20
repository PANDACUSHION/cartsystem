import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
        full_name: '',
        address: '',
        phone: '',
        password: '',
        image: null,
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', userData.username);
        formData.append('full_name', userData.full_name);
        formData.append('address', userData.address);
        formData.append('phone', userData.phone);
        formData.append('password', userData.password);
        if (userData.image) formData.append('image', userData.image);

        try {
            const response = await axios.post('http://localhost:5000/api/users/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(`Registration successful! Welcome, ${response.data.user.full_name}`);

            // Redirect to login after successful registration
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setMessage(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    placeholder="Username"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={userData.full_name}
                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                    placeholder="Full Name"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    placeholder="Address"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="Phone"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    placeholder="Password"
                    required
                    className="w-full p-2 border rounded"
                />
                <input
                    type="file"
                    onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default Register;
