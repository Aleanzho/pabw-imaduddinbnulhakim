// js/dom.js — Worksheet P9: DOM, Event, dan Interaktivitas
// Berkas ini yang menyentuh halaman. Dikerjakan berurutan: Lembar A -> B -> C -> D.
//
// P10: berkas ini tidak lagi mengimpor app.js (supaya tidak saling mengimpor).
// Data datang dari luar lewat render(daftar). Kontrak yang diekspor, jangan diganti
// namanya: render, tampilkanGalat, aturMemuat. Tambahan P10: pasangFilter, kategoriAktif.

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
const pesanMuat = ambil("#muat");              // P10: "Memuat data..." sebelum balasan datang
const galatData = ambil("#galat-data");        // P10: pesan saat data gagal dimuat

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

// Kategori pada tombol filter yang sedang aktif ("semua" bila belum ada yang dipilih)
export const kategoriAktif = () =>
  barisFilter.querySelector("button.aktif")?.dataset.kategori ?? "semua";

export const render = (daftar) => {
  wadahProyek.textContent = "";                  // 1. kosongkan lebih dulu

  if (daftar.length === 0) {                     // 2. periksa keadaan kosong
    pesanKosong.textContent =                    // pesan menjelaskan keadaan yang sedang terjadi
      kategoriAktif() === "semua" ? "Belum ada proyek." : "Belum ada proyek di kategori ini.";
    pesanKosong.hidden = false;
    return;
  }
  pesanKosong.hidden = true;

  const fragmen = document.createDocumentFragment();   // 3. isi ulang, halaman digambar sekali
  daftar.forEach((proyek) => fragmen.append(buatKartu(proyek)));
  wadahProyek.append(fragmen);
};

// =====================================================================
// LEMBAR D P10 — Keadaan memuat dan gagal
// =====================================================================

// Memuat: pesan tampil selama menunggu. Saat mulai, sisa tampilan lama dibersihkan
// (penting bila muat() dipanggil ulang). aria-busy memberi tahu pembaca layar.
export const aturMemuat = (sedang) => {
  pesanMuat.hidden = !sedang;
  wadahProyek.setAttribute("aria-busy", String(sedang));
  if (sedang) {
    wadahProyek.textContent = "";
    pesanKosong.hidden = true;
    galatData.textContent = "";
  }
};

// Gagal: pesan untuk pengguna ditulis dengan textContent; rincian teknis tinggal di Console.
export const tampilkanGalat = (pesan) => {
  wadahProyek.textContent = "";
  pesanKosong.hidden = true;
  galatData.textContent = pesan;
};

// =====================================================================
// LEMBAR C — Satu pendengar di induk untuk semua tombol filter
// =====================================================================

// JavaScript hanya menambah/melepas kelas "aktif"; tampilannya ada di komponen.css
const tandaiTombolAktif = (tombolAktif) => {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol === tombolAktif;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
};

// Dipasang SEKALI, di luar render. P10: dom.js hanya mengurus klik dan tampilan tombol;
// app.js yang punya data, jadi app.js memberi tahu apa yang dilakukan setelah kategori dipilih.
export const pasangFilter = (saatPilih) => {
  barisFilter.addEventListener("click", (event) => {
    const tombol = event.target.closest("button");
    if (!tombol || !tombol.dataset.kategori) return; // klik di luar tombol filter, abaikan

    tandaiTombolAktif(tombol);
    saatPilih(tombol.dataset.kategori);
  });
};

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

const tampilkanGalatKolom = ({ input, galat }, pesan) => {   // P10: dulu bernama tampilkanGalat
  galat.textContent = pesan;                     // "" = pesan hilang (CSS menyembunyikan span kosong)
  if (pesan === "") {
    input.removeAttribute("aria-invalid");
  } else {
    input.setAttribute("aria-invalid", "true");  // tanda untuk pembaca layar dan CSS
  }
};

const periksaKolom = (kolom) => {
  const pesan = kolom.periksa(kolom.input);
  tampilkanGalatKolom(kolom, pesan);
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
  kolomForm.forEach((kolom) => tampilkanGalatKolom(kolom, ""));
  perbaruiTombol();                              // form kosong lagi: tombol menunggu isian layak
});

// =====================================================================
// Keadaan awal. Daftar proyek TIDAK digambar di sini lagi: app.js memanggil
// muat(), lalu render() setelah data dari js/api.js tiba.
// =====================================================================
perbaruiTombol();
