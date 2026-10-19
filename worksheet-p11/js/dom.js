// js/dom.js — P11: seluruh sentuhan ke halaman (pemilih, render, kelas).
// Tidak mengimpor state.js: state datang dari luar lewat render(state).

import {
  profil, film, daftarPemeran,
  buatPerkenalan, formatKeahlian, buatBarisInfo, saring,
} from "./data.js";

// =====================================================================
// Memilih elemen
// =====================================================================

const ambil = (selector) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    throw new Error(`Elemen "${selector}" tidak ditemukan. Periksa id/class di profil.html.`);
  }
  return elemen;
};

const wadahProyek = ambil("#daftar-proyek");
const barisFilter = ambil("#filter");
const pesanKosong = ambil("#pesan-kosong");
const pesanMuat = ambil("#muat");
const galatData = ambil("#galat-data");
const catatanProyek = ambil("#catatan-proyek");

const form = ambil("#form-rating");
const inputNama = ambil("#nama-pengunjung");
const galatNama = ambil("#galat-nama");
const inputRating = ambil("#rating-anda");
const galatRating = ambil("#galat-rating");
const tombolKirim = ambil("#tombol-kirim");
const statusForm = ambil("#status-form");

const buatSel = (tag, teks) => {
  const sel = document.createElement(tag);
  sel.textContent = teks;
  return sel;
};

// =====================================================================
// Bagian halaman yang tidak berubah (dari data.js)
// =====================================================================

const tampilkanJudul = () => {
  document.title = `${film.judul}: Catatan Film Saya`;
  ambil("header h1").textContent = document.title;
  ambil(".header-judul p").textContent =
    `Film penutup trilogi ${film.seri} (${film.rilis.slice(0, 4)}), dengan rating ${film.ratingSaya.toFixed(1)}/10 dari saya.`;
};

const tampilkanInfo = () => {
  const baris = buatBarisInfo(film).map(({ label, nilai, waktu, akhiran }) => {
    const bungkus = document.createElement("div");
    const dd = document.createElement("dd");
    if (waktu) {
      const tanda = buatSel("time", nilai);
      tanda.dateTime = waktu;
      dd.append(tanda, akhiran ?? "");
    } else {
      dd.textContent = nilai;
    }
    bungkus.append(buatSel("dt", label), dd);
    return bungkus;
  });
  ambil("#info-film").replaceChildren(...baris);
};

const tampilkanPemeran = () => {
  const baris = daftarPemeran.map((p) => {
    const tr = document.createElement("tr");
    const th = buatSel("th", p.pemeran);
    th.scope = "row";
    tr.append(th, buatSel("td", p.tokoh), buatSel("td", p.peran));
    return tr;
  });
  ambil("#badan-pemeran").replaceChildren(...baris);
  ambil("#judul-tabel").textContent =
    `${daftarPemeran.length} pemeran utama ${film.judul} (${film.rilis.slice(0, 4)})`;
  ambil("#tokoh-favorit").append(...daftarPemeran.map((p) => new Option(p.tokoh, p.kode)));
};

const tampilkanTentangSaya = () => {
  ambil("#perkenalan").textContent = buatPerkenalan(profil);
  ambil("#keahlian").textContent = `Keahlian: ${formatKeahlian(profil.keahlian)}`;
};

const tampilkanFooter = () => {
  ambil("#info-footer").textContent = `${profil.nama} · ${profil.nim} · ${profil.tahun}`;
};

export const tampilkanStatis = () => {
  tampilkanJudul();
  tampilkanInfo();
  tampilkanPemeran();
  tampilkanTentangSaya();
  tampilkanFooter();
};

// =====================================================================
// render(state): kosongkan, periksa kosong, isi ulang
// =====================================================================

// Satu data -> satu butir daftar. Isi dimasukkan dengan textContent (teks, bukan HTML).
const buatKartu = (proyek, favorit) => {
  const li = document.createElement("li");
  li.className = "item-proyek";

  const judul = document.createElement("span");
  judul.className = "item-proyek__judul";
  judul.textContent = proyek.judul;

  const info = document.createElement("small");
  info.textContent = `${proyek.tahun} · ${proyek.selesai ? "Selesai" : "Dalam pengerjaan"}`;

  const sudah = favorit.includes(proyek.id);
  const tombol = document.createElement("button");
  tombol.type = "button";
  tombol.className = "favorit";
  tombol.dataset.id = proyek.id;
  tombol.textContent = sudah ? "★" : "☆";
  tombol.setAttribute("aria-pressed", String(sudah));
  tombol.setAttribute("aria-label", `${sudah ? "Hapus dari" : "Tandai"} favorit: ${proyek.judul}`);

  li.append(judul, info, tombol);
  return li;
};

// JavaScript hanya menambah/melepas kelas "aktif"; tampilannya ada di komponen.css.
// Dibaca dari state, bukan dari DOM.
const tandaiTombolAktif = (kategori) => {
  barisFilter.querySelectorAll("button").forEach((tombol) => {
    const aktif = tombol.dataset.kategori === kategori;
    tombol.classList.toggle("aktif", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });
};

const tampilkanCatatanProyek = (daftar) => {
  const selesai = daftar.filter((proyek) => proyek.selesai).length;
  catatanProyek.textContent =
    daftar.length === 0 ? "" : `${selesai} dari ${daftar.length} proyek sudah selesai.`;
};

export const render = (state) => {
  tandaiTombolAktif(state.kategoriAktif);
  tampilkanCatatanProyek(state.daftarProyek);
  if (!state.dimuat) return;                      // data belum tiba/gagal: jangan gambar daftar kosong

  wadahProyek.textContent = "";                   // 1. kosongkan lebih dulu
  const tampil = saring(state.daftarProyek, state.kategoriAktif);

  if (tampil.length === 0) {                      // 2. periksa keadaan kosong
    pesanKosong.textContent =
      state.kategoriAktif === "semua" ? "Belum ada proyek." : "Belum ada proyek di kategori ini.";
    pesanKosong.hidden = false;
    return;
  }
  pesanKosong.hidden = true;

  const fragmen = document.createDocumentFragment();   // 3. isi ulang, halaman digambar sekali
  tampil.forEach((proyek) => fragmen.append(buatKartu(proyek, state.favorit)));
  wadahProyek.append(fragmen);
};

// =====================================================================
// Keadaan memuat dan gagal
// =====================================================================

export const aturMemuat = (sedang) => {
  pesanMuat.hidden = !sedang;
  wadahProyek.setAttribute("aria-busy", String(sedang));
  if (sedang) {
    wadahProyek.textContent = "";
    pesanKosong.hidden = true;
    galatData.textContent = "";
  }
};

export const tampilkanGalat = (pesan) => {
  wadahProyek.textContent = "";
  pesanKosong.hidden = true;
  galatData.textContent = pesan;
};

// =====================================================================
// Validasi form per kolom (pendengarnya dipasang di events.js)
// =====================================================================

const periksaNama = (input) => {
  const nilai = input.value.trim();
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

const tampilkanGalatKolom = ({ input, galat }, pesan) => {
  galat.textContent = pesan;
  if (pesan === "") {
    input.removeAttribute("aria-invalid");
  } else {
    input.setAttribute("aria-invalid", "true");
  }
};

const periksaKolom = (kolom) => {
  const pesan = kolom.periksa(kolom.input);
  tampilkanGalatKolom(kolom, pesan);
  return pesan === "";
};

const perbaruiTombol = () => {
  tombolKirim.disabled = !kolomForm.every((kolom) => kolom.periksa(kolom.input) === "");
};

export const tanggapiInputForm = (event) => {
  const kolom = kolomForm.find((k) => k.input === event.target);
  if (kolom) periksaKolom(kolom);
  statusForm.hidden = true;
  perbaruiTombol();
};

export const tanggapiKirimForm = (event) => {
  event.preventDefault();

  const hasil = kolomForm.map(periksaKolom);
  perbaruiTombol();

  const kolomSalah = kolomForm.find((_, i) => !hasil[i]);
  if (kolomSalah) {
    statusForm.hidden = true;
    kolomSalah.input.focus();
    return;
  }

  const nama = inputNama.value.trim();
  const rating = Number(inputRating.value).toFixed(1);
  statusForm.textContent = `Terima kasih, ${nama}! Rating ${rating}/10 dari Anda sudah dicatat.`;
  statusForm.hidden = false;

  form.reset();
  kolomForm.forEach((kolom) => tampilkanGalatKolom(kolom, ""));
  perbaruiTombol();
};

perbaruiTombol();   // keadaan awal: tombol kirim menunggu isian layak
