## Pertemuan 8 — JavaScript Modern ES6+, Struktur Data, dan Array Methods

Folder: `worksheet-p8/` (halaman: `profil.html`, skrip: `js/app.js`)

### Deklarasi penggunaan AI
- **Dibantu AI (Claude):** draf awal `js/app.js` dan perubahan `profil.html` (penambahan id, bagian "Tentang Pembuat Halaman", dan baris `<script>`).
- **Saya kerjakan sendiri:** <ISI JUJUR: misalnya mengetik ulang kode per lembar, mengisi data diri dan daftar proyek, menjalankan di Console, mengisi tabel E.5, tiket keluar, penilaian mandiri, dan tangkapan layar>.
- **Yang saya pahami dan bisa jelaskan:** <ISI: misalnya const/let, fungsi murni, map/filter/find, penyalinan dengan { ...obj }>.

## Pertemuan 9 — DOM, Event, dan Interaktivitas

Folder: `worksheet-p9/` (halaman: `profil.html`, skrip: `js/app.js` dan `js/dom.js`)

### Yang dikerjakan
- Daftar proyek digambar dari array `daftarProyek` dengan `createElement` + `textContent` (tanpa `innerHTML`).
- Tombol filter kategori memakai satu pendengar di induknya (`#filter`), `event.target.closest("button")`, dan `dataset.kategori`.
- Satu fungsi `render(daftar)`: kosongkan wadah, tangani keadaan kosong, lalu isi ulang.
- Form rating diberi `preventDefault`, validasi per kolom (nama dan rating), pesan galat yang menyebut cara memperbaiki, dan tombol kirim yang menunggu isian layak.

### Deklarasi penggunaan AI
- **Dibantu AI (Claude):** draf awal `js/dom.js`, perubahan `profil.html` (id, tombol filter, pesan kosong, pesan galat, `novalidate`).
- **Saya kerjakan sendiri:** Mengetik ulang kode per lembar, menguji pemilih di Console, mengisi tabel A.2 sampai E.4, tiket keluar, penilaian mandiri, dan tangkapan layar>.
- **Yang saya pahami dan bisa jelaskan:** querySelector vs querySelectorAll, event delegation, mengapa wadah dikosongkan dulu, mengapa textContent bukan innerHTML>.

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
- **Saya kerjakan sendiri:** <ISI JUJUR: misalnya mengetik ulang kode per lembar, menguji tiga kegagalan di panel Network, mengisi tabel A.1 sampai E.4, tiket keluar, penilaian mandiri, dan tangkapan layar>.
- **Yang saya pahami dan bisa jelaskan:** <ISI: misalnya mengapa fetch tidak menolak Promise pada 404, di mana await boleh dipakai, peran try/catch/finally, mengapa fetch hanya ada di api.js>.
