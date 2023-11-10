
import React, { useState } from 'react';
import axios from 'axios';
import './Style.css';

const TambahMenu = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('image', image);

        try
        {
            const response = await axios.post('http://localhost:8000/api/menu', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // console.log('Menu added:', response.data);
            alert('Menu Berhasil Ditambahkan!');
            // pindah ke halaman Food
            window.location = '/';
            
        } catch (error)
        {
            console.error('Error:', error);
        }
    };

    return (
        <div className='container-foods'>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label>Name:</label>
                    <input type="text" value={ name } onChange={ (e) => setName(e.target.value) } />
                </div>
                <div>
                    <label>Price:</label>
                    <input type="number" value={ price } onChange={ (e) => setPrice(e.target.value) } />
                </div>
                <div>
                    <label>Image:</label>
                    <label className='custom-file-upload'>
                        <input type="file" onChange={ handleImageUpload } />
                    </label>
                </div>
                <div>
                <button type="submit">Tambah Menu</button>
                </div>
            </form>
        </div>
        
    );
};


export default TambahMenu;
