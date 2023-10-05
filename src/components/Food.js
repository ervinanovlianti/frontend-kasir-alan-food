// src/components/Food.js
import './Food.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Food = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mengambil data menu makanan dari API Laravel
        axios.get('http://localhost:8000/api/menus')
            .then((response) => {
                setMenus(response.data.data); // Menyimpan data JSON ke dalam state (response.data.data mengacu pada data menu)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading)
    {
        return <div>Mengambil data...</div>;
    }

    if (!menus.length)
    {
        return <div>Tidak ada data menu.</div>;
    }

    return (
        <div className="container-foods">
            <h2>Daftar Menu Makanan</h2>
            <Link className="button" to="/tambah-data">Tambah Menu</Link>
            <div className='table-menu'>
                <table>
                    <thead>
                        <tr>
                            <th className='id'>#</th>
                            <th className='nama'>Nama</th>
                            <th className='gambar'>Foto</th>
                            <th className='harga'>Harga</th>
                        </tr>
                    </thead>
                    <tbody>
                        { menus.map((menu) => (
                            <tr key={ menu.id }>
                                <td>{ menu.id }</td>
                                <td>{ menu.name }</td>
                                <td>
                                    <img src={ process.env.PUBLIC_URL + `/images/${menu.image}` } alt={ menu.name } width="100" />
                                </td>
                                <td>Rp. { menu.price }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};


export default Food;
