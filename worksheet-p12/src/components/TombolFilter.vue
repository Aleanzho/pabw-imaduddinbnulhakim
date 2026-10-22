<script setup>
// TombolFilter: deretan tombol kategori dan tombol atur ulang. Memakai state bersama.
import { state, pilihKategori, aturUlang } from '../state.js'

const kategori = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'css', label: 'CSS' },
  { nilai: 'javascript', label: 'JavaScript' },
  { nilai: 'backend', label: 'Backend' },
]
</script>

<template>
  <div id="filter" class="filter" role="group" aria-label="Saring proyek menurut kategori">
    <button
      v-for="k in kategori"
      :key="k.nilai"
      type="button"
      :class="{ aktif: state.kategoriAktif === k.nilai }"
      :aria-pressed="String(state.kategoriAktif === k.nilai)"
      @click="pilihKategori(k.nilai)"
    >{{ k.label }}</button>
  </div>
  <button type="button" id="atur-ulang" @click="aturUlang">Atur ulang</button>
</template>
