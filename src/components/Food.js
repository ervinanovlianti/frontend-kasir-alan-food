// src/components/Food.js
import React from 'react';
import FoodList from './FoodList';
import './Food.css';
import { Link } from 'react-router-dom';

const staticMenuData = [
    {
        id: 1,
        name: 'Nasi Goreng',
        price: 15.000,
        image: 'nasi-goreng.jpg',
    },
    {
        id: 3,
        name: 'Ayam Goreng',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 10.000,
        image: 'ayam-goreng.jpeg',
    },
];


const Food = () => {
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
                        { staticMenuData.map(food => (
                            <FoodList
                                key={ food.id }
                                id={ food.id }
                                image={ food.image }
                                name={ food.name }
                                price={ food.price }
                            />
                        )) }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default Food;
