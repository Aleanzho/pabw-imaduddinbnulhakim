<script setup>
// FormKontak: formulir rating. Aturan validasinya sama persis dengan P11 (dom.js).
import { ref } from 'vue'
import { daftarPemeran } from '../data.js'

// Isi kolom (v-model)
const nama = ref('')
const rating = ref('')
const tokoh = ref('')
const ulasan = ref('')

// Rujukan ke elemen input, untuk fokus dan membaca validity
const inputNama = ref(null)
const inputRating = ref(null)

const galatNama = ref('')
const galatRating = ref('')
const pesanStatus = ref('')
const statusTampil = ref(false)
const layak = ref(false)             // keadaan awal: tombol kirim menunggu isian layak

const periksaNama = (input) => {
  const nilai = input.value.trim()
  if (nilai === '') return 'Nama wajib diisi. Ketik nama Anda, minimal 2 huruf.'
  if (nilai.length < 2) return 'Nama terlalu pendek. Tambahkan huruf sampai minimal 2.'
  return ''
}

const periksaRating = (input) => {
  if (input.validity.badInput) return 'Isi dengan angka saja, misalnya 9.1.'
  if (input.value.trim() === '') return 'Rating wajib diisi. Ketik angka 0 sampai 10, misalnya 9.1.'
  const angka = Number(input.value)
  if (angka < 0 || angka > 10) return 'Rating harus antara 0 sampai 10. Ubah angkanya.'
  if (input.validity.stepMismatch) return 'Pakai satu angka desimal saja, misalnya 9.1.'
  return ''
}

const cekNama = () => {
  galatNama.value = periksaNama(inputNama.value)
  return galatNama.value === ''
}

const cekRating = () => {
  galatRating.value = periksaRating(inputRating.value)
  return galatRating.value === ''
}

const perbaruiTombol = () => {
  layak.value =
    periksaNama(inputNama.value) === '' && periksaRating(inputRating.value) === ''
}

function tanggapiInput(event) {
  if (event.target === inputNama.value) cekNama()
  else if (event.target === inputRating.value) cekRating()
  statusTampil.value = false
  perbaruiTombol()
}

function tanggapiKirim() {            // dipasang dengan @submit.prevent
  const namaBenar = cekNama()
  const ratingBenar = cekRating()
  perbaruiTombol()

  if (!namaBenar || !ratingBenar) {
    statusTampil.value = false
    ;(namaBenar ? inputRating : inputNama).value.focus()
    return
  }

  pesanStatus.value =
    `Terima kasih, ${nama.value.trim()}! Rating ${Number(rating.value).toFixed(1)}/10 dari Anda sudah dicatat.`
  statusTampil.value = true

  nama.value = ''
  rating.value = ''
  tokoh.value = ''
  ulasan.value = ''
  galatNama.value = ''
  galatRating.value = ''
  layak.value = false                 // formulir kosong: tombol kembali menunggu
}
</script>

<template>
  <form id="form-rating" action="/simpan" method="post" class="kartu" novalidate
        @input="tanggapiInput" @submit.prevent="tanggapiKirim">
    <div class="form-kolom">
      <label for="nama-pengunjung">Nama Anda</label>
      <input ref="inputNama" v-model="nama" type="text" id="nama-pengunjung" name="nama-pengunjung"
             required minlength="2" maxlength="60" aria-describedby="galat-nama"
             :aria-invalid="galatNama ? 'true' : undefined">
      <span class="pesan-galat" id="galat-nama" aria-live="polite">{{ galatNama }}</span>
    </div>

    <div class="form-kolom">
      <label for="rating-anda">Rating Anda</label>
      <input ref="inputRating" v-model="rating" type="number" id="rating-anda" name="rating-anda"
             required min="0" max="10" step="0.1" aria-describedby="petunjuk-rating galat-rating"
             :aria-invalid="galatRating ? 'true' : undefined">
      <small id="petunjuk-rating">Isi 0 sampai 10, boleh desimal, misalnya 9.1.</small>
      <span class="pesan-galat" id="galat-rating" aria-live="polite">{{ galatRating }}</span>
    </div>

    <div class="form-kolom">
      <label for="tokoh-favorit">Tokoh favorit</label>
      <select id="tokoh-favorit" name="tokoh-favorit" v-model="tokoh">
        <option value="">Pilih tokoh</option>
        <option v-for="p in daftarPemeran" :key="p.kode" :value="p.kode">{{ p.tokoh }}</option>
      </select>
    </div>

    <div class="form-kolom">
      <label for="ulasan-singkat">Ulasan singkat</label>
      <textarea id="ulasan-singkat" name="ulasan-singkat" v-model="ulasan"
                rows="4" cols="40" maxlength="300"></textarea>
    </div>

    <div class="kartu__kaki">
      <button type="submit" id="tombol-kirim" :disabled="!layak">Simpan</button>
      <small>Nama dan rating wajib diisi.</small>
    </div>

    <p id="status-form" role="status" :hidden="!statusTampil">{{ pesanStatus }}</p>
  </form>
</template>
