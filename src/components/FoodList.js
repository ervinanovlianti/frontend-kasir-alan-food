// src/components/MenuMakanan.js
import React from 'react';
import './Food.css';

const FoodList = ({ menuData }) => {
    return (
        <div>
            <h2>Daftar Menu Makanan</h2>
            <button className="button">Tambah Menu</button>
            <table>
                <thead>
                    <tr>
                        <th className='id'>ID</th>
                        <th className='nama'>Nama</th>
                        <th className='gambar'>Gambar</th>
                        <th className='harga'>Harga</th>
                    </tr>
                </thead>
                <tbody>
                    { menuData.map(item => (
                        <tr key={ item.id }>
                            <td>{ item.id }</td>
                            <td>{ item.name }</td>
                            <td></td>
                            <td>${ item.price.toFixed(2) }</td>
                        </tr>
                    )) }
                </tbody>
            </table>
        </div>
    );
};

export default FoodList;
