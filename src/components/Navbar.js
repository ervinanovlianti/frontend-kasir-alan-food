// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                <h1 className="nav-brand">Alan Food</h1>
            </div>
            <ul className="nav-menu">
                <li className="nav-item">
                    <Link to="/">Food</Link>
                </li>
                <li className="nav-item">
                    <Link to="/transaksi">Transaksi</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
