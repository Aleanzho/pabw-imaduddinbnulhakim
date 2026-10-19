// js/app.js — P11: perakit. Hanya import dan pemanggilan; tidak ada logika.

import { ambilProyek } from "./api.js";
import { state, isiProyek, pulihkan, muat } from "./state.js";
import { tampilkanStatis, tampilkanGalat, aturMemuat, render } from "./dom.js";
import { pasangPendengar } from "./events.js";

async function mulai() {
  tampilkanStatis();               // judul, info film, tabel pemeran, perkenalan, footer
  pulihkan(muat());                // pilihan terakhir, atau nilai bawaan
  pasangPendengar();               // events.js: filter, favorit, atur ulang, form
  render(state);                   // tombol kategori sesuai state (daftar menunggu data)
  aturMemuat(true);
  try {
    isiProyek(await ambilProyek()); // isiProyek memanggil render(state)
  } catch (galat) {
    tampilkanGalat("Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.");
    console.error(galat.message);   // untuk Anda, bukan untuk pengguna
  } finally {
    aturMemuat(false);
  }
}

mulai();
