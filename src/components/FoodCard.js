import React from 'react';
import './Food.css';

const FoodCard = ({ image, name, price }) => {
    const imagePath = process.env.PUBLIC_URL + `/images/${image}`;

    return (
        <div className="card">
            <img src={ imagePath } alt={ `Gambar ${name}` } className="food-image" />
            <p className="food-name">{ name }</p>
            <p className="food-price">Rp. { price}</p>
        </div>
    );
};

export default FoodCard;