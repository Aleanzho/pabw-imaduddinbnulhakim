// js/events.js — P11: seluruh pemasangan pendengar peristiwa.
// Pendengar hanya memanggil fungsi pengubah; tidak ada yang mengubah state langsung.

import { state, pilihKategori, tambahFavorit, hapusFavorit, aturUlang } from "./state.js";
import { tanggapiInputForm, tanggapiKirimForm } from "./dom.js";

export function pasangPendengar() {
  // Filter kategori
  document.querySelector("#filter").addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !tombol.dataset.kategori) return;
    pilihKategori(tombol.dataset.kategori);
  });

  // Tombol favorit: satu pendengar di wadah daftar
  document.querySelector("#daftar-proyek").addEventListener("click", (event) => {
    const tombol = event.target.closest(".favorit");
    if (!tombol) return;
    const id = Number(tombol.dataset.id);
    if (state.favorit.includes(id)) hapusFavorit(id);
    else tambahFavorit(id);
  });

  // Atur ulang
  document.querySelector("#atur-ulang").addEventListener("click", aturUlang);

  // Form rating (logika validasinya tetap di dom.js)
  const form = document.querySelector("#form-rating");
  form.addEventListener("input", tanggapiInputForm);
  form.addEventListener("submit", tanggapiKirimForm);
}
