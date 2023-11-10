import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const EditData = () => {
    const { id } = useParams();

    const [menu, setMenu] = useState({
        name: '',
        price: 0,
    });

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/menu/${id}`)
            .then((response) => {
                const { name, price } = response.data.data;
                setMenu({ name, price });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMenu({
            ...menu,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`http://localhost:8000/api/menu/${id}`, menu)
            .then((response) => {
                console.log('Data menu berhasil diubah:', response.data);
                alert('Data menu berhasil diubah!');
                window.location = '/';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="container-foods">
            <h2>Edit Menu</h2>
            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label>Nama:</label>
                    <input
                        type="text"
                        name="name"
                        value={ menu.name }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <label>Harga:</label>
                    <input
                        type="number"
                        name="price"
                        value={ menu.price }
                        onChange={ handleInputChange }
                    />
                </div>
                <div className="form-group">
                    <label>Image:</label>
                    <label className='custom-file-upload'>
                        <input
                            type="file"
                            name="image"
                            value={ menu.image }
                            onChange={ handleInputChange }
                        />
                    </label>
                    
                </div>
                <button type="submit">Simpan Perubahan</button>
                <Link to="/food">Kembali ke Daftar Menu</Link>
            </form>
        </div>
    );
};

export default EditData;
