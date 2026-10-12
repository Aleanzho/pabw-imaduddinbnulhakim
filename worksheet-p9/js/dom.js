// js/dom.js — Worksheet P9: DOM, Event, dan Interaktivitas
// app.js menyimpan data dan fungsi; berkas ini yang menyentuh halaman.
// Dikerjakan berurutan: Lembar A -> B -> C -> D.

import { daftarProyek } from "./app.js";

// =====================================================================
// LEMBAR A — Memilih elemen (sesuai tabel A.2)
// =====================================================================

// Bila elemen tidak ketemu, berhenti dengan pesan yang jelas, bukan null yang diam-diam.
const ambil = (selector) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    throw new Error(`Elemen "${selector}" tidak ditemukan. Periksa id/class di profil.html.`);
  }
  return elemen;
};

const wadahProyek = ambil("#daftar-proyek");   // daftar proyek: diisi kartu dari data
const barisFilter = ambil("#filter");          // baris tombol filter: induk pendengar klik
const pesanKosong = ambil("#pesan-kosong");    // pesan saat penyaringan tidak menghasilkan isi

const form = ambil("#form-rating");            // form rating
const inputNama = ambil("#nama-pengunjung");
const galatNama = ambil("#galat-nama");
const inputRating = ambil("#rating-anda");
const galatRating = ambil("#galat-rating");
const tombolKirim = ambil("#tombol-kirim");
const statusForm = ambil("#status-form");      // pesan sukses setelah form sah dikirim

// =====================================================================
// LEMBAR B + D.1 — Satu fungsi render: kosongkan, periksa kosong, isi ulang
// =====================================================================

// Satu data -> satu kartu. Isi dimasukkan dengan textContent (teks, bukan HTML).
const buatKartu = (proyek) => {
  const li = document.createElement("li");
  li.className = "item-proyek";

  const judul = document.createElement("span");
  judul.className = "item-proyek__judul";
  judul.textContent = proyek.judul;

  const info = document.createElement("small");
  info.textContent = `${proyek.tahun} · ${proyek.selesai ? "Selesai" : "Dalam pengerjaan"}`;

  li.append(judul, info);
  return li;
};

const render = (daftar) => {
  wadahProyek.textContent = "";                  // 1. kosongkan lebih dulu

  if (daftar.length === 0) {                     // 2. periksa keadaan kosong
    pesanKosong.hidden = false;
    return;
  }
  pesanKosong.hidden = true;

  const fragmen = document.createDocumentFragment();   // 3. isi ulang, halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek)));
  wadahProyek.append(fragmen);
};

// =====================================================================
// LEMBAR C — Satu pendengar di induk untuk semua tombol filter
// =====================================================================

const saring = (kategori) =>
  kategori === "semua" ? daftarProyek : daftarProyek.filter((proyek) => proyek.kategori === kategori);

// JavaScript hanya menambah/melepas kelas "aktif"; tampilannya ada di komponen.css
const tandaiTombolAktif = (tombolAktif) => {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
};

// Dipasang SEKALI, di luar render
barisFilter.addEventListener("click", (event) => {
  const tombol = event.target.closest("button");
  if (!tombol || !tombol.dataset.kategori) return; // klik di luar tombol filter, abaikan

  tandaiTombolAktif(tombol);
  render(saring(tombol.dataset.kategori));
});

// =====================================================================
// LEMBAR D.2 — Validasi form per kolom
// =====================================================================

// Tiap fungsi periksa mengembalikan pesan galat, atau "" bila isinya sudah layak.
// Pesannya menyebut cara memperbaiki, bukan menyalahkan.
const periksaNama = (input) => {
  const nilai = input.value.trim();              // spasi saja tidak dihitung
  if (nilai === "") return "Nama wajib diisi. Ketik nama Anda, minimal 2 huruf.";
  if (nilai.length < 2) return "Nama terlalu pendek. Tambahkan huruf sampai minimal 2.";
  return "";
};

const periksaRating = (input) => {
  if (input.validity.badInput) return "Isi dengan angka saja, misalnya 9.1.";
  if (input.value.trim() === "") return "Rating wajib diisi. Ketik angka 0 sampai 10, misalnya 9.1.";
  const angka = Number(input.value);
  if (angka < 0 || angka > 10) return "Rating harus antara 0 sampai 10. Ubah angkanya.";
  if (input.validity.stepMismatch) return "Pakai satu angka desimal saja, misalnya 9.1.";
  return "";
};

const kolomForm = [
  { input: inputNama, galat: galatNama, periksa: periksaNama },
  { input: inputRating, galat: galatRating, periksa: periksaRating },
];

const tampilkanGalat = ({ input, galat }, pesan) => {
  galat.textContent = pesan;                     // "" = pesan hilang (CSS menyembunyikan span kosong)
  if (pesan === "") {
    input.removeAttribute("aria-invalid");
  } else {
    input.setAttribute("aria-invalid", "true");  // tanda untuk pembaca layar dan CSS
  }
};

const periksaKolom = (kolom) => {
  const pesan = kolom.periksa(kolom.input);
  tampilkanGalat(kolom, pesan);
  return pesan === "";
};

// Tombol kirim menunggu sampai seluruh kolom layak (pemeriksaan diam, tanpa menampilkan pesan)
const perbaruiTombol = () => {
  const sah = kolomForm.every((kolom) => kolom.periksa(kolom.input) === "");
  tombolKirim.disabled = !sah;
};

// Satu pendengar input di form: memeriksa kolom yang sedang diketik
form.addEventListener("input", (event) => {
  const kolom = kolomForm.find((k) => k.input === event.target);
  if (kolom) periksaKolom(kolom);
  statusForm.hidden = true;
  perbaruiTombol();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();                        // baris pertama: halaman tidak dimuat ulang

  const hasil = kolomForm.map(periksaKolom);     // periksa SEMUA kolom, agar semua pesan muncul
  perbaruiTombol();

  const kolomSalah = kolomForm.find((_, i) => !hasil[i]);
  if (kolomSalah) {
    statusForm.hidden = true;
    kolomSalah.input.focus();                    // pindahkan pandangan ke kolom yang perlu diperbaiki
    return;
  }

  // Semua layak: beri kabar lewat textContent, lalu kosongkan form
  const nama = inputNama.value.trim();
  const rating = Number(inputRating.value).toFixed(1);
  statusForm.textContent = `Terima kasih, ${nama}! Rating ${rating}/10 dari Anda sudah dicatat.`;
  statusForm.hidden = false;

  form.reset();
  kolomForm.forEach((kolom) => tampilkanGalat(kolom, ""));
  perbaruiTombol();                              // form kosong lagi: tombol menunggu isian layak
});

// =====================================================================
// Gambar daftar proyek pertama kali (tombol "Semua" sudah aktif di HTML)
// =====================================================================
render(daftarProyek);
perbaruiTombol();
