import React, { useState } from 'react';
import './Style.css';

const FormTambahMenu = ({ tambahMenu }) => {
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [gambar, setGambar] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validasi input di sini jika diperlukan

        // Buat objek menu baru
        const menuBaru = {
            nama,
            harga: parseFloat(harga), // Ubah ke tipe data angka
            gambar,
        };

        // Kirim objek menu baru ke fungsi tambahMenu yang ada di komponen induk
        tambahMenu(menuBaru);

        // Reset form setelah pengiriman
        setNama('');
        setHarga('');
        setGambar('');
    };

    return (
        <div className='container-foods'>

            <form onSubmit={ handleSubmit }>
                <h3>Tambah Menu Baru</h3>
                <div>
                    <label htmlFor="nama">Nama Menu:</label>
                    <input
                        type="text"
                        id="nama"
                        value={ nama }
                        onChange={ (e) => setNama(e.target.value) }
                        required
                    />
                </div>
                
                <div>
                    <label>Gambar:</label>
                    <label className="custom-file-upload">
                        <input type="file" accept=".jpg, .jpeg, .png" />
                    </label>
                </div>
                <div>
                    <label htmlFor="harga">Harga Menu (Rp)</label>
                    <input
                        type="number"
                        id="harga"
                        value={ harga }
                        onChange={ (e) => setHarga(e.target.value) }
                        required
                    />
                </div>
                <div className='button-container'>
                    <button type="submit">Simpan</button>
                </div>
            </form>
        </div>

    );
};

export default FormTambahMenu;
