// src/App.js


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Food from './components/Food';
import Transaksi from './components/Transaksi';
import TambahData from './components/TambahData';




const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/food" element={ <Food /> } />
        <Route path="/transaksi" element={ <Transaksi /> } />
        <Route path="/tambah-data" element={ <TambahData /> } />
      </Routes>

    </Router>
  );
};

export default App;
