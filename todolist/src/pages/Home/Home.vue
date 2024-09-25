<!-- Home.vue -->
<template>
  <div class="bg-custom">
    <div
      class="flex flex-col justify-center h-full items-center gap-y-4 text-center mx-10 px-8"
    >
      <h1 class="font-bold text-[28px] md:text-[48px] text-shadow">
        Selamat Datang Di List Grow
      </h1>
      <p class="text-shadow text-[16px] md:text-[24px]">
        Merupakan sebuah sistem yang dapat membantu kamu mencatat jadwal
        pengalaman bepergianmu
      </p>
      <router-link to="/register">
        <div
          class="bg-gray-500 cursor-pointer px-[24px] py-[12px] rounded-md font-bold mt-4"
        >
          Klik Disini
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Home",
};
</script>

<style scoped>
.bg-custom {
  background-image: url("./../../assets/image/bg-nature.jpg");
  background-size: cover; /* Mengatur gambar agar menutupi seluruh area */
  background-position: center; /* Memusatkan gambar */
  height: 100vh;
}

.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 1); /* Atur sesuai kebutuhan */
}
</style>
