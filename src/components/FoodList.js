import React from 'react';
import './Food.css';

const FoodList = ({ id, image, name, price }) => {
    const imagePath = process.env.PUBLIC_URL + `/images/${image}`;
    return (
        <tr>
            <td>{ id }</td>
            <td>{ name }</td>
            <td><img src={ imagePath } alt={ `Gambar ${name}` } className="image-table" /></td>
            <td>Rp. { price.toFixed(3) }</td>
        </tr>
    );
};

export default FoodList;
