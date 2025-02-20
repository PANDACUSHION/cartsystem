import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
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
            setMessage(`User created with ID: ${response.data.user.id}`);
            setUserData({
                username: '',
                full_name: '',
                address: '',
                phone: '',
                password: '',
                image: null,
            });
        } catch (err) {
            setMessage(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={userData.username}
                    onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                    placeholder="Username"
                    required
                />
                <input
                    type="text"
                    value={userData.full_name}
                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                    placeholder="Full Name"
                    required
                />
                <input
                    type="text"
                    value={userData.address}
                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                    placeholder="Address"
                    required
                />
                <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                    placeholder="Phone"
                    required
                />
                <input
                    type="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    placeholder="Password"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setUserData({ ...userData, image: e.target.files[0] })}
                />
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateUser;