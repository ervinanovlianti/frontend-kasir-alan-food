// import React, { useState } from 'react';
// import './Style.css';

// const FormTambahMenu = ({ tambahMenu }) => {
//     const [nama, setNama] = useState('');
//     const [harga, setHarga] = useState('');
//     const [gambar, setGambar] = useState('');

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Validasi input di sini jika diperlukan

//         // Buat objek menu baru
//         const menuBaru = {
//             nama,
//             harga: parseFloat(harga), // Ubah ke tipe data angka
//             gambar,
//         };

//         // Kirim objek menu baru ke fungsi tambahMenu yang ada di komponen induk
//         tambahMenu(menuBaru);

//         // Reset form setelah pengiriman
//         setNama('');
//         setHarga('');
//         setGambar('');
//     };

//     return (
//         <div className='container-foods'>

//             <form onSubmit={ handleSubmit }>
//                 <h3>Tambah Menu Baru</h3>
//                 <div>
//                     <label htmlFor="nama">Nama Menu:</label>
//                     <input
//                         type="text"
//                         id="nama"
//                         value={ nama }
//                         onChange={ (e) => setNama(e.target.value) }
//                         required
//                     />
//                 </div>

//                 <div>
//                     <label>Gambar:</label>
//                     <label className="custom-file-upload">
//                         <input type="file" accept=".jpg, .jpeg, .png" />
//                     </label>
//                 </div>
//                 <div>
//                     <label htmlFor="harga">Harga Menu (Rp)</label>
//                     <input
//                         type="number"
//                         id="harga"
//                         value={ harga }
//                         onChange={ (e) => setHarga(e.target.value) }
//                         required
//                     />
//                 </div>
//                 <div className='button-container'>
//                     <button type="submit">Simpan</button>
//                 </div>
//             </form>
//         </div>

//     );
// };

// export default FormTambahMenu;


import React, { useState } from 'react';
import axios from 'axios';
import './Style.css';


const TambahMenu = () => {
    const [menuData, setMenuData] = useState({
        name: '',
        price: '',
        image: null, 
    });

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === 'file')
        {
            // Jika input adalah input gambar, simpan file gambar yang dipilih
            setMenuData({ ...menuData, image: files[0] });
        } else
        {
            // Jika bukan input gambar, simpan nilai input seperti biasa
            setMenuData({ ...menuData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', menuData.name);
        formData.append('price', menuData.price);
        formData.append('image', menuData.image); 

        // Kirim data menu ke backend
        axios.post('http://localhost:8000/api/menus', formData, {
            headers: {
                'Content-Type': 'multipart/form-data', // Penting untuk mengirimkan file
            },
        })
            .then((response) => {
                console.log('Menu berhasil ditambahkan:', response.data);
                // Lakukan tindakan apa pun setelah menu berhasil ditambahkan
                // Contohnya, kembalikan pengguna ke halaman menu atau bersihkan formulir
                setMenuData({
                    name: '',
                    price: '',
                    image: null, // Reset input gambar
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle error, misalnya menampilkan pesan kesalahan kepada pengguna
            });
    };

    return (
        <div className='container-foods'>
            <h2>Tambah Menu Baru</h2>
            <form onSubmit={ handleSubmit }>
                <div>
                    <label htmlFor="nama">Nama Menu:</label>
                    <input
                        type="text"
                        name="name"
                        value={ menuData.name }
                        onChange={ handleInputChange }
                    />
                </div>
                <div>
                    <label>Harga:</label>
                    <input
                        type="number"
                        name="price"
                        value={ menuData.price }
                        onChange={ handleInputChange }
                    />
                </div>
                <div>
                    <label>Gambar:</label>
                    <label className="custom-file-upload">
                        <input type="file" accept=".jpg, .jpeg, .png" name='image' />
                    </label>
                </div>
                <div>
                    <button type="submit" className='button-success'>Simpan</button>
                </div>
            </form>
        </div>
    );
};

export default TambahMenu;
