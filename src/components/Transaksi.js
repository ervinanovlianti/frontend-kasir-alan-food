import React, { useState, useEffect } from 'react';
import './Food.css';
import axios from 'axios';

const Transaksi = () => {
    const [menus, setMenus] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pesanan, setPesanan] = useState([]);
    const [showSavedModal, setShowSavedModal] = useState(false);
    const [showChargeModal, setShowChargeModal] = useState(false);
    const [uangPembeli, setUangPembeli] = useState('');
    const [kembalian, setKembalian] = useState(0);

    const API_BASE_URL = 'http://localhost:8000';

    useEffect(() => {
        // Mengambil data menu makanan dari API Laravel
        axios.get(`${API_BASE_URL}/api/menus`)
            .then((response) => {
                setMenus(response.data.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);

    if (loading){
        return <div>Mengambil data...</div>;
    }

    if (!menus.length){
        return <div>Tidak ada data menu.</div>;
    }

    const tambahKePesananSementara = (menu) => {
        const pesananBaru = { ...pesanan };

        // Periksa apakah menu sudah ada di pesanan
        if (pesananBaru[menu.id])
        {
            // Jika sudah ada, tambahkan 1 ke jumlahnya
            pesananBaru[menu.id] += 1;
        } else
        {
            // Jika belum ada, buat entri baru dengan jumlah 1
            pesananBaru[menu.id] = 1;
        }
        setPesanan(pesananBaru);
    };
    const hitungSubtotal = (menuId) => {
        const menu = menus.find((menu) => menu.id === parseInt(menuId, 10));
        const quantity = pesanan[menuId];
        return menu.price * quantity;
    };

    // Fungsi untuk menghitung subtotal keseluruhan
    const hitungSubtotalKeseluruhan = () => {
        let total = 0;
        Object.keys(pesanan).forEach((menuId) => {
            total += hitungSubtotal(menuId);
        });
        return total;
    };

    const clearCart = () => {
        setPesanan({}); 
    };

    const printBill = () => {
        window.print();
    };
    const handleSaveBill = () => {
        setShowSavedModal(true);

        setTimeout(() => {
            setShowSavedModal(false);
        }, 3000); 
    };


    // Fungsi untuk menampilkan atau menyembunyikan modal "Total Charge"
    const toggleChargeModal = () => {
        setShowChargeModal(!showChargeModal);
    };

    // Fungsi untuk menghitung kembalian
    const hitungKembalian = (uangPembeliInput) => {
        const totalCharge = hitungSubtotalKeseluruhan();
        const uangPembeliNumber = parseFloat(uangPembeliInput.replace(/[,]/g, ''));

        if (!isNaN(uangPembeliNumber))
        {
            const totalKembalian = uangPembeliNumber - totalCharge;
            setKembalian(totalKembalian.toLocaleString('id-ID')); 
        } else
        {
            setKembalian(0);
        }
    };

    const handlePay = () => {
        const total = hitungSubtotalKeseluruhan();
        const uangPembeliNumber = parseFloat(uangPembeli.replace(/[,.]/g, ''));

        if (!isNaN(uangPembeliNumber) && uangPembeliNumber >= total)
        {
            const kembalianValue = uangPembeliNumber - total;

            // Konversi pesanan menjadi array order_items
            const orderItems = Object.keys(pesanan).map((menuId) => ({
                menu_id: menuId,
                quantity: pesanan[menuId],
            }));

            axios
                .post(`${API_BASE_URL}/api/orders`, {
                    total: total,
                    uang_pembeli: uangPembeliNumber,
                    kembalian: kembalianValue,
                    order_items: orderItems, 
                })
                .then((response) => {
                    console.log('Pesanan berhasil disimpan:', response.data);
                    toggleChargeModal(); 
                    clearCart();
                    // alert('Pembayaran berhasil!');
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        } else
        {
            alert('Uang pembeli tidak mencukupi.');
        }
    };

    return (
        <div className="container">
            <div className="food-cards">
                { menus.map((menu) => (
                    <div className="card" key={ menu.id } onClick={ () => tambahKePesananSementara(menu) }>
                        <img src={ `http://localhost:8000/storage/images/${menu.image}` } alt={ menu.name } className='food-image'/>
                        <p className="food-name">{ menu.name }</p>
                        <p className="food-price">Rp. { menu.price.toLocaleString('id-ID') }</p>
                    </div>
                )) }
            </div>
            <div className="order-summary">
                <h3>Pesanan</h3>
                <table className='table table-hover'>
                    <tbody>
                        { Object.keys(pesanan).map((menuId) => (
                            <tr key={ menuId }>
                                <td><img src={ `http://localhost:8000/storage/images/${menus.find((menu) => menu.id === parseInt(menuId, 10)).image}` } alt={ menus.find((menu) => menu.id === parseInt(menuId, 10)).name } width="100" />
                                </td>
                                <td>{ menus.find((menu) => menu.id === parseInt(menuId, 10)).name }</td>
                                <td>{ pesanan[menuId] }</td>
                                <td>Rp. { hitungSubtotal(menuId) }</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                <div>

                    <button onClick={ clearCart } className='clear-button'>Clear Cart</button>
                </div>
                <div className="action-buttons">
                    <button onClick={ printBill } className='custom-button-success'>Print Bill</button>
                    <button onClick={ handleSaveBill } className='custom-button-success'>Save Bill</button> 
                </div>
                <div className={ `alert ${showSavedModal ? 'active' : ''}` }>
                    Bill berhasil disimpan
                </div>
                <div className="subtotal" style={ { marginTop: '20px' } }>
                    <button className='block-button' onClick={ toggleChargeModal }>Charge Rp. { hitungSubtotalKeseluruhan().toLocaleString('id-ID') }</button>
                </div>
            </div>
            { showSavedModal && (
                <div className="modal">
                    <div className="modal-content">
                        <p>Bill Saved</p>
                        <button onClick={ () => setShowSavedModal(false) }>OK</button>
                    </div>
                </div>
            ) }

            {/* Modal "Total Charge" */ }
            <div className={ `modal ${showChargeModal ? 'active' : ''}` }>
                <div className="modal-content">
                    <h3>Detail Pesanan</h3>
                    <div className="table-and-input">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Gambar</th>
                                    <th>Makanan</th>
                                    <th>Jumlah</th>
                                    <th>Harga</th>
                                </tr>
                            </thead>
                            <tbody>
                                { Object.keys(pesanan).map((menuId) => (
                                    <tr key={ menuId }>
                                        <td>{ + 1 }</td>
                                        <td>
                                            <img
                                                src={
                                                    `http://localhost:8000/storage/images/${menus.find(
                                                        (menu) => menu.id === parseInt(menuId, 10)
                                                    ).image}`
                                                }
                                                alt={
                                                    menus.find(
                                                        (menu) => menu.id === parseInt(menuId, 10)
                                                    ).name
                                                }
                                                width="100"
                                            />
                                        </td>
                                        <td>
                                            { menus.find((menu) => menu.id === parseInt(menuId, 10)).name }
                                        </td>
                                        <td>{ pesanan[menuId] }</td>
                                        <td>Rp. { hitungSubtotal(menuId).toLocaleString('id-ID') }</td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                        <div className="uang-pembeli-input">
                            <h5>Uang Pembeli (Rp)</h5>
                            <input
                                type="text"
                                placeholder="Uang Pembeli"
                                value={ uangPembeli }
                                onChange={ (e) => {
                                    const inputValue = e.target.value;
                                    setUangPembeli(inputValue);
                                    hitungKembalian(inputValue);
                                } }
                            />
                            <p>Kembalian: Rp. { kembalian.toLocaleString('id-ID') }</p>
                            <button className='button-close' onClick={ toggleChargeModal }>Close</button>
                            <button className='button' onClick={ handlePay }>Pay</button> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transaksi;
