<script setup>
// DaftarProyek: kartu proyek, tombol favorit, dan empat keadaan (memuat, gagal, kosong, berhasil).
import { computed } from 'vue'
import { state, tambahFavorit, hapusFavorit } from '../state.js'
import { saring } from '../data.js'

// Padanan saring(...) di render(state) P11
const tampil = computed(() => saring(state.daftarProyek, state.kategoriAktif))

const pesanKosong = computed(() =>
  state.kategoriAktif === 'semua' ? 'Belum ada proyek.' : 'Belum ada proyek di kategori ini.'
)

const catatan = computed(() => {
  const semua = state.daftarProyek
  const selesai = semua.filter((proyek) => proyek.selesai).length
  return semua.length === 0 ? '' : `${selesai} dari ${semua.length} proyek sudah selesai.`
})

const sudahFavorit = (id) => state.favorit.includes(id)

function ubahFavorit(id) {
  if (sudahFavorit(id)) hapusFavorit(id)
  else tambahFavorit(id)
}
</script>

<template>
  <p v-if="state.memuat" id="muat" role="status">Memuat data...</p>
  <p id="galat-data" class="pesan-galat" role="alert">{{ state.galat }}</p>

  <ul id="daftar-proyek" :aria-busy="String(state.memuat)">
    <li v-for="proyek in tampil" :key="proyek.id" class="item-proyek">
      <span class="item-proyek__judul">{{ proyek.judul }}</span>
      <small>{{ proyek.tahun }} · {{ proyek.selesai ? 'Selesai' : 'Dalam pengerjaan' }}</small>
      <button
        type="button"
        class="favorit"
        :aria-pressed="String(sudahFavorit(proyek.id))"
        :aria-label="`${sudahFavorit(proyek.id) ? 'Hapus dari' : 'Tandai'} favorit: ${proyek.judul}`"
        @click="ubahFavorit(proyek.id)"
      >{{ sudahFavorit(proyek.id) ? '★' : '☆' }}</button>
    </li>
  </ul>

  <p v-if="!state.memuat && !state.galat && tampil.length === 0" id="pesan-kosong">{{ pesanKosong }}</p>
  <small id="catatan-proyek">{{ catatan }}</small>
</template>
