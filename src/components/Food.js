import './Food.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Food = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    let [menuNumber, setMenuNumber] = useState(1);
    const API_BASE_URL = 'http://localhost:8000';

    useEffect(() => {
        // Mengambil data menu makanan dari API Laravel
        axios.get(`${API_BASE_URL}/api/menus`)
            .then((response) => {
                setMenus(response.data.data); // Menyimpan data JSON ke dalam state (response.data.data mengacu pada data menu)
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    const handleDelete = (menuId) => {
        // Lakukan tindakan hapus, misalnya dengan mengirim permintaan ke backend
        if (window.confirm('Anda yakin ingin menghapus menu ini?'))
        {
            axios.delete(`${API_BASE_URL}/api/menu/${menuId}`)
                .then(response => {
                    console.log(`Menu dengan ID ${menuId} telah dihapus.`);
                    setMenus(menus.filter(menu => menu.id !== menuId));
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    if (loading)
    {
        return <div className="container-foods">Mengambil data...</div>;
    }

    if (!menus.length)
    {
        return <div className="container-foods">Tidak ada data menu.</div>;
    }

    return (
        <div className="container-foods">
            <h2>Daftar Menu Makanan</h2>
            <Link className="button-info" to="/tambah-data">Tambah Menu</Link>
            <div>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th className='id'>#</th>
                            <th className='nama'>Nama</th>
                            <th className='gambar'>Foto</th>
                            <th className='harga'>Harga</th>
                            <th className='aksi'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        { menus.map((menu) => (
                            <tr key={ menu.id }>
                                <td>{ menuNumber++ }</td>
                                <td>{ menu.name }</td>
                                <td>
                                    <img src={ `http://localhost:8000/storage/images/${menu.image}` } alt={ menu.name } width="100" />
                                </td>
                                <td>Rp. { menu.price.toLocaleString('id-ID') }</td>
                                <td>
                                    <Link to={ `/edit-menu/${menu.id}` } className="button-info">
                                        Edit
                                    </Link>
                                    <button onClick={ () => handleDelete(menu.id) } className='button-danger'>Hapus</button>
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>

        </div>
    );
};


export default Food;
