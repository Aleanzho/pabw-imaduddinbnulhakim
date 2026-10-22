# Worksheet P12 — Build Tooling, npm, dan Framework SPA

Halaman profil "The Return of the King: Catatan Film Saya" dari Pertemuan 11,
dimorting ke Vue 3 + Vite tanpa mengubah tampilan dan perilakunya.

## Pertemuan 12

**Perkakas (Lembar A)**

| Perintah | Versi |
| --- | --- |
| `node -v` | v22.16.0 |
| `npm -v` | 10.9.2 |

**Ukuran sebelum dan sesudah build (Lembar F)**

| Yang diukur | Sebelum build (`npm run dev`) | Sesudah build (`npm run preview`) |
| --- | --- | --- |
| Ukuran seluruh berkas yang dikirim | ISI_DARI_TAB_NETWORK | ISI_DARI_TAB_NETWORK |
| Jumlah berkas yang dikirim peramban | ISI_DARI_TAB_NETWORK | ISI_DARI_TAB_NETWORK |

**Deklarasi penggunaan AI**

Bagian yang dibantu AI: Draf kode komponen Vue dan penjelasan langkah).
Bagian yang saya kerjakan sendiri: Menjalankan semua perintah, memindahkan berkas,
menguji di peramban, mengisi worksheet dan jawaban tiket keluar.

## Menjalankan

```
npm install
npm run dev       # server pengembangan
npm run build     # menghasilkan dist/
npm run preview   # menjalankan isi dist/
```
