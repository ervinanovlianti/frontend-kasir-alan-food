// src/components/Food.js
import React from 'react';
import FoodList from './FoodList';
import './Food.css';
const staticMenuData = [
    {
        id: 1,
        name: 'Nasi Goreng',
        price: 10.99,
        description: 'Nasi goreng dengan telur dan ayam',
    },
    {
        id: 2,
        name: 'Mie Ayam',
        price: 8.99,
        description: 'Mie ayam dengan bakso',
    },
    // Tambahkan lebih banyak item menu makanan sesuai kebutuhan
];

const Food = () => {
    return (
        <div className="container">
            <FoodList menuData={ staticMenuData } /> {/* Gunakan komponen MenuMakanan */ }
        </div>
    );
};

export default Food;
