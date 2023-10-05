// src/components/Food.js
import React from 'react';
import FoodCard from './FoodCard'; // Impor komponen FoodCard
import './Food.css';


const Transaksi = () => {
    const foodData = [
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

    return (
        
        <div className="container">
            <div className="food-cards">
                { foodData.map(food => (
                    <FoodCard
                        key={ food.id }
                        image={ food.image }
                        name={ food.name }
                        price={ food.price }
                    />
                )) }
            </div>
            <div className="order-summary">
                <table>
                    <h3 className="table-title">Pesanan</h3>
                    <tbody>
                            <tr>
                                <td>Image</td>
                                <td>Ayam Bakar</td>
                                <td>x1</td>
                                <td>11.000</td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaksi;