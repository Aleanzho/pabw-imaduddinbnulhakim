// js/app.js — Worksheet P8: JavaScript modern, struktur data, dan array methods
// Dikerjakan berurutan: Lembar B -> C -> D -> render ke halaman -> E.

// =====================================================================
// LEMBAR B — Data halaman sebagai variabel
// =====================================================================

// Identitas pemilik halaman (ganti isinya bila perlu)
const profil = {
  nama: "IMADUDDIN IBNULHAKIM",
  nim: "23523237",
  peran: "Mahasiswa Informatika yang belajar front-end",
  keahlian: ["HTML", "CSS", "JavaScript"],
  tahun: 2026,
};

// Data film yang dibahas halaman ini
const film = {
  judul: "The Return of the King",
  seri: "The Lord of the Rings",
  sutradara: "Peter Jackson",
  rilis: "2003-12-17",
  negaraRilis: "Amerika Serikat",
  novel: { judul: "The Return of the King", tahun: 1955, penulis: "J. R. R. Tolkien" },
  penghargaan: { oscar: 11, nominasi: 11 },
  ratingSaya: 9.1, // angka, bukan teks
};

const kalimat = `Nama saya ${profil.nama}, dan saya belajar ${profil.keahlian.length} hal.`;
console.log(kalimat);
console.log(typeof profil.nama, typeof film.ratingSaya); // "string" "number"

// =====================================================================
// LEMBAR C — Fungsi murni (semua memakai bentuk arrow, konsisten)
// =====================================================================

// 1. Menyusun kalimat perkenalan dari satu object
const buatPerkenalan = ({ nama, peran }) => `${nama} — ${peran}`;

// 2. Merapikan daftar keahlian menjadi satu baris teks
const formatKeahlian = (daftar) => daftar.join(" · ");

// 3. Mengubah "2003-12-17" menjadi "17 Desember 2003"
const formatTanggal = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

// 4. Menyusun baris-baris daftar info film dari satu object film
const buatBarisInfo = (data) => [
  { label: "Sutradara", nilai: data.sutradara ?? "-" },
  {
    label: "Tanggal rilis",
    nilai: formatTanggal(data.rilis),
    waktu: data.rilis,
    akhiran: ` (${data.negaraRilis})`,
  },
  {
    label: "Berdasarkan",
    nilai: `Novel ${data.novel.judul} (${data.novel.tahun}) karya ${data.novel.penulis}`,
  },
  {
    label: "Penghargaan",
    nilai: `Memenangkan ${data.penghargaan?.oscar ?? 0} Piala Oscar dari ${data.penghargaan?.nominasi ?? 0} nominasi, termasuk Film Terbaik`,
  },
  { label: "Rating saya", nilai: `${data.ratingSaya.toFixed(1)}/10` },
];

// 5. Memilih proyek yang ditampilkan menurut pilihan
const ambilProyek = (daftar, pilihan) =>
  pilihan === "selesai" ? daftar.filter((proyek) => proyek.selesai) : daftar;

console.log(buatPerkenalan(profil));
console.log(formatKeahlian(profil.keahlian));
console.log(formatTanggal(film.rilis));

// =====================================================================
// LEMBAR D — Array of object, map, filter, find
// =====================================================================

// Ganti dengan proyek Anda yang sebenarnya
const daftarProyek = [
  { judul: "Halaman Catatan Film Responsif (P6)", tahun: 2026, selesai: true },
  { judul: "Halaman Data Dinamis dengan JavaScript (P8)", tahun: 2026, selesai: true },
  { judul: "Halaman Interaktif dengan DOM dan Event (P9)", tahun: 2026, selesai: false },
];

const daftarPemeran = [
  { pemeran: "Elijah Wood", tokoh: "Frodo Baggins", kode: "frodo", diPelennor: false,
    peran: "Pembawa Cincin yang berjalan menuju Gunung Doom" },
  { pemeran: "Sean Astin", tokoh: "Samwise Gamgee", kode: "sam", diPelennor: false,
    peran: "Sahabat setia yang menemani Frodo sampai akhir" },
  { pemeran: "Viggo Mortensen", tokoh: "Aragorn", kode: "aragorn", diPelennor: true,
    peran: "Pewaris takhta Gondor" },
  { pemeran: "Ian McKellen", tokoh: "Gandalf", kode: "gandalf", diPelennor: true,
    peran: "Penyihir yang memimpin pertahanan Minas Tirith" },
  { pemeran: "Andy Serkis", tokoh: "Gollum (Sméagol)", kode: "gollum", diPelennor: false,
    peran: "Pemandu Frodo yang terobsesi pada Cincin" },
  { pemeran: "Miranda Otto", tokoh: "Éowyn", kode: "eowyn", diPelennor: true,
    peran: "Perempuan Rohan yang ikut bertempur di Pelennor" },
];

const jumlahProyek = daftarProyek.length; // angka yang dipakai nanti

// let: nilainya memang berubah (dari "semua" menjadi "selesai")
let pilihanAktif = "semua";
pilihanAktif = "selesai";

console.table(profil.keahlian);
console.table(daftarProyek);
console.table(daftarPemeran);

// filter: subset
const proyekSelesai = daftarProyek.filter((proyek) => proyek.selesai);
const pemeranPelennor = daftarPemeran.filter((p) => p.diPelennor);
console.table(proyekSelesai);
console.table(pemeranPelennor);

// find: satu isi, atau undefined bila tidak ada
const dataAragorn = daftarPemeran.find((p) => p.tokoh === "Aragorn");
console.log(dataAragorn);
console.log(daftarPemeran.find((p) => p.tokoh === "Saruman")); // undefined

// map: panjang hasil sama dengan panjang asal
const daftarTokoh = daftarPemeran.map((p) => p.tokoh);
console.log(daftarTokoh.length === daftarPemeran.length); // true

// sort pada SALINAN: data asli tidak berubah
const pemeranUrut = [...daftarPemeran].sort((a, b) => a.pemeran.localeCompare(b.pemeran));
console.log(pemeranUrut[0].pemeran, "|", daftarPemeran[0].pemeran); // beda = asli aman

// salinan objek: mengubah salinan tidak mengubah profil
const salinanProfil = { ...profil, nama: "Nama Uji" };
console.log(salinanProfil.nama, "|", profil.nama);

// =====================================================================
// RENDER — memasang data ke halaman (bagian DOM, dipelajari lebih dalam di P9)
// =====================================================================

const ambil = (selector) => {
  const elemen = document.querySelector(selector);
  if (elemen === null) {
    console.error(`Elemen "${selector}" tidak ditemukan. Periksa id/class di profil.html.`);
  }
  return elemen;
};

const buatSel = (tag, teks) => {
  const sel = document.createElement(tag);
  sel.textContent = teks;
  return sel;
};

const tampilkanJudul = () => {
  const tahunRilis = film.rilis.slice(0, 4);
  document.title = `${film.judul}: Catatan Film Saya`;
  const h1 = ambil("header h1");
  const sub = ambil(".header-judul p");
  if (h1) h1.textContent = document.title;
  if (sub) {
    sub.textContent = `Film penutup trilogi ${film.seri} (${tahunRilis}), dengan rating ${film.ratingSaya.toFixed(1)}/10 dari saya.`;
  }
};

const tampilkanInfo = () => {
  const daftar = ambil("#info-film");
  if (daftar === null) return;
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
  daftar.replaceChildren(...baris);
};

const tampilkanPemeran = () => {
  const badan = ambil("#badan-pemeran");
  const judulTabel = ambil("#judul-tabel");
  const pilihan = ambil("#tokoh-favorit");
  if (badan) {
    const baris = daftarPemeran.map((p) => {
      const tr = document.createElement("tr");
      const th = buatSel("th", p.pemeran);
      th.scope = "row";
      tr.append(th, buatSel("td", p.tokoh), buatSel("td", p.peran));
      return tr;
    });
    badan.replaceChildren(...baris);
  }
  if (judulTabel) {
    judulTabel.textContent = `${daftarPemeran.length} pemeran utama ${film.judul} (${film.rilis.slice(0, 4)})`;
  }
  if (pilihan) {
    pilihan.append(...daftarPemeran.map((p) => new Option(p.tokoh, p.kode)));
  }
};

const tampilkanTentangSaya = () => {
  const perkenalan = ambil("#perkenalan");
  const keahlian = ambil("#keahlian");
  const proyek = ambil("#daftar-proyek");
  const catatan = ambil("#catatan-proyek");
  if (perkenalan) perkenalan.textContent = buatPerkenalan(profil);
  if (keahlian) keahlian.textContent = `Keahlian: ${formatKeahlian(profil.keahlian)}`;
  if (proyek) {
    const item = ambilProyek(daftarProyek, pilihanAktif).map(
      (p) => buatSel("li", `${p.judul} (${p.tahun})`),
    );
    proyek.replaceChildren(...item);
  }
  if (catatan) {
    catatan.textContent = `${proyekSelesai.length} dari ${jumlahProyek} proyek sudah selesai.`;
  }
};

const tampilkanFooter = () => {
  const kaki = ambil("#info-footer");
  if (kaki) kaki.textContent = `${profil.nama} · ${profil.nim} · ${profil.tahun}`;
};

tampilkanJudul();
tampilkanInfo();
tampilkanPemeran();
tampilkanTentangSaya();
tampilkanFooter();

// Skrip bertipe module menyembunyikan variabel dari Console. Baris ini hanya untuk
// latihan: supaya Anda bisa mengetik profil, buatPerkenalan(...) dsb. di Console.
globalThis.latihanP8 = { profil, film, daftarPemeran, daftarProyek, buatPerkenalan, formatKeahlian };
