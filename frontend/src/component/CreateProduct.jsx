import React, { useState } from 'react';
import axios from 'axios';

const CreateProduct = () => {
    const [productData, setProductData] = useState({
        product_name: '',
        category_id: '',
        quantity: '',
        price: '',
        image: null,
    });
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', productData.product_name);
        formData.append('category_id', productData.category_id);
        formData.append('quantity', productData.quantity);
        formData.append('price', productData.price);
        if (productData.image) formData.append('image', productData.image);

        try {
            const response = await axios.post('http://localhost:5000/product/create', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(`Product created with ID: ${response.data.product.id}`);
            setProductData({
                product_name: '',
                category_id: '',
                quantity: '',
                price: '',
                image: null,
            });
        } catch (err) {
            setMessage(`Error: ${err.response?.data?.message || err.message}`);
        }
    };

    return (
        <div>
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={productData.product_name}
                    onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
                    placeholder="Product Name"
                    required
                />
                <input
                    type="number"
                    value={productData.category_id}
                    onChange={(e) => setProductData({ ...productData, category_id: e.target.value })}
                    placeholder="Category ID"
                    required
                />
                <input
                    type="number"
                    value={productData.quantity}
                    onChange={(e) => setProductData({ ...productData, quantity: e.target.value })}
                    placeholder="Quantity"
                    required
                />
                <input
                    type="number"
                    value={productData.price}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                    placeholder="Price"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setProductData({ ...productData, image: e.target.files[0] })}
                />
                <button type="submit">Create</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateProduct;