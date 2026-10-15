// js/api.js — Worksheet P10: lapisan data.
// Tugas berkas ini hanya mengambil data dan memeriksa statusnya.
// Tidak ada satu pun baris yang menyentuh halaman (itu tugas js/dom.js).
// Aturan: kata "fetch" hanya boleh muncul di berkas ini.

export { ambilProyek };

// =====================================================================
// LEMBAR A.3 + D.5 — Alamat ditulis SATU kali, di sini
// =====================================================================

// Tahap 1 (Lembar A sampai D.4): file lokal yang dikirim Live Server.
const ALAMAT = "data/proyek.json";   // relatif terhadap profil.html

// Tahap 2 (D.5): setelah worksheet-p10/ di-push ke GitHub, buka data/proyek.json
// di github.com, klik tombol Raw, salin alamat dari address bar, lalu tempel di bawah.
// Komentari baris ALAMAT di atas dan buka komentar baris ini. Tidak ada kode lain yang berubah.
// const ALAMAT = "https://raw.githubusercontent.com/USERNAME/NAMA-REPO/main/.../worksheet-p10/data/proyek.json";

// =====================================================================
// LEMBAR A.4 + B.1 — Panggil, periksa respons.ok, baca JSON, tangkap galat
// =====================================================================

async function ambilProyek() {
  try {
    const respons = await fetch(ALAMAT);
    console.log("status", respons.status, "ok", respons.ok);

    // fetch TIDAK menolak Promise pada 404/500, jadi status diperiksa sebelum badan dibaca
    if (!respons.ok) {
      throw new Error(`Status ${respons.status} dari ${ALAMAT}`);
    }

    const data = await respons.json();   // teks -> nilai; menolak bila badan bukan JSON

    // Balasan sah tetapi bentuknya salah akan menghasilkan "undefined" tanpa galat jelas
    if (!Array.isArray(data)) {
      throw new Error("Bentuk data tidak dikenali: diharapkan larik proyek");
    }
    return data;
  } catch (galat) {
    console.error("gagal memuat", galat.message);
    throw galat;                          // dilempar lagi: app.js yang menampilkannya ke halaman
  }
}
