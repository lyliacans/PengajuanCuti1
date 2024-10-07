const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// Dummy Database
let pengajuanCuti = [];

// Route untuk pengajuan cuti
app.post('/ajukanCuti', (req, res) => {
  const { nama, tanggal_mulai, tanggal_selesai, alasan } = req.body;
  pengajuanCuti.push({
    nama,
    tanggal_mulai,
    tanggal_selesai,
    alasan,
    status_pengajuan: 'Menunggu'
  });
  res.json({ message: 'Pengajuan cuti berhasil dikirim!' });
});

// Menjalankan server di port 3000
app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});

app.post('/updateCuti', (req, res) => {
    const { id_pengajuan, status_pengajuan } = req.body;
    pengajuanCuti = pengajuanCuti.map(cuti => cuti.id_pengajuan === id_pengajuan ? { ...cuti, status_pengajuan } : cuti);
    res.json({ message: 'Status cuti berhasil diperbarui!' });
  });
  
  const mysql = require('mysql2');

// Buat koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan user MySQL-mu
  password: 'Setyaningrum18', // Ganti dengan password MySQL-mu
  database: 'db_cuti'
});

// Cek koneksi
db.connect((err) => {
  if (err) throw err;
  console.log('Koneksi ke MySQL berhasil!');
});

// Contoh query untuk mengajukan cuti
app.post('/ajukanCuti', (req, res) => {
  const { nama, tanggal_mulai, tanggal_selesai, alasan } = req.body;
  const sql = `INSERT INTO pengajuan_cuti (id_pegawai, tanggal_mulai, tanggal_selesai, alasan)
               VALUES (?, ?, ?, ?)`;

  // Asumsi id_pegawai diketahui (misalnya dari session)
  const id_pegawai = 1;

  db.query(sql, [id_pegawai, tanggal_mulai, tanggal_selesai, alasan], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Pengajuan cuti berhasil!' });
  });
});
