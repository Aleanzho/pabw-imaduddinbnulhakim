// js/state.js — P11: satu objek state, fungsi pengubahnya, dan simpanan localStorage.
// Hanya pilihan tampilan yang disimpan. Data proyek dari server, token, dan data pribadi TIDAK disimpan.

import { render } from "./dom.js";

const KUNCI = "pabw-p11";
const VERSI = 2;

// Satu-satunya sumber kebenaran. dimuat = true setelah data proyek dari server tiba.
export const state = {
  kategoriAktif: "semua",
  favorit: [],
  daftarProyek: [],
  dimuat: false,
};

// ---------- Simpanan (Lembar D + E) ----------

export function simpan(state) {
  const isi = {
    versi: VERSI,
    kategoriAktif: state.kategoriAktif,
    favorit: state.favorit,
  };
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi));
  } catch (galat) {
    console.error("simpanan gagal", galat.message);   // penyimpanan penuh/diblokir: halaman tetap jalan
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI));
    if (isi?.versi !== VERSI) {          // null (kunjungan pertama) atau bentuk lama
      localStorage.removeItem(KUNCI);
      return null;
    }
    return isi;
  } catch {
    localStorage.removeItem(KUNCI);      // isi rusak: buang
    return null;
  }
}

export function pulihkan(isi) {          // dipanggil sekali dari mulai() di app.js
  if (!isi) return;                      // kunjungan pertama: nilai bawaan tetap
  if (typeof isi.kategoriAktif === "string") state.kategoriAktif = isi.kategoriAktif;
  if (Array.isArray(isi.favorit)) state.favorit = isi.favorit;
}

export function aturUlang() {
  localStorage.removeItem(KUNCI);
  state.kategoriAktif = "semua";
  state.favorit = [];
  render(state);
}

// ---------- Fungsi pengubah: satu pintu masuk setiap perubahan ----------

export function isiProyek(daftar) {
  state.daftarProyek = daftar;
  state.dimuat = true;
  render(state);
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai;
  simpan(state);
  render(state);
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return;
  state.favorit = [...state.favorit, id];     // salinan baru, bukan push
  simpan(state);
  render(state);
}

export function hapusFavorit(id) {
  state.favorit = state.favorit.filter((x) => x !== id);
  simpan(state);
  render(state);
}
