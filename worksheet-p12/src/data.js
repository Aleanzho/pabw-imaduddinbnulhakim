// js/data.js — P11: data tetap dan fungsi murni (tidak menyentuh halaman, tidak menyimpan keadaan).
// Daftar proyek TIDAK di sini: ia ada di data/proyek.json sejak P10.

export const profil = {
  nama: "IMADUDDIN IBNULHAKIM",
  nim: "23523237",
  peran: "Mahasiswa Informatika UII",
  keahlian: ["HTML", "CSS", "JavaScript"],
  tahun: 2026,
};

export const film = {
  judul: "The Return of the King",
  seri: "The Lord of the Rings",
  sutradara: "Peter Jackson",
  rilis: "2003-12-17",
  negaraRilis: "Amerika Serikat",
  novel: { judul: "The Return of the King", tahun: 1955, penulis: "J. R. R. Tolkien" },
  penghargaan: { oscar: 11, nominasi: 11 },
  ratingSaya: 9.1,
};

export const daftarPemeran = [
  { pemeran: "Elijah Wood", tokoh: "Frodo Baggins", kode: "frodo",
    peran: "Pembawa Cincin yang berjalan menuju Gunung Doom" },
  { pemeran: "Sean Astin", tokoh: "Samwise Gamgee", kode: "sam",
    peran: "Sahabat setia yang menemani Frodo sampai akhir" },
  { pemeran: "Viggo Mortensen", tokoh: "Aragorn", kode: "aragorn",
    peran: "Pewaris takhta Gondor" },
  { pemeran: "Ian McKellen", tokoh: "Gandalf", kode: "gandalf",
    peran: "Penyihir yang memimpin pertahanan Minas Tirith" },
  { pemeran: "Andy Serkis", tokoh: "Gollum (Sméagol)", kode: "gollum",
    peran: "Pemandu Frodo yang terobsesi pada Cincin" },
  { pemeran: "Miranda Otto", tokoh: "Éowyn", kode: "eowyn",
    peran: "Perempuan Rohan yang ikut bertempur di Pelennor" },
];

export function buatPerkenalan({ nama, peran }) {
  return `${nama} — ${peran}`;
}

export const formatKeahlian = (daftar) => daftar.join(" · ");

export const formatTanggal = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const buatBarisInfo = (data) => [
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

// Fungsi murni: menerima daftar dan kategori, mengembalikan daftar yang lolos filter.
export function saring(daftar, kategori) {
  return kategori === "semua" ? daftar : daftar.filter((proyek) => proyek.kategori === kategori);
}
