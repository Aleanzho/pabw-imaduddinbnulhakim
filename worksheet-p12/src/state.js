// src/state.js — dari P11: satu objek state, fungsi pengubahnya, dan simpanan localStorage.
// Bedanya dengan P11: state dibungkus reactive(), dan TIDAK ADA render(state) lagi.
// Hanya pilihan tampilan yang disimpan. Data proyek dari server TIDAK disimpan.

import { reactive } from 'vue'

const KUNCI = 'pabw-p11'
const VERSI = 2

// Satu-satunya sumber kebenaran. Tampilan mengikuti objek ini sendiri.
export const state = reactive({
  kategoriAktif: 'semua',
  daftarProyek: [],     // diisi dari api.js
  favorit: [],
  memuat: true,         // keadaan memuat dari P10
  galat: '',            // keadaan gagal dari P10
})

// ---------- Simpanan ----------

export function simpan(nilai) {
  const isi = {
    versi: VERSI,
    kategoriAktif: nilai.kategoriAktif,
    favorit: nilai.favorit,
  }
  try {
    localStorage.setItem(KUNCI, JSON.stringify(isi))
  } catch (galat) {
    console.error('simpanan gagal', galat.message)   // penuh/diblokir: halaman tetap jalan
  }
}

export function muat() {
  try {
    const isi = JSON.parse(localStorage.getItem(KUNCI))
    if (isi?.versi !== VERSI) {          // null (kunjungan pertama) atau bentuk lama
      localStorage.removeItem(KUNCI)
      return null
    }
    return isi
  } catch {
    localStorage.removeItem(KUNCI)       // isi rusak: buang
    return null
  }
}

export function pulihkan(isi) {          // dipanggil sekali dari onMounted di App.vue
  if (!isi) return                       // kunjungan pertama: nilai bawaan tetap
  if (typeof isi.kategoriAktif === 'string') state.kategoriAktif = isi.kategoriAktif
  if (Array.isArray(isi.favorit)) state.favorit = isi.favorit
}

// ---------- Fungsi pengubah: cukup ubah state, tanpa render() ----------

export function aturUlang() {
  localStorage.removeItem(KUNCI)
  state.kategoriAktif = 'semua'
  state.favorit = []
}

export function isiProyek(daftar) {
  state.daftarProyek = daftar
}

export function pilihKategori(nilai) {
  state.kategoriAktif = nilai
}

export function tambahFavorit(id) {
  if (state.favorit.includes(id)) return
  state.favorit = [...state.favorit, id]     // salinan baru, bukan push
}

export function hapusFavorit(id) {
  state.favorit = state.favorit.filter((x) => x !== id)
}
