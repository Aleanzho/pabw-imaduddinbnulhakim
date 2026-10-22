<script setup>
// KepalaProfil: bagian identitas di atas halaman. Hanya MEMBACA props, tidak mengubahnya.
const props = defineProps({
  profil: { type: Object, required: true },
  film: { type: Object, required: true },
})

const judul = `${props.film.judul}: Catatan Film Saya`
const subjudul =
  `Film penutup trilogi ${props.film.seri} (${props.film.rilis.slice(0, 4)}), ` +
  `dengan rating ${props.film.ratingSaya.toFixed(1)}/10 dari saya.`
</script>

<template>
  <header :aria-label="`Kepala halaman milik ${props.profil.nama}`">
    <input type="checkbox" id="tema" class="pengalih-tema">
    <label for="tema" class="tombol-tema">
      <span class="tombol-tema__ke-gelap">Dark mode</span>
      <span class="tombol-tema__ke-terang">Light mode</span>
    </label>

    <div class="navbar">
      <div class="header-judul">
        <h1>{{ judul }}</h1>
        <p>{{ subjudul }}</p>
      </div>
      <nav aria-label="Navigasi utama">
        <ul>
          <li><a href="#info-pemeran">Info dan Pemeran</a></li>
          <li><a href="#cuplikan">Cuplikan Film</a></li>
          <li><a href="#beri-rating">Beri Rating</a></li>
          <li><a href="#tentang-saya">Tentang Saya</a></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
