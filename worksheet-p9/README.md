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
