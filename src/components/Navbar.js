// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav>
            <div className="navbar">
                {/* Bagian atas Navbar (nav-brand) */ }
                <h1 className="nav-brand">Alan Food</h1>
            </div>
            <ul className="nav-menu">
                {/* Bagian bawah Navbar (nav-menu) */ }
                <li className="nav-item">
                    <Link to="/food">Food</Link>
                </li>
                <li className="nav-item">
                    <Link to="/transaksi">Transaksi</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
