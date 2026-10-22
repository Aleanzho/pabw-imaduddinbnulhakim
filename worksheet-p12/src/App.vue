<script setup>
// src/App.vue — komponen induk (perakit). Hanya menyusun komponen dan mengurus data awal.
import { onMounted, watch } from 'vue'
import {
  profil, film, daftarPemeran,
  buatPerkenalan, formatKeahlian, buatBarisInfo,
} from './data.js'
import { state, simpan, muat, pulihkan, isiProyek } from './state.js'
import { ambilProyek } from './api.js'

import KepalaProfil from './components/KepalaProfil.vue'
import TombolFilter from './components/TombolFilter.vue'
import DaftarProyek from './components/DaftarProyek.vue'
import FormKontak from './components/FormKontak.vue'

// Bagian yang tidak berubah (dari data.js)
const barisInfo = buatBarisInfo(film)
const tahunFilm = film.rilis.slice(0, 4)
const judulTabel = `${daftarPemeran.length} pemeran utama ${film.judul} (${tahunFilm})`
const perkenalan = buatPerkenalan(profil)
const keahlian = `Keahlian: ${formatKeahlian(profil.keahlian)}`
const infoFooter = `${profil.nama} · ${profil.nim} · ${profil.tahun}`

// Dulu mulai() di app.js: pulihkan simpanan, lalu ambil data proyek.
onMounted(async () => {
  pulihkan(muat())                   // pilihan terakhir dari localStorage
  try {
    isiProyek(await ambilProyek())   // data/proyek.json atau GitHub
  } catch (galat) {
    state.galat = 'Data gagal dimuat. Periksa koneksi, lalu muat ulang halaman.'
    console.error(galat.message)     // untuk Anda, bukan untuk pengguna
  } finally {
    state.memuat = false
  }
})

// Setiap state berubah, simpan. Menggantikan simpan(state) di tiap fungsi pengubah P11.
watch(state, (nilai) => simpan(nilai), { deep: true })
</script>

<template>
  <div class="page">

    <KepalaProfil :profil="profil" :film="film" />

    <main>

      <section id="info-pemeran">
        <h2>Info dan Pemeran</h2>

        <div class="isi">

          <div class="kartu sisi">
            <p class="kartu__isi">
              The Return of the King adalah film ketiga dan terakhir dari trilogi The Lord of the Rings.
              Catatan tontonan saya yang lain ada di
              <a href="https://letterboxd.com/aleanzho/">profil Letterboxd saya (Aleanzho)</a>.
            </p>

            <dl class="kartu__isi" id="info-film">
              <div v-for="baris in barisInfo" :key="baris.label">
                <dt>{{ baris.label }}</dt>
                <dd v-if="baris.waktu"><time :datetime="baris.waktu">{{ baris.nilai }}</time>{{ baris.akhiran }}</dd>
                <dd v-else>{{ baris.nilai }}</dd>
              </div>
            </dl>
          </div>

          <div class="galeri utama">

            <div class="kartu">
              <div class="table-wrap" tabindex="0" role="region" aria-label="Tabel pemeran, dapat digulir mendatar">
                <table>
                  <caption class="kartu__judul" id="judul-tabel">{{ judulTabel }}</caption>
                  <thead>
                    <tr>
                      <th scope="col">Pemeran</th>
                      <th scope="col">Tokoh</th>
                      <th scope="col">Peran dalam cerita</th>
                    </tr>
                  </thead>
                  <tbody id="badan-pemeran">
                    <tr v-for="p in daftarPemeran" :key="p.kode">
                      <th scope="row">{{ p.pemeran }}</th>
                      <td>{{ p.tokoh }}</td>
                      <td>{{ p.peran }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <figure class="kartu" id="cuplikan">
              <img src="/minas-tirith.webp"
                   alt="Gandalf berjubah putih menunggang kuda putih melintasi padang rumput kering menuju Minas Tirith, kota putih bertingkat di kaki pegunungan berkabut dengan menara tinggi di puncaknya"
                   width="640" height="360" loading="lazy">
              <figcaption class="kartu__judul">Gandalf berkuda menuju Minas Tirith. Cuplikan film The Return of the King (New Line Cinema).</figcaption>
            </figure>

          </div>

        </div>
      </section>

      <section id="beri-rating">
        <h2>Beri Rating dan Ulasan</h2>
        <FormKontak />
      </section>

      <section id="tentang-saya">
        <h2>Tentang Pembuat Halaman</h2>
        <div class="kartu">
          <p id="perkenalan">{{ perkenalan }}</p>
          <p id="keahlian">{{ keahlian }}</p>
          <h3>Proyek saya</h3>
          <TombolFilter />
          <DaftarProyek />
        </div>
      </section>

    </main>

    <footer>
      <p id="info-footer">{{ infoFooter }}</p>
    </footer>

  </div>
</template>
