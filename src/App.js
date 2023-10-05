// src/App.js


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Food from './components/Food';



const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/food" element={ <Food /> } />
      <Route path="/transaksi" element={ Transaksi } />
      </Routes>

    </Router>
  );
  // function Food() {
  //   return <h2>Home</h2>;
  // }
};

export default App;
