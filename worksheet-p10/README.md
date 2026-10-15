
## Pertemuan 10 — JavaScript Asinkron: fetch, Promise, dan JSON

Folder: `worksheet-p10/` (halaman: `profil.html`, skrip: `js/app.js`, `js/api.js`, dan `js/dom.js`, data: `data/proyek.json`)

### Yang dikerjakan
- Daftar proyek dipindah dari array di `app.js` ke `data/proyek.json`, lalu diambil lewat `fetch` di `js/api.js`.
- `ambilProyek()` memakai `async/await`, memeriksa `respons.ok` sebelum `json()`, dan satu `try/catch` yang melempar ulang galatnya.
- Alamat data hanya ditulis satu kali (`ALAMAT` di `js/api.js`); kata `fetch` hanya ada di berkas itu.
- `js/dom.js` mengekspor `render`, `tampilkanGalat`, dan `aturMemuat`; `js/app.js` merakit dengan `try/catch/finally`.
- Empat keadaan antarmuka: memuat, berhasil, gagal, dan kosong.
- Data diambil dari GitHub lewat alamat `raw.githubusercontent.com` (D.5): <ISI: ya / kembali ke file lokal karena ...>.

### Deklarasi penggunaan AI
- **Dibantu AI (Claude):** draf `js/api.js` dan `data/proyek.json`; perubahan `js/app.js` (impor, `muat()`, penyaring, `try/catch/finally`), `js/dom.js` (`aturMemuat`, `tampilkanGalat`, `pasangFilter`, `kategoriAktif`), `profil.html` (elemen `#muat` dan `#galat-data`), dan satu aturan di `komponen.css`.
- **Saya kerjakan sendiri:** <Mengetik ulang kode per lembar, menguji tiga kegagalan di panel Network, mengisi tabel A.1 sampai E.4, tiket keluar, penilaian mandiri, dan tangkapan layar>.
- **Yang saya pahami dan bisa jelaskan:** <Mengapa fetch tidak menolak Promise pada 404, di mana await boleh dipakai, peran try/catch/finally, mengapa fetch hanya ada di api.js>.
