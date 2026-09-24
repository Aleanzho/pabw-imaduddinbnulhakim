   # PABW — IMADUDDIN IBNULHAKIM — 23523237
   Kelas D

   ## Pertemuan 3 — Halaman profil saya

Topik halaman saya: film The Lord of the Rings: The Return of the King (2003), berikut rating saya (9.1/10) dan akun Letterboxd saya, Aleanzho.

- Judul halaman: The Return of the King: Catatan Film Saya
- Deskripsi: catatan pribadi saya tentang film The Return of the King, lengkap dengan info film, pemeran, dan rating
- Tautan navigasi: Info dan Pemeran, Cuplikan Film, Beri Rating
- Dua bagian utama: Info dan Pemeran, Beri Rating dan Ulasan
- Kolom tabel: pemeran, tokoh, peran dalam cerita
- Kolom form: nama, rating (0–10), tokoh favorit, ulasan singkat
- Gambar: minas-tirith.webp (cuplikan adegan Gandalf menuju Minas Tirith dari film ini)

## Catatan penggunaan AI

<!-- Sesuaikan dengan kenyataan sebelum di-push. -->

Dibantu AI (Claude):
- menulis kerangka `profil.html` (head, landmark, tabel, figure, form);
- menulis alt text dan keterangan gambar, serta menyesuaikan ukuran gambar.

Saya kerjakan sendiri:
- memilih topik film, memberi rating 9.1/10, dan memilih gambar cuplikan film yang dipakai;
- menyediakan nama akun Letterboxd saya;
- memeriksa halaman di peramban, menjalankan Lighthouse, dan uji papan ketik;
- mengisi Lembar G (tiket keluar dan penilaian mandiri).


## Pertemuan 4 — Design token halaman profil

Halaman `profil.html` dari Pertemuan 3 (catatan film *The Lord of the Rings: The Return of the King*) sekarang diberi tampilan memakai CSS berbasis **design token**. Struktur HTML, tabel, gambar, dan form dari P3 tetap dipakai; yang ditambahkan hanya lima berkas gaya, satu pembungkus `header-baris`, dan satu tombol pengalih tema.

**Tema visual: "Gondor".** Tema terang meniru batu pucat Minas Tirith di siang hari dengan aksen emas. Tema gelap meniru malam di Gondor: hitam dan perak dengan aksen emas yang lebih terang.

### Berkas yang dikumpulkan

Semua ada di folder `worksheet-p4/`:

```
worksheet-p4/
├── profil.html
├── minas-tirith.webp
├── tokens.css
├── base.css
├── layout.css
├── komponen.css
└── tema.css
```

| Berkas | Isi | Seberapa sering berubah |
|---|---|---|
| `tokens.css` | Seluruh nilai mentah: warna, spasi, radius, bayangan, ukuran huruf. Dua lapis (primitif dan semantik) | Hampir tidak pernah |
| `base.css` | `box-sizing`, reset margin, gambar responsif, tipografi dasar, warna dasar | Jarang |
| `layout.css` | Header dan navbar flexbox, susunan bagian, katalog kartu, footer | Sering |
| `komponen.css` | Tabel, gambar, form, tombol, keadaan fokus dan tidak sah, tombol pengalih tema | Sering |
| `tema.css` | Penggantian lapis semantik untuk tema gelap (otomatis dan manual) | Jarang |

**Urutan pemuatan di `<head>`:** `tokens.css` → `base.css` → `layout.css` → `komponen.css` → `tema.css`. Token dimuat paling awal; tema paling akhir supaya bisa menimpa.

### Warna utama dan alasannya

Warna utama saya adalah **emas tua `#8B5E00`** (`--gold-700`). Emas dipilih karena mahkota dan takhta Gondor adalah inti cerita *Return of the King* (Aragorn kembali sebagai raja). Emas yang cukup gelap dipakai di tema terang supaya dua hal tetap lolos kontras 4,5:1: teks putih di atas tombol (5,68:1) dan tautan di atas latar batu pucat (4,68:1). Emas yang lebih terang `#D4AF37` hanya dipakai di tema gelap.

### Token yang saya tetapkan

**Lapis 1 — primitif** (nilai mentah, tidak menyebut peran):

| Token | Nilai | Catatan |
|---|---|---|
| `--stone-50` | `#ECE9E2` | batu pucat Minas Tirith |
| `--stone-100` | `#FFFFFF` | putih untuk permukaan kartu |
| `--stone-500` | `#857E72` | batu abu untuk garis tepi tema terang |
| `--ink-900` | `#1F1D1A` | tinta gelap untuk teks |
| `--void-950` | `#0A0A0C` | langit malam |
| `--void-900` | `#17181B` | permukaan kartu tema gelap |
| `--void-500` | `#6B6E75` | garis tepi tema gelap |
| `--silver-100` | `#E6E6E6` | teks tema gelap |
| `--gold-700` | `#8B5E00` | emas tua (tema terang) |
| `--gold-500` / `--gold-300` | `#D4AF37` / `#F2C14E` | emas terang (tema gelap) |
| `--red-700` / `--red-300` | `#B00020` / `#FF6B6B` | merah untuk peringatan |

Spasi: `--space-1` 0.25rem, `--space-2` 0.5rem, `--space-3` 0.75rem, `--space-4` 1rem, `--space-6` 1.5rem.
Bentuk: `--radius-md` 0.5rem, `--radius-full` 999px, `--shadow-1` `0 1px 3px rgba(0,0,0,.10)`.
Ukuran huruf: `--text-sm` 0.875rem, `--text-md` 1rem, `--text-xl` 1.5rem, `--text-3xl` 2.25rem.

**Lapis 2 — semantik** (peran; hanya ini yang dipakai komponen):

| Token | Terang | Gelap | Untuk apa |
|---|---|---|---|
| `--color-bg` | `--stone-50` | `--void-950` | latar halaman |
| `--color-fg` | `--ink-900` | `--silver-100` | teks utama |
| `--color-surface` | `--stone-100` | `--void-900` | latar kartu, isian, tombol pengalih |
| `--color-border` | `--stone-500` | `--void-500` | garis pemisah dan tepi kotak |
| `--color-primary` | `--gold-700` | `--gold-500` | tombol, tautan, judul |
| `--color-danger` | `--red-700` | `--red-300` | isian tidak sah dan pesan galat |
| `--color-focus` | `--gold-700` | `--gold-300` | garis fokus papan ketik |
| `--card-pad`, `--section-gap` | `--space-4`, `--space-6` | sama | jarak dalam kartu, jarak antar bagian |

**Aturan yang saya pegang:** nilai mentah (hex, rgba) hanya boleh ada di `tokens.css`; komponen hanya memakai `var()` lapis semantik. Satu pengecualian yang disengaja: `--shadow-1` versi gelap di `tema.css` memakai `rgba` mentah, sama seperti contoh di lembar kerja.

### Keputusan tata letak dan tipografi

- **Flexbox dan `gap`, tanpa `float` dan tanpa `margin` untuk jarak.** Header, navbar, bagian halaman, dan katalog kartu semuanya flex. Semua jarak antar elemen memakai `gap` dari token spasi.
- **Responsif tanpa media query.** `.katalog` memakai `flex-wrap: wrap` dan `.kartu` memakai `flex: 1 1 16rem`, sehingga kartu turun sendiri menjadi satu kolom di layar sempit. `.header-baris` juga `flex-wrap: wrap` agar menu turun baris, bukan meluber.
- **Satuan relatif.** Semua ukuran huruf berasal dari token dalam `rem`. `html` memakai `font-size: 100%` agar mengikuti pengaturan pengguna.
- **Keterbacaan.** `line-height` 1.6 untuk teks isi, 1.15 dan 1.25 untuk judul, dan paragraf dibatasi `max-width: 60ch`.
- **Reset ringan:** `box-sizing: border-box` global, `* { margin: 0 }`, dan `img { max-width: 100%; height: auto }`.

### Form, fokus, dan aksesibilitas

- Setiap kolom isian punya `<label>`. Kolom rating punya petunjuk yang dihubungkan dengan `aria-describedby`.
- Kolom isian dan tombol memakai `font: inherit` agar ikut huruf halaman.
- **Fokus:** `:focus-visible` dengan garis 2px dari `--color-focus`. Kotak centang pengalih tema disembunyikan secara visual, tetapi tetap bisa difokus dengan Tab, dan penandanya dipindahkan ke label lewat `.pengalih-tema:focus-visible + .tombol-tema`.
- **Isian tidak sah:** memakai `:user-invalid`, bukan `:invalid`, sehingga form tidak tampak merah sebelum disentuh. Pesan galat berupa teks (bukan hanya warna) dan ditampilkan dengan `:has()`.

### Tema gelap

Dua jalur, keduanya hanya mengganti lapis semantik di `tema.css`:

1. **Otomatis** lewat `@media (prefers-color-scheme: dark)`, mengikuti pengaturan sistem pengguna.
2. **Manual** lewat kotak centang `#tema` dan selector `:root:has(#tema:checked)`, **tanpa JavaScript**. Blok ini ditulis **setelah** media query supaya pilihan manual menang.

Tidak ada satu pun berkas komponen yang diubah untuk tema gelap. Keterbatasan yang diketahui: pilihan tema belum tersimpan dan kembali ke pengaturan sistem saat halaman dimuat ulang. Menyimpannya adalah materi Pertemuan 11.

### Uji kontras (dihitung dengan rumus WCAG 2.x)

| Pasangan | Terang | Gelap | Ambang |
|---|---|---|---|
| Teks isi di atas latar halaman | 13,87 | 15,85 | 4,5 |
| Teks isi di atas kartu | 16,81 | 14,22 | 4,5 |
| Teks tombol di atas warna utama | 5,68 | 8,44 | 4,5 |
| Tautan / judul (warna utama) di atas latar | 4,68 | 9,41 | 4,5 |
| Pesan galat di atas kartu | 7,33 | 6,40 | 4,5 |
| Garis fokus terhadap latar | 4,68 | 11,79 | 3 |
| Tepi kartu terhadap latar halaman | 3,32 | 3,87 | 3 |
| Tepi isian terhadap permukaan | 4,02 | 3,48 | 3 |

Catatan: nilai awal `--color-border` (`#C9C2B4` dan `#34363B`) hanya menghasilkan sekitar 1,5:1 terhadap latar, di bawah ambang 3:1. Saya menggantinya dengan `--stone-500` dan `--void-500` sehingga kedua tema lolos.

### Uji satu baris

Kriteria selesai saya: mengubah `--gold-700` di `tokens.css` mengubah warna utama halaman tanpa menyunting berkas lain.

| Bagian | Ikut berubah? |
|---|---|
| Tautan pada menu navigasi | Ya |
| Tombol pada form | Ya |
| Judul halaman dan judul bagian | Ya |
| Garis penanda fokus (tema terang) | Ya |
| Warna pada tema gelap | Tidak, dan ini disengaja: tema gelap memakai emas yang lebih terang (`--gold-500`) agar kontras tetap lolos, jadi ia punya token sendiri |

### Pemeriksaan kebersihan kode

| Penanda | Jumlah temuan |
|---|---|
| `float` dan clearfix | 0 |
| `!important` | 0 |
| Warna hex di luar `tokens.css` | 0 |
| `px` untuk ukuran huruf | 0 |
| `style="..."` di `profil.html` | 0 |

### Pengungkapan penggunaan AI

Saya memakai Claude (Anthropic) untuk menjelaskan langkah pengerjaan dan pengumpulan tugas, meninjau kode saya terhadap rubrik, menghitung rasio kontras, dan menyusun draf README ini. Seluruh berkas sudah saya buka dan uji sendiri di peramban.
